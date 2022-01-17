import './App.scss';
import { Map, Polyline, YMaps } from 'react-yandex-maps';
import { usePath } from '../../hooks/usePath/usePath.js';
import { PlacemarkWithBaloon } from '../PlacemarkWitBalloon/PlacemarkWitBalloon.js';
import { PlacemarksPanel } from '../PlacemarksPanel/PlacemarksPanel.js';
import { MapCenter } from '../MapCenter/MapCenter.js';

const center = [55.75, 37.57];

function App() {
  const { map, addPlacemark, removePlacemark, lineCoords, placemarks, placemarkHandlers } = usePath();

  return (
    <div className="app">
      <div className="map-container">
        <YMaps>
          <Map
            defaultState={{ center, zoom: 9 }}
            width="100%"
            height="70vh"
            instanceRef={(instance) => (map.current = instance)}
          >
            {placemarks.map(({ coords, id, name }) => (
              <PlacemarkWithBaloon
                key={id}
                coords={coords}
                name={name}
                onDrag={(e) => placemarkHandlers.onDrag(id, e)}
                onDragEnd={(e) => placemarkHandlers.onDragEnd(id, e)}
              />
            ))}
            <Polyline geometry={lineCoords} />
          </Map>
        </YMaps>
        <MapCenter />
        <PlacemarksPanel placemarks={placemarks} addPlacemark={addPlacemark} removePlacemark={removePlacemark} />
      </div>
    </div>
  );
}

export default App;
