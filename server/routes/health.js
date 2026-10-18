import express from 'express';
const router = express.Router();

const DEEPTRUST_API_URL = process.env.DEEPTRUST_API_URL || 'http://127.0.0.1:8000';
const DEEPTRUST_GATEWAY_URL = process.env.DEEPTRUST_GATEWAY_URL || 'http://127.0.0.1:5000';

router.get('/deeptrust-status', async (req, res) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    let dtRes;
    try {
      dtRes = await fetch(`${DEEPTRUST_GATEWAY_URL}/api/v1/health`, {
        signal: controller.signal
      });
    } catch (e1) {
      dtRes = await fetch(`${DEEPTRUST_API_URL}/api/v1/health`, {
        signal: controller.signal
      });
    }
    clearTimeout(timeoutId);

    if (dtRes && dtRes.ok) {
      const data = await dtRes.json();
      return res.json({
        configured: true,
        connected: true,
        status: 'ONLINE',
        mode: 'PROTECTED',
        provider: 'DeepTrust Zero-Trust Identity Platform',
        timestamp: new Date().toISOString()
      });
    } else {
      return res.json({
        configured: true,
        connected: false,
        status: 'UNAVAILABLE',
        mode: 'FAIL_CLOSED',
        timestamp: new Date().toISOString()
      });
    }
  } catch (err) {
    return res.json({
      configured: true,
      connected: false,
      status: 'UNAVAILABLE',
      mode: 'FAIL_CLOSED',
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/', (req, res) => {
  res.json({
    status: 'HEALTHY',
    system: 'NovaCare Medical Center Information System',
    version: '3.0.0',
    security_gateway: 'DeepTrust Zero-Trust Protected'
  });
});

export default router;
