import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { VillageProvider } from './shared/dataContext/VillageContext';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './shared/dataContext/ProductContetx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VillageProvider>
      <ProductProvider>
        <App />
        <Toaster/>
      </ProductProvider>
    </VillageProvider>
  </React.StrictMode>
);
