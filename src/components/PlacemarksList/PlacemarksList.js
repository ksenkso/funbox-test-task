import './PlacemarksList.scss';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';

export function PlacemarksList({ placemarks, removePlacemark }) {
  return (
    <ul className="PlacemarksList">
      {placemarks.map(({ name, id }) => {
        return (
          <li
            key={id}
            className="PlacemarksList__Item PlacemarkItem"
          >
            <span className="PlacemarkItem__Name">{name}</span>
            <button
              className="PlacemarkItem__Button"
              type="button"
              onClick={() => removePlacemark(id)}
            >
              <CloseIcon />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

PlacemarksList.propTypes = {
  placemarks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  removePlacemark: PropTypes.func,
};
