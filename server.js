import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import produtosRouter from './Dlima/rotas/produtos_rotas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'Dlima', 'public');
const imagesDirectory = path.join(__dirname, 'Dlima', 'images');

app.use(express.json());

app.use('/api/produtos', produtosRouter);
app.use('/images', express.static(imagesDirectory));
app.use(express.static(publicDirectory));

app.listen(port, () => {
  console.log(`D'lima disponível em http://localhost:${port}`);
});