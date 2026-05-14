import React from 'react';
import { renderToString } from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';
import Auth from './src/pages/Auth.jsx';
import { AuthProvider } from './src/context/AuthContext.jsx';

try {
  const html = renderToString(
    <BrowserRouter>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </BrowserRouter>
  );
  console.log("Render successful! HTML length:", html.length);
} catch (e) {
  console.error("Render failed:", e);
}
