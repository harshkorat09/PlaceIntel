import { Router } from 'express';
import { getPlacements, createPlacement, updatePlacement, deletePlacement, getPlacementFitScore } from '../controllers/placement.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';

const router: Router = Router();

// GET is authenticated, writes are Admin only
router.get('/', authenticate, getPlacements);
router.post('/', authenticate, requireAdmin, createPlacement);
router.put('/:id', authenticate, requireAdmin, updatePlacement);
router.delete('/:id', authenticate, requireAdmin, deletePlacement);
router.get('/:id/fit-score', authenticate, getPlacementFitScore);

export default router;
