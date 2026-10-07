import { Router } from 'express';
import { getBranches, createBranch, updateBranch, deleteBranch } from '../controllers/branch.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.get('/', authenticate, getBranches);
router.post('/', authenticate, createBranch);
router.put('/:id', authenticate, updateBranch);
router.delete('/:id', authenticate, deleteBranch);

export default router;
