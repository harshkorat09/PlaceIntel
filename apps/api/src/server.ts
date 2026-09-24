import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';

import authRoutes from './routes/auth.routes.js';
import companyRoutes from './routes/company.routes.js';
import placementRoutes from './routes/placement.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import branchRoutes from './routes/branch.routes.js';
import statsRoutes from './routes/stats.routes.js';
import profileRoutes from './routes/profile.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { login } from './controllers/auth.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

import { validate } from './middlewares/validate.js';
import { loginSchema } from './validators/auth.validator.js';

app.use('/api/auth', authRoutes);
app.post('/api/login', validate(loginSchema), login); // Direct map for SRS requirement
app.use('/api/companies', companyRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/chat', chatRoutes);

app.get('/health', (_req, res) => res.json({ service: 'placeintel-api', status: 'ok' }));

app.use(errorHandler);

const port = Number(process.env.API_PORT ?? 4000);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`PlaceIntel API listening on :${port}`));
}

export { app };
