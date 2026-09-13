import { Router } from 'express';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '../controllers/company.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// GET is authenticated, writes are Admin only
router.get('/', authenticate, getCompanies);
router.post('/', authenticate, requireAdmin, createCompany);
router.put('/:id', authenticate, requireAdmin, updateCompany);
router.delete('/:id', authenticate, requireAdmin, deleteCompany);

export default router;
