import { Router } from 'express';
import { getSkills } from '../controllers/skills.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.get('/', authenticate, getSkills);

export default router;
