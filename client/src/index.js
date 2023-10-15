import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { VillageProvider } from './shared/dataContext/VillageContext';
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './shared/dataContext/ProductContetx';
import { POSProvider } from './shared/dataContext/PointOfServiceContext';
import { POIProvider } from './shared/dataContext/PointOfInterestContext';
import { NeiProvider } from './shared/dataContext/NeighboringPointContext';
import { TourProvider } from './shared/dataContext/TourContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <VillageProvider>
      <NeiProvider>
        <TourProvider>
          <ProductProvider>
            <POSProvider>
              <POIProvider>
                <App />
              <Toaster/>
              </POIProvider>
            </POSProvider>
          </ProductProvider>
        </TourProvider>
      </NeiProvider>
    </VillageProvider>
);
