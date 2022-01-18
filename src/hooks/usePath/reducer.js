import { findPlacemarkIndex } from './utils.js';
import { useReducer } from 'react';

export const initialState = {
  placemarks: [],
};

let lastId = 0;

const actionHandlers = {
  addPoint(state, action) {
    const placemark = action.payload;

    return {
      placemarks: state.placemarks.concat({
        ...placemark,
        id: ++lastId,
      }),
    };
  },

  removePoint(state, action) {
    const id = action.payload;

    return {
      placemarks: state.placemarks.filter((placemark) => placemark.id !== id),
    };
  },

  updateLinePoint(state, action) {
    const { id, coords } = action.payload;
    const placemarkIndex = findPlacemarkIndex(state.placemarks, id);

    return {
      placemarks: state.placemarks.map((point, index) => (index === placemarkIndex ? {...point, coords} : point))
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
