import PropTypes from 'prop-types';

export const CoordsShape = PropTypes.arrayOf(PropTypes.number);

export const PlacemarkShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  coords: CoordsShape,
});
