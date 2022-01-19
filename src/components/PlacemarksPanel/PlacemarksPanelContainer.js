import { lazy, Suspense } from 'react';
import './PlacemarksPanel.scss';
import { Loader } from '../Loader/Loader.js';

const PlacemarksPanel = lazy(() => import('./PlacemarksPanel.js'));

export const PlacemarksPanelContainer = ({ placemarks, addPlacemark, removePlacemark, movePlacemark }) => {
  return (
    <div className="PlacemarksPanel">
      <Suspense fallback={<Loader />}>
        <PlacemarksPanel
          placemarks={placemarks}
          addPlacemark={addPlacemark}
          removePlacemark={removePlacemark}
          movePlacemark={movePlacemark}
        />
      </Suspense>
    </div>
  );
};
