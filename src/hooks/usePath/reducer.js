import { findPlacemarkIndex } from './utils.js';
import { useReducer } from 'react';

export const initialState = {
  placemarks: [],
  lineCoords: [],
};

const actionHandlers = {
  addPoint(state, action) {
    const placemark = action.payload;
    const id = (state.placemarks[state.placemarks.length - 1]?.id || 0) + 1;

    return {
      lineCoords: state.lineCoords.concat([placemark.coords]),
      placemarks: state.placemarks.concat({
        ...placemark,
        id,
      }),
    };
  },
  removePoint(state, action) {
    const id = action.payload;
    const index = findPlacemarkIndex(state.placemarks, id);

    return {
      lineCoords: state.lineCoords.filter((_, i) => i !== index),
      placemarks: state.placemarks.filter((placemark) => placemark.id !== id),
    };
  },
  updateLinePoint(state, action) {
    const { id, coords } = action.payload;
    const placemarkIndex = findPlacemarkIndex(state.placemarks, id);

    return {
      ...state,
      lineCoords: state.lineCoords.map((point, index) => (index === placemarkIndex ? coords : point)),
    };
  },
};

export function reducer(state, action) {
  const handler = actionHandlers[action.type];
  if (!handler) {
    throw new Error('No such action: ' + action.type);
  }
  return handler(state, action);
}

export const usePathReducer = (state = initialState) => {
  return useReducer(reducer, state);
};
