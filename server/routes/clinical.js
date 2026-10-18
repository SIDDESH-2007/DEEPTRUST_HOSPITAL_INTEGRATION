import express from 'express';
import { requireAuth, requireRoles } from './auth.js';

const router = express.Router();

// Clinical data boundary: clinical data stays strictly inside NovaCare storage
router.get('/prescriptions', requireAuth, requireRoles(['doctor', 'nurse', 'pharmacist', 'admin', 'patient']), (req, res) => {
  res.json({
    success: true,
    prescriptions: [
      { id: 'RX-7712', patientId: 'PAT-1049', drug: 'Atorvastatin 20mg', instructions: 'Once daily at bedtime', status: 'Active' },
      { id: 'RX-7713', patientId: 'PAT-1049', drug: 'Metoprolol Tartrate 25mg', instructions: 'Twice daily with meals', status: 'Active' }
    ],
    storage_boundary: 'NovaCare Medical Database Only'
  });
});

router.get('/billing', requireAuth, requireRoles(['admin', 'receptionist', 'patient']), (req, res) => {
  res.json({
    success: true,
    invoices: [
      { invoiceNumber: 'INV-2026-091', patientId: 'PAT-1049', totalAmount: 420.00, paidAmount: 420.00, status: 'Paid', paymentMethod: 'Card' }
    ],
    storage_boundary: 'NovaCare Encrypted Payment Vault Only'
  });
});

export default router;
