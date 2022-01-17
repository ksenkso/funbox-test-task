import { createRef } from 'react';
import { usePathReducer } from './reducer.js';
import { getPlacemarkCoords } from './utils.js';

export const usePath = () => {
  const [state, dispatch] = usePathReducer();

  const map = createRef();

  const addPlacemark = (name) => {
    const placemark = {
      name,
      coords: map.current.getCenter(),
    };
    dispatch({
      type: 'addPoint',
      payload: placemark,
    });
  };

  const removePlacemark = (id) => {
    dispatch({
      type: 'removePoint',
      payload: id,
    });
  };

  const onDrag = (id, event) => {
    const coords = getPlacemarkCoords(event);
    dispatch({
      type: 'updateLinePoint',
      payload: { id, coords },
    });
  };

  const onDragEnd = (id, event) => {
    state.placemarks.find((placemark) => placemark.id === id).coords = getPlacemarkCoords(event);
  };

  return {
    map,
    addPlacemark,
    removePlacemark,
    placemarks: state.placemarks,
    lineCoords: state.lineCoords,
    placemarkHandlers: {
      onDrag,
      onDragEnd,
    },
  };
};
