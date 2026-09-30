import { Router } from 'express';
import { chatWithAssistant, getChatHistory } from '../controllers/chat.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router: Router = Router();

// POST /api/chat — send a message
router.post('/', authenticate, chatWithAssistant);

// GET /api/chat/history — load persisted conversation history
// Optional query param: ?session_id=<id>
// Without it: returns the user's most recent session.
router.get('/history', authenticate, getChatHistory);

export default router;
