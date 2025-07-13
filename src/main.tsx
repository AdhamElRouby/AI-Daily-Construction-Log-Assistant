import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GeminiProvider } from './context/GeminiContext.tsx';
import { WeatherDataProvider } from './context/WeatherDataContext.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherDataProvider>
      <GeminiProvider>
        <App />
      </GeminiProvider>
    </WeatherDataProvider>
  </StrictMode>
);
