import React from 'react';
import { createRoot } from 'react-dom/client';
import { worker } from './mocks/browser';

import App from './App';
import './index.css';

async function enableMocking() {
  if (import.meta.env.VITE_MODE !== 'development') {
    return;
  }
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

const container = document.getElementById('root')!;
const root = createRoot(container);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
