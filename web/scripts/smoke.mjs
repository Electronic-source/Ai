import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

globalThis.window = globalThis;
globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.localStorage = {
  _d: {},
  getItem(k) { return this._d[k] ?? null; },
  setItem(k, v) { this._d[k] = String(v); },
  removeItem(k) { delete this._d[k]; },
};
globalThis.document = { documentElement: {}, body: { style: {} }, title: '', addEventListener() {}, removeEventListener() {}, createElement: () => ({ getContext: () => null }) };
try { Object.defineProperty(globalThis, 'navigator', { value: { clipboard: { writeText() {} } }, configurable: true }); } catch {}

const server = await createServer({ configFile: 'vite.config.js', server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { AppProvider } = await server.ssrLoadModule('/src/lib/store.jsx');
const views = {
  Landing: (await server.ssrLoadModule('/src/components/Landing.jsx')).default,
  Library: (await server.ssrLoadModule('/src/components/Library.jsx')).default,
  ExamStudio: (await server.ssrLoadModule('/src/components/ExamStudio.jsx')).default,
  Groups: (await server.ssrLoadModule('/src/components/Groups.jsx')).default,
  Dashboard: (await server.ssrLoadModule('/src/components/Dashboard.jsx')).default,
  App: (await server.ssrLoadModule('/src/App.jsx')).default,
  AuthModal: (await server.ssrLoadModule('/src/components/AuthModal.jsx')).default,
};
let bad = 0;
for (const [name, Comp] of Object.entries(views)) {
  try {
    const html = renderToString(React.createElement(AppProvider, null, React.createElement(Comp)));
    console.log(`${name}: OK (${html.length} chars)`);
  } catch (e) {
    bad++;
    console.log(`${name}: ERROR ${e.message}`);
    console.log(e.stack.split('\n').slice(0, 6).join('\n'));
  }
}
await server.close();
process.exit(bad ? 1 : 0);
