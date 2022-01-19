import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import './PlacemarkItem.scss';

export function PlacemarkItem({ placemark, removePlacemark, isStart, isEnd }) {
  const pointClassName = isStart
    ? 'PlacemarkItem__Point_start'
    : isEnd
      ? 'PlacemarkItem__Point_end'
      : '';
  return (
    <li
      className="PlacemarksList__Item PlacemarkItem"
      draggable={true}
      data-id={placemark.id}
    >
      <span className={`PlacemarkItem__Point ${pointClassName}`} />
      <span className="PlacemarkItem__Name">{placemark.name}</span>
      <button
        className="PlacemarkItem__Button"
        type="button"
        onClick={() => removePlacemark(placemark.id)}
        aria-label={`Удалить точку ${placemark.name}`}
      >
        <CloseIcon />
      </button>
    </li>
  );
}

PlacemarkItem.propTypes = {
  name: PropTypes.any,
  removePlacemark: PropTypes.func,
};
