import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import authRoutes from './routes/auth.routes.js';
import companyRoutes from './routes/company.routes.js';
import placementRoutes from './routes/placement.routes.js';
import skillsRoutes from './routes/skills.routes.js';
import statsRoutes from './routes/stats.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { login } from './controllers/auth.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.post('/api/login', login); // Direct map for SRS requirement
app.use('/api/companies', companyRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/chat', chatRoutes);

app.get('/health', (_req, res) => res.json({ service: 'placeintel-api', status: 'ok' }));

const port = Number(process.env.API_PORT ?? 4000);
app.listen(port, () => console.log(`PlaceIntel API listening on :${port}`));
