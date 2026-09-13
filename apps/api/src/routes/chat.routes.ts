import { Router } from 'express';
import { chatWithAssistant } from '../controllers/chat.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

router.post('/', authenticate, chatWithAssistant);

export default router;
