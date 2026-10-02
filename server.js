import express from 'express';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import produtosRouter, { obterTotalProdutos } from './Dlima/rotas/produtos_rotas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'Dlima', 'public');
const imagesDirectory = path.join(__dirname, 'Dlima', 'images');
const visitsFile = path.join(__dirname, 'Dlima', 'data', 'acessos.json');
const sessionCookieName = 'dlima_admin';
const sessionDurationSeconds = 8 * 60 * 60;

function readVisits() {
  try {
    const saved = JSON.parse(readFileSync(visitsFile, 'utf8'));
    return Number.isSafeInteger(saved.total) && saved.total >= 0 ? saved.total : 0;
  } catch {
    return 0;
  }
}

let visits = readVisits();

function adminConfigurationReady() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
    process.env.ADMIN_PASSWORD &&
    process.env.ADMIN_SESSION_SECRET &&
    Buffer.byteLength(process.env.ADMIN_SESSION_SECRET) >= 32,
  );
}

function timingSafeTextEqual(first, second) {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);
  return firstBuffer.length === secondBuffer.length && timingSafeEqual(firstBuffer, secondBuffer);
}

function getCookie(req, name) {
  for (const part of (req.headers.cookie || '').split(';')) {
    const separator = part.indexOf('=');
    if (separator >= 0 && part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim();
    }
  }
  return '';
}

function createAdminSession(email) {
  const payload = Buffer.from(JSON.stringify({
    email,
    expiresAt: Date.now() + sessionDurationSeconds * 1000,
  })).toString('base64url');
  const signature = createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return `${payload}.${signature}`;
}

function hasAdminSession(req) {
  if (!adminConfigurationReady()) return false;

  const token = getCookie(req, sessionCookieName);
  const separator = token.lastIndexOf('.');
  if (separator < 1) return false;

  const payload = token.slice(0, separator);
  const receivedSignature = Buffer.from(token.slice(separator + 1));
  const expectedSignature = Buffer.from(createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update(payload)
    .digest('base64url'));
  if (receivedSignature.length !== expectedSignature.length || !timingSafeEqual(receivedSignature, expectedSignature)) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return session.email === process.env.ADMIN_EMAIL.trim().toLowerCase() && session.expiresAt > Date.now();
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  if (!req.adminAuthenticated) {
    return res.status(401).json({ erro: 'Faça login como administrador.' });
  }
  next();
}

app.use(express.json());

app.use((req, res, next) => {
  req.adminAuthenticated = hasAdminSession(req);
  next();
});

app.post('/api/admin/login', (req, res) => {
  if (!adminConfigurationReady()) {
    return res.status(503).json({ erro: 'Configure ADMIN_EMAIL, ADMIN_PASSWORD e ADMIN_SESSION_SECRET.' });
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
  if (!timingSafeTextEqual(email, adminEmail) || !timingSafeTextEqual(password, process.env.ADMIN_PASSWORD)) {
    return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
  }

  const secureCookie = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${sessionCookieName}=${createAdminSession(adminEmail)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${sessionDurationSeconds}${secureCookie}`);
  res.json({ autenticado: true });
});

app.post('/api/admin/logout', (req, res) => {
  const secureCookie = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${sessionCookieName}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secureCookie}`);
  res.json({ autenticado: false });
});

app.get('/api/admin/metrics', requireAdmin, (_req, res) => {
  res.json({ acessos: visits, produtos: obterTotalProdutos() });
});

app.use('/api/produtos', produtosRouter);
app.use('/images', express.static(imagesDirectory));
app.get('/adm', (_req, res) => res.sendFile(path.join(publicDirectory, 'adm.html')));
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/') || /^\/adm(?:\/|$)/.test(req.path)) {
    return next();
  }

  res.once('finish', () => {
    const contentType = String(res.getHeader('content-type') || '');
    if (res.statusCode !== 200 || !contentType.includes('text/html')) return;

    visits += 1;
    try {
      writeFileSync(visitsFile, JSON.stringify({ total: visits }), 'utf8');
    } catch (error) {
      visits -= 1;
      console.error('Não foi possível salvar a métrica de acessos:', error);
    }
  });
  next();
});
app.use(express.static(publicDirectory));

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  app.listen(port, () => {
    console.log(`D'lima disponível em http://localhost:${port}`);
  });
}