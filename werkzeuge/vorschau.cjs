/** Statischen GitHub-Pages-Export lokal mit demselben Basispfad prüfen. */
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const wurzel = path.resolve(__dirname, '../out');
const typen = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer((anfrage, antwort) => {
  try {
    let name = decodeURIComponent(new URL(anfrage.url, 'http://localhost').pathname);
    if (!name.startsWith('/Portfolio/')) { antwort.writeHead(302, { Location: '/Portfolio/' }); return antwort.end(); }
    name = name.slice('/Portfolio/'.length);
    let datei = path.resolve(wurzel, name || '.');
    if (datei !== wurzel && !datei.startsWith(wurzel + path.sep)) throw Error();
    if (fs.existsSync(datei) && fs.statSync(datei).isDirectory()) datei = path.join(datei, 'index.html');
    if (!fs.existsSync(datei)) { antwort.writeHead(404); return antwort.end('Nicht gefunden'); }
    antwort.writeHead(200, { 'Content-Type': typen[path.extname(datei)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(datei).pipe(antwort);
  } catch { antwort.writeHead(400); antwort.end('Ungueltiger Pfad'); }
});
server.listen(0, '127.0.0.1', () => console.log('Vorschau: http://127.0.0.1:' + server.address().port + '/Portfolio/'));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close(() => process.exit()));
