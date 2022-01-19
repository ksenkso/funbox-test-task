import { createRef } from 'react';
import { initialState, usePathReducer } from './reducer.js';
import { getPlacemarkCoords } from './utils.js';

export const usePath = (defaultState = initialState) => {
  const [state, dispatch] = usePathReducer(defaultState);

  const map = createRef();

  const addPlacemark = (name) => {
    if (!map.current) return;

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
  }

  const movePlacemark = (id, newIndex) => {
    dispatch({
      type: 'movePlacemark',
      payload: { id, newIndex }
    })
  }


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
    movePlacemark,
    placemarks: state.placemarks,
    placemarkHandlers: {
      onDrag,
      onDragEnd,
    },
  };
};
