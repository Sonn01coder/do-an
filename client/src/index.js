import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { VillageProvider } from './shared/dataContext/VillageContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VillageProvider>
      <App />
    </VillageProvider>
  </React.StrictMode>
);
