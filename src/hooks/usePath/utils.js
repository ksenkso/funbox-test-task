export const findPlacemarkIndex = (placemarks, id) => {
  return placemarks.findIndex((placemark) => placemark.id === id);
};

export const getPlacemarkCoords = (event) => {
  return event.get('target').geometry.getCoordinates();
};
