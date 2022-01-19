import { lazy, Suspense } from 'react';
import './App.scss';
import { Map, Polyline, YMaps } from 'react-yandex-maps';
import { usePath } from '../../hooks/usePath/usePath.js';
import { PlacemarkWithBaloon } from '../PlacemarkWithBaloon/PlacemarkWithBaloon.js';
import { MapCenter } from '../MapCenter/MapCenter.js';
import { PlacemarksPanelLoader } from '../PlacemarksPanelLoader/PlacemarksPanelLoader.js';

const PlacemarksPanel = lazy(() => import('../PlacemarksPanel/PlacemarksPanel.js'));


const center = [55.75, 37.57];

function App() {
  const { map, addPlacemark, removePlacemark, movePlacemark, placemarks, placemarkHandlers } = usePath();

  return (
    <div className="app">
      <div className="map-container">
        <YMaps>
          <Map
            id="map"
            defaultState={{ center, zoom: 9 }}
            width="100%"
            height="100%"
            instanceRef={(instance) => (map.current = instance)}
          >
            {placemarks.map(({ coords, id, name }, index) => (
              <PlacemarkWithBaloon
                key={id}
                coords={coords}
                name={name}
                isStart={index === 0}
                isEnd={index === placemarks.length - 1}
                onDrag={(e) => placemarkHandlers.onDrag(id, e)}
                onDragEnd={(e) => placemarkHandlers.onDragEnd(id, e)}
              />
            ))}
            <Polyline geometry={placemarks.map(({coords}) => coords)} />
          </Map>
        </YMaps>
        <MapCenter />
        <Suspense fallback={<PlacemarksPanelLoader />}>
          <PlacemarksPanel
            placemarks={placemarks}
            addPlacemark={addPlacemark}
            removePlacemark={removePlacemark}
            movePlacemark={movePlacemark}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
