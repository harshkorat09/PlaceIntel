import { Router } from 'express';
import { getBranches } from '../controllers/branch.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.get('/', authenticate, getBranches);

export default router;
