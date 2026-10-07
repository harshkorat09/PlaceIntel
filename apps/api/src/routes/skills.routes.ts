import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skills.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.get('/', authenticate, getSkills);
router.post('/', authenticate, createSkill);
router.put('/:id', authenticate, updateSkill);
router.delete('/:id', authenticate, deleteSkill);

export default router;
