import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ service: 'placeintel-api', status: 'ok' }));

const port = Number(process.env.API_PORT ?? 4000);
app.listen(port, () => console.log(`PlaceIntel API listening on :${port}`));
