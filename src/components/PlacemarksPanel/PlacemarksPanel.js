import PropTypes from 'prop-types';
import { PlacemarkShape } from '../../propTypes.js';
import { PlacemarksList } from '../PlacemarksList/PlacemarksList.js';
import { InputBox } from '../InputBox/InputBox.js';

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

const PlacemarksPanel = ({ placemarks, addPlacemark, removePlacemark, movePlacemark }) => {
  return (
    <>
      <InputBox addPlacemark={addPlacemark} />
      {!placemarks.length && <PlacemarksStub />}
      <PlacemarksList
        placemarks={placemarks}
        removePlacemark={removePlacemark}
        movePlacemark={movePlacemark}
      />
    </>
  );
};

PlacemarksPanel.propTypes = {
  placemarks: PropTypes.arrayOf(PlacemarkShape),
  addPlacemark: PropTypes.func,
  removePlacemark: PropTypes.func,
  move: PropTypes.func,
};

export default PlacemarksPanel;
