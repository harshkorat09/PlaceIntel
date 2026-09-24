import { Router } from 'express';
import multer from 'multer';
import { getPlacements, createPlacement, updatePlacement, deletePlacement, getPlacementFitScore, uploadPlacementNotice } from '../controllers/placement.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';

const router: Router = Router();

// Multer: memory storage, 10 MB max, PDF only
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'));
    }
  },
});

// GET is authenticated, writes are Admin only
router.get('/', authenticate, getPlacements);
router.post('/', authenticate, requireAdmin, createPlacement);
router.put('/:id', authenticate, requireAdmin, updatePlacement);
router.delete('/:id', authenticate, requireAdmin, deletePlacement);
router.get('/:id/fit-score', authenticate, getPlacementFitScore);

// Optional PDF notice upload — Admin only
router.post('/:id/notice', authenticate, requireAdmin, upload.single('file'), uploadPlacementNotice);

export default router;
