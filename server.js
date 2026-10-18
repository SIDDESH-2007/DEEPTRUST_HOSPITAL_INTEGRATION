import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './server/routes/auth.js';
import healthRoutes from './server/routes/health.js';
import patientRoutes from './server/routes/patient.js';
import nurseRoutes from './server/routes/nurse.js';
import adminRoutes from './server/routes/admin.js';
import clinicalRoutes from './server/routes/clinical.js';

export const app = express();
app.disable('x-powered-by');

const allowedOrigins = new Set(
  (process.env.DEEPTRUST_ALLOWED_REDIRECT_URIS || process.env.APP_URL || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)
    .map(value => {
      try { return new URL(value).origin; } catch { return null; }
    })
    .filter(Boolean)
);

// Restrictive browser and transport policy for the hospital application.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ success: false, error: 'ORIGIN_NOT_ALLOWED', message: 'Request origin is not allowed.' });
  }
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Vite's React refresh preamble requires the matching script nonce in development.
  // Production keeps the original self-only script policy.
  const devNonce = process.env.VITE_MIDDLEWARE === 'true' && process.env.NODE_ENV !== 'production'
    && /^[A-Za-z0-9+/]{32}$/.test(process.env.NOVACARE_DEV_CSP_NONCE || '')
    ? ` 'nonce-${process.env.NOVACARE_DEV_CSP_NONCE}'` : '';
  res.header('Content-Security-Policy', `default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; object-src 'none'; script-src 'self'${devNonce}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' ws: wss: http://127.0.0.1:5000 http://localhost:5000`);
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  res.header('Cross-Origin-Resource-Policy', 'same-origin');
  res.header('Referrer-Policy', 'no-referrer');
  res.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  if (process.env.NODE_ENV === 'production') {
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json({ limit: '32kb', strict: true }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ success: false, error: 'INVALID_JSON', message: 'Request body must contain valid JSON.' });
  }
  next(err);
});

// MongoDB connection (graceful fallback)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/HospitalIntegrationForDT')
  .then(() => console.log('Connected to MongoDB: HospitalIntegrationForDT'))
  .catch(err => console.warn('MongoDB notice:', err.message));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/nurse', nurseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/clinical', clinicalRoutes);

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test' && !process.env.VITE_MIDDLEWARE) {
  app.listen(PORT, () => {
    console.log(`NovaCare Backend API running on port ${PORT}`);
  });
}

export default app;
