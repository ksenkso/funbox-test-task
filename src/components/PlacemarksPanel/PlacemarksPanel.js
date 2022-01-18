import PropTypes from 'prop-types';
import { PlacemarkShape } from '../../propTypes.js';
import { useState } from 'react';
import './PlacemarksPanel.scss';
import { Input } from '../Input/Input.js';
import { PlacemarksList } from '../PlacemarksList/PlacemarksList.js';

function PlacemarksStub() {
  return (
    <p
      className="PlacemarksStub"
      data-testid="list-stub"
    >
      Здесь будет список Ваших отметок
    </p>
  );
}

export const PlacemarksPanel = ({ placemarks, addPlacemark, removePlacemark, movePlacemark }) => {
  const [name, setName] = useState('');
  /**
   * @param {React.KeyboardEvent} event
   */
  const onKeyPress = (event) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();

    if (!name.trim()) return;

    addPlacemark(name);
    setName('');
  };

  return (
    <div className="PlacemarksPanel">
      <Input
        id="placemark-name"
        name="placemark-name"
        title="Название новой метки"
        placeholder="Название новой метки"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyPress={onKeyPress}
        autoFocus
        autoComplete="disabled"
      />
      {!placemarks.length && <PlacemarksStub />}
      <PlacemarksList
        placemarks={placemarks}
        removePlacemark={removePlacemark}
        movePlacemark={movePlacemark}
      />
    </div>
  );
};

PlacemarksPanel.propTypes = {
  placemarks: PropTypes.arrayOf(PlacemarkShape),
  addPlacemark: PropTypes.func,
  removePlacemark: PropTypes.func,
  move: PropTypes.func,
};
