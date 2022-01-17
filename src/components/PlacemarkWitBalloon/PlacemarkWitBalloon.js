import { Placemark } from 'react-yandex-maps';
import PropTypes from 'prop-types';

export function PlacemarkWithBaloon({ coords, name, onDrag, onDragEnd }) {
  return (
    <Placemark
      modules={['geoObject.addon.balloon']}
      defaultGeometry={coords}
      options={{
        draggable: true,
        balloonOffset: [3, -40],
        hideIconOnBalloonOpen: false,
      }}
      properties={{
        balloonContentBody: name,
      }}
      onDrag={onDrag}
      onDragend={onDragEnd}
    />
  );
}

PlacemarkWithBaloon.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number),
  name: PropTypes.string,
  id: PropTypes.number,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
};
