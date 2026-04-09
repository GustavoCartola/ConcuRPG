import http from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
const rootDir = __dirname;
const statePath = path.join(__dirname, 'concurpg-state.json');
const port = 3210;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function sendFile(filePath, response) {
  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, { 'Content-Type': contentTypes[extension] || 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Payload too large'));
      }
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

async function ensureStateFile() {
  try {
    await stat(statePath);
  } catch {
    await writeFile(statePath, JSON.stringify({}, null, 2), 'utf8');
  }
}

async function handleStateApi(request, response) {
  await ensureStateFile();

  if (request.method === 'GET') {
    const raw = await readFile(statePath, 'utf8');
    try {
      const parsed = JSON.parse(raw || '{}');
      sendJson(response, 200, parsed);
      return;
    } catch {
      sendJson(response, 500, { error: 'Arquivo de estado invalido' });
      return;
    }
  }

  if (request.method === 'POST') {
    try {
      const rawBody = await readBody(request);
      const parsed = JSON.parse(rawBody || '{}');
      await writeFile(statePath, JSON.stringify(parsed, null, 2), 'utf8');
      sendJson(response, 200, { ok: true });
      return;
    } catch {
      sendJson(response, 400, { error: 'JSON invalido' });
      return;
    }
  }

  sendJson(response, 405, { error: 'Metodo nao permitido' });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host}`);

  if (requestUrl.pathname === '/api/state') {
    try {
      await handleStateApi(request, response);
    } catch {
      sendJson(response, 500, { error: 'Falha ao processar estado' });
    }
    return;
  }

  const relativePath = requestUrl.pathname === '/' ? 'index.html' : requestUrl.pathname.replace(/^\//, '');
  const safePath = path.normalize(relativePath).replace(/^([.][.][/\\])+/, '');
  const targetPath = path.join(publicDir, safePath);
  const rootAssetPath = path.join(rootDir, safePath);

  if (!targetPath.startsWith(publicDir)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const fileStats = await stat(targetPath);
    if (fileStats.isDirectory()) {
      const indexPath = path.join(targetPath, 'index.html');
      if (existsSync(indexPath)) {
        sendFile(indexPath, response);
        return;
      }
    }

    sendFile(targetPath, response);
  } catch {
    try {
      const rootStats = await stat(rootAssetPath);
      if (rootStats.isFile()) {
        sendFile(rootAssetPath, response);
        return;
      }
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  }
});

server.listen(port, () => {
  console.log(`ConcurPG rodando em http://localhost:${port}`);
});