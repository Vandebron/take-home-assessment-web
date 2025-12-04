import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Application entry point
 *
 * Mounts the React application to the DOM element with id 'root'
 * StrictMode enables additional development checks and warnings
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
