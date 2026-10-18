import express from 'express';
import { requireAuth, requireRoles } from './auth.js';

const router = express.Router();

// Protected Admin endpoints - strictly admin only
router.get('/audit-logs', requireAuth, requireRoles(['admin']), (req, res) => {
  res.json({
    success: true,
    audit_logs: [
      { id: 'LOG-001', user: 'Robert Vance, MHA', action: 'DeepTrust SSO Authentication', timestamp: new Date().toISOString(), result: 'ALLOW' },
      { id: 'LOG-002', user: 'System Security', action: 'Role RBAC Verification', timestamp: new Date().toISOString(), result: 'PASSED' }
    ]
  });
});

router.get('/system-config', requireAuth, requireRoles(['admin']), (req, res) => {
  res.json({
    success: true,
    hospital_name: 'NovaCare Medical Center',
    deeptrust_integration: 'ACTIVE',
    security_mode: 'ZERO_TRUST_STRICT'
  });
});

export default router;
