import { Router } from 'express';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '../controllers/company.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.js';
import { companySchema, updateCompanySchema, companyIdParamSchema } from '../validators/company.validator.js';

const router: Router = Router();

// GET is authenticated, writes are Admin only
router.get('/', authenticate, getCompanies);
router.post('/', authenticate, requireAdmin, validate(companySchema), createCompany);
router.put('/:id', authenticate, requireAdmin, validate(updateCompanySchema), updateCompany);
router.delete('/:id', authenticate, requireAdmin, validate(companyIdParamSchema), deleteCompany);

export default router;
