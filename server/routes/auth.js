import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// In-memory active session store with TTL (backed by server)
const activeSessions = new Map();
const oauthTransactions = new Map();
const authRateLimits = new Map();
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const SESSION_ABSOLUTE_TIMEOUT_MS = 4 * 60 * 60 * 1000;

function rateLimit({ windowMs, max, scope }) {
  return (req, res, next) => {
    const key = `${scope}:${req.ip || req.socket.remoteAddress || 'unknown'}`;
    const now = Date.now();
    const existing = authRateLimits.get(key);
    const entry = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + windowMs } : existing;
    entry.count += 1;
    authRateLimits.set(key, entry);
    res.header('X-RateLimit-Limit', String(max));
    res.header('X-RateLimit-Remaining', String(Math.max(0, max - entry.count)));
    if (entry.count > max) {
      res.header('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ success: false, error: 'TOO_MANY_ATTEMPTS', message: 'Too many authentication attempts. Please try again later.' });
    }
    next();
  };
}

const startLoginLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20, scope: 'oauth-start' });
const exchangeLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 15, scope: 'oauth-exchange' });
const patientLoginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, scope: 'patient-login' });

router.use((req, res, next) => {
  res.header('Cache-Control', 'no-store, max-age=0');
  res.header('Pragma', 'no-cache');
  next();
});

// Helper to clean expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [token, sess] of activeSessions.entries()) {
    if (sess.expiresAt < now) {
      activeSessions.delete(token);
    }
  }
  for (const [state, transaction] of oauthTransactions.entries()) {
    if (transaction.expiresAt < now) oauthTransactions.delete(state);
  }
  for (const [key, limit] of authRateLimits.entries()) {
    if (limit.resetAt < now) authRateLimits.delete(key);
  }
}, 60000);

export function createSession(userData, sessionType = 'DEEPTRUST_SSO') {
  const token = `nc_sess_${crypto.randomBytes(32).toString('hex')}`;
  const now = Date.now();
  const session = {
    token,
    user: userData,
    sessionType,
    createdAt: now,
    lastActivity: now,
    expiresAt: now + SESSION_ABSOLUTE_TIMEOUT_MS,
  };
  const matchingSessions = [...activeSessions.entries()]
    .filter(([, existing]) => existing.user.id === userData.id && existing.sessionType === sessionType)
    .sort((a, b) => a[1].createdAt - b[1].createdAt);
  while (matchingSessions.length >= 3) {
    const [oldestToken] = matchingSessions.shift();
    activeSessions.delete(oldestToken);
  }
  activeSessions.set(token, session);
  return session;
}

export function getSession(token) {
  if (!token || typeof token !== 'string') return null;
  const session = activeSessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now() || session.lastActivity + SESSION_IDLE_TIMEOUT_MS < Date.now()) {
    activeSessions.delete(token);
    return null;
  }
  session.lastActivity = Date.now();
  return session;
}

export function revokeSession(token) {
  if (!token) return false;
  return activeSessions.delete(token);
}

export function normalizeDeepTrustRole(dtRole) {
  if (!dtRole) return 'patient';
  const roleStr = String(dtRole).toUpperCase().trim();
  if (roleStr === 'HOSPITAL_ADMIN' || roleStr === 'DEEPTRUST_ADMIN' || roleStr === 'DEEPTRUST_OWNER' || roleStr === 'ADMIN' || roleStr.includes('ADMINISTRATOR')) {
    return 'admin';
  }
  if (roleStr === 'DOCTOR' || roleStr === 'PHYSICIAN' || roleStr === 'CARDIOLOGIST' || roleStr.includes('DOCTOR')) {
    return 'doctor';
  }
  if (roleStr === 'NURSE' || roleStr === 'CHARGE_NURSE' || roleStr.includes('NURSE')) {
    return 'nurse';
  }
  if (roleStr === 'RECEPTIONIST' || roleStr === 'FRONT_DESK' || roleStr.includes('RECEPTION')) {
    return 'receptionist';
  }
  if (roleStr === 'LAB_TECH' || roleStr === 'LAB_TECHNICIAN' || roleStr === 'LAB STAFF' || roleStr === 'LAB_STAFF' || roleStr.includes('LAB')) {
    return 'lab_technician';
  }
  if (roleStr === 'PHARMACIST' || roleStr.includes('PHARM')) {
    return 'pharmacist';
  }
  if (roleStr === 'PATIENT') {
    return 'patient';
  }
  return 'patient';
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Access denied: Authentication session token required.',
    });
  }

  const token = authHeader.split(' ')[1];
  const session = getSession(token);
  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'INVALID_OR_EXPIRED_SESSION',
      message: 'Access denied: Session has expired, was revoked, or does not exist.',
    });
  }

  req.user = session.user;
  req.session = session;
  next();
}

export function requireRoles(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Access denied: Authentication required.',
      });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN_ROLE_MISMATCH',
        message: `Access denied: Role '${userRole}' is not authorized to access this protected clinical resource. Requires one of: [${allowedRoles.join(', ')}]`,
      });
    }

    next();
  };
}

// DeepTrust client credentials are server-only and must never be bundled into the browser.
const DEEPTRUST_CLIENT_ID = process.env.DEEPTRUST_CLIENT_ID;
const DEEPTRUST_CLIENT_SECRET = process.env.DEEPTRUST_CLIENT_SECRET;
const DEEPTRUST_ORGANIZATION_ID = process.env.DEEPTRUST_ORGANIZATION_ID;
const DEEPTRUST_ORGANIZATION_NAME = process.env.DEEPTRUST_ORGANIZATION_NAME || 'Hospital';
const DEEPTRUST_API_URL = process.env.DEEPTRUST_API_URL || 'http://127.0.0.1:8000';
const DEEPTRUST_GATEWAY_URL = process.env.DEEPTRUST_GATEWAY_URL || 'http://127.0.0.1:5000';
const DEEPTRUST_ALLOWED_REDIRECT_URIS = new Set(
  (process.env.DEEPTRUST_ALLOWED_REDIRECT_URIS || process.env.APP_URL || '')
    .split(',')
    .map(value => value.trim().replace(/\/$/, ''))
    .filter(Boolean)
);
const STAFF_ROLES = new Set(['admin', 'doctor', 'nurse', 'receptionist', 'lab_technician', 'pharmacist']);

function deepTrustIsConfigured() {
  return Boolean(DEEPTRUST_CLIENT_ID && DEEPTRUST_CLIENT_SECRET && DEEPTRUST_ORGANIZATION_ID);
}

function isAllowedRedirectUri(uri) {
  if (!uri || typeof uri !== 'string') return false;
  try {
    const parsed = new URL(uri);
    const normalized = `${parsed.origin}${parsed.pathname === '/' ? '' : parsed.pathname}`.replace(/\/$/, '');
    return DEEPTRUST_ALLOWED_REDIRECT_URIS.has(normalized) || DEEPTRUST_ALLOWED_REDIRECT_URIS.has(parsed.origin);
  } catch {
    return false;
  }
}

router.post('/deeptrust/start', startLoginLimiter, (req, res) => {
  if (!deepTrustIsConfigured()) {
    return res.status(503).json({
      success: false,
      error: 'DEEPTRUST_NOT_CONFIGURED',
      message: 'DeepTrust hospital tenant credentials are not configured on the server.',
    });
  }

  const { requested_role, redirect_uri, code_challenge } = req.body;
  if (!STAFF_ROLES.has(requested_role)) {
    return res.status(400).json({ success: false, error: 'INVALID_ROLE', message: 'Select a valid hospital staff role.' });
  }
  if (!isAllowedRedirectUri(redirect_uri)) {
    return res.status(400).json({ success: false, error: 'INVALID_REDIRECT_URI', message: 'This hospital callback URL is not registered.' });
  }
  if (!code_challenge || !/^[A-Za-z0-9_-]{43,128}$/.test(code_challenge)) {
    return res.status(400).json({ success: false, error: 'INVALID_PKCE_CHALLENGE', message: 'A valid PKCE challenge is required.' });
  }

  const state = crypto.randomBytes(32).toString('hex');
  oauthTransactions.set(state, {
    requestedRole: requested_role,
    redirectUri: redirect_uri.replace(/\/$/, ''),
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  const params = new URLSearchParams({
    oauth_client: DEEPTRUST_CLIENT_ID,
    redirect_uri: redirect_uri.replace(/\/$/, ''),
    state,
    code_challenge,
    code_challenge_method: 'S256',
    role: requested_role,
    organization_id: DEEPTRUST_ORGANIZATION_ID,
    organization_name: DEEPTRUST_ORGANIZATION_NAME,
    prompt: 'login',
  });

  return res.json({
    success: true,
    state,
    authorization_url: `${DEEPTRUST_GATEWAY_URL.replace(/\/$/, '')}/index.html?${params.toString()}`,
  });
});

// 1. Patient Login Endpoint (NovaCare Direct Authentication Only)
router.post('/login', patientLoginLimiter, (req, res) => {
  const { email, password, role = 'patient' } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password || email.length > 254 || password.length > 256) {
    return res.status(400).json({
      success: false,
      error: 'MISSING_CREDENTIALS',
      message: 'Email/Username and Password are required.',
    });
  }

  // Ensure Staff accounts cannot bypass DeepTrust through Patient login endpoint
  if (role !== 'patient') {
    return res.status(403).json({
      success: false,
      error: 'STAFF_SSO_REQUIRED',
      message: 'Staff access requires multi-factor authentication via DeepTrust Security Gateway.',
    });
  }

  const configuredEmail = process.env.PATIENT_AUTH_EMAIL?.trim().toLowerCase();
  const configuredHash = process.env.PATIENT_AUTH_PASSWORD_HASH;
  if (!configuredEmail || !configuredHash || !configuredHash.includes(':')) {
    return res.status(503).json({
      success: false,
      error: 'PATIENT_AUTH_NOT_CONFIGURED',
      message: 'Patient authentication is not configured on the server.',
    });
  }

  const [salt, expectedHex] = configuredHash.split(':', 2);
  const suppliedHash = crypto.scryptSync(String(password), salt, 64);
  const expectedHash = Buffer.from(expectedHex, 'hex');
  const emailMatches = String(email).trim().toLowerCase() === configuredEmail;
  const passwordMatches = expectedHash.length === suppliedHash.length && crypto.timingSafeEqual(expectedHash, suppliedHash);
  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({ success: false, error: 'INVALID_CREDENTIALS', message: 'Invalid patient email or password.' });
  }

  const patientUser = {
    id: process.env.PATIENT_AUTH_ID || configuredEmail,
    name: process.env.PATIENT_AUTH_NAME || 'Patient',
    email: configuredEmail,
    role: 'patient',
    department: 'Patient Care Services',
    organization_id: DEEPTRUST_ORGANIZATION_ID,
    authenticated_via: 'NOVACARE_DIRECT_AUTH',
  };

  const session = createSession(patientUser, 'NOVACARE_PATIENT_AUTH');

  return res.json({
    success: true,
    session_token: session.token,
    user: patientUser,
    expires_at: session.expiresAt,
  });
});

// 2. DeepTrust OAuth2 Code Exchange (Backend-to-Backend with PKCE & State Validation)
router.post('/deeptrust/exchange', exchangeLimiter, async (req, res) => {
  const { code, state, code_verifier, requested_role, redirect_uri } = req.body;

  if (typeof code !== 'string' || !code || code.length > 512 || typeof code_verifier !== 'string' || !/^[A-Za-z0-9_-]{43,128}$/.test(code_verifier)) {
    return res.status(400).json({
      success: false,
      error: 'MISSING_AUTHORIZATION_CODE',
      message: 'A valid authorization code and PKCE verifier are required for DeepTrust token exchange.',
    });
  }

  const transaction = typeof state === 'string' ? oauthTransactions.get(state) : null;
  if (!transaction || transaction.expiresAt < Date.now()) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_STATE',
      message: 'State parameter verification failed. Potential CSRF or tampered state detected.',
    });
  }

  if (transaction.requestedRole !== requested_role || transaction.redirectUri !== String(redirect_uri || '').replace(/\/$/, '')) {
    oauthTransactions.delete(state);
    return res.status(400).json({
      success: false,
      error: 'OAUTH_TRANSACTION_MISMATCH',
      message: 'OAuth transaction details do not match the original hospital login request.',
    });
  }

  oauthTransactions.delete(state);

  try {
    // Server-side code exchange with DeepTrust API Gateway
    const exchangePayload = {
      grant_type: 'authorization_code',
      client_id: DEEPTRUST_CLIENT_ID,
      client_secret: DEEPTRUST_CLIENT_SECRET,
      code: code,
      redirect_uri: redirect_uri || 'http://localhost:3000/callback',
      code_verifier: code_verifier || undefined,
    };

    let dtResponse;
    try {
      dtResponse = await fetch(`${DEEPTRUST_API_URL}/api/v1/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exchangePayload),
        signal: AbortSignal.timeout(8000),
      });
    } catch (netErr) {
      dtResponse = await fetch(`${DEEPTRUST_GATEWAY_URL}/api/v1/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exchangePayload),
        signal: AbortSignal.timeout(8000),
      });
    }

    const dtData = await dtResponse.json();

    if (!dtResponse.ok || dtData.error) {
      return res.status(dtResponse.status || 400).json({
        success: false,
        error: dtData.error || 'DEEPTRUST_EXCHANGE_FAILED',
        message: dtData.message || dtData.error_description || 'DeepTrust authorization code exchange rejected.',
      });
    }

    // Validate trusted user identity returned from DeepTrust
    const dtUser = dtData.user;
    if (!dtUser || !dtUser.role) {
      return res.status(403).json({
        success: false,
        error: 'INVALID_IDENTITY_PAYLOAD',
        message: 'DeepTrust identity response missing valid role or user profile.',
      });
    }

    const authorizedRole = normalizeDeepTrustRole(dtUser.role);

    if (dtUser.organization_id !== DEEPTRUST_ORGANIZATION_ID) {
      return res.status(403).json({
        success: false,
        error: 'ORGANIZATION_MISMATCH',
        message: 'This DeepTrust account does not belong to the configured hospital tenant.',
      });
    }

    // Role Mismatch / Escalation Prevention
    if (requested_role && requested_role !== 'patient') {
      const normalizedRequested = normalizeDeepTrustRole(requested_role);
      if (normalizedRequested !== authorizedRole) {
        return res.status(403).json({
          success: false,
          error: 'ROLE_MISMATCH',
          message: `Role Escalation Denied: Your authorized DeepTrust credential role is '${authorizedRole}', which does not grant access to the requested '${requested_role}' dashboard.`,
          authorized_role: authorizedRole,
          requested_role: requested_role,
        });
      }
    }

    // Role matched -> Create secure NovaCare staff session
    const staffUser = {
      id: dtUser.user_id || dtUser.email,
      name: dtUser.full_name || 'Authorized Staff Member',
      email: dtUser.email,
      role: authorizedRole,
      display_role: dtUser.display_role || authorizedRole,
      department: dtUser.department || 'Clinical Department',
      organization_id: dtUser.organization_id,
      authenticated_via: 'DEEPTRUST_SSO',
    };

    const session = createSession(staffUser, 'DEEPTRUST_SSO');

    return res.json({
      success: true,
      session_token: session.token,
      user: staffUser,
      expires_at: session.expiresAt,
    });
  } catch (err) {
    // FAIL CLOSED!
    return res.status(503).json({
      success: false,
      error: 'DEEPTRUST_SERVICE_UNAVAILABLE',
      message: 'DeepTrust Security Gateway is unavailable. Staff authentication failed closed for security.',
    });
  }
});

// 3. Session Validation Endpoint
router.get('/session', requireAuth, (req, res) => {
  return res.json({
    success: true,
    user: req.user,
    session: {
      sessionType: req.session.sessionType,
      expiresAt: req.session.expiresAt,
    },
  });
});

// 4. Logout Endpoint
router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    revokeSession(token);
  }
  return res.json({
    success: true,
    message: 'Session successfully revoked. Protected access terminated.',
  });
});

export default router;
