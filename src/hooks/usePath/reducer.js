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

  movePlacemark(state, {payload: {id, newIndex}}) {
    const oldIndex = findPlacemarkIndex(state.placemarks, id);
    const sortedPlacemarks = state.placemarks.slice(0);

    sortedPlacemarks.splice(oldIndex, 1);
    sortedPlacemarks.splice(newIndex, 0, state.placemarks.find(placemark => placemark.id === id));

    return {
      placemarks: sortedPlacemarks,
    }
  }
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
