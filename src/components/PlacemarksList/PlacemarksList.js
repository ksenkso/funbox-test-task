import './PlacemarksList.scss';
import PropTypes from 'prop-types';
import { PlacemarkItem } from '../PlacemarkItem/PlacemarkItem.js';
import { useDraggableList } from '../../hooks/useDraggableList/useDraggableList.js';
import { getElementIndex } from '../../hooks/useDraggableList/utils.js';

function getPlacemarkIndexById(placemarks, id) {
  return placemarks.find(placemark => placemark.id === +id);
}

export function PlacemarksList({ placemarks, removePlacemark, movePlacemark }) {
  const { listRef, draggableData, setDraggableData, isDragging, handlers } = useDraggableList({
    itemSelector: '.PlacemarkItem',
    handlers: {
      onDragStart: (e) => {
        setDraggableData(getPlacemarkIndexById(placemarks, e.target.dataset.id));
      },
      onDrop: (e) => {
        const newIndex = getElementIndex(e.target);
        movePlacemark(draggableData.id, newIndex);
      }
    }
  });

  return (
    <ul
      ref={listRef}
      className={`PlacemarksList ${isDragging ? 'PlacemarksList_dragging' : ''}`}
      {...handlers}
    >
      {placemarks.map((placemark, index) => {
        return (
          <PlacemarkItem
            key={placemark.id}
            placemark={placemark}
            removePlacemark={removePlacemark}
            isStart={index === 0}
            isEnd={index === placemarks.length - 1}
          />
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
  movePlacemark: PropTypes.func,
};
