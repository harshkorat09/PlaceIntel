import { Router } from 'express';
import { getPlacements, createPlacement, updatePlacement, deletePlacement, getPlacementFitScore } from '../controllers/placement.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.js';
import { placementSchema, updatePlacementSchema, placementIdParamSchema } from '../validators/placement.validator.js';

const router: Router = Router();

// GET is authenticated, writes are Admin only
router.get('/', authenticate, getPlacements);
router.post('/', authenticate, requireAdmin, validate(placementSchema), createPlacement);
router.put('/:id', authenticate, requireAdmin, validate(updatePlacementSchema), updatePlacement);
router.delete('/:id', authenticate, requireAdmin, validate(placementIdParamSchema), deletePlacement);
router.get('/:id/fit-score', authenticate, validate(placementIdParamSchema), getPlacementFitScore);

export default router;
