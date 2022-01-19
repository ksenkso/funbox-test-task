import { render, screen } from '@testing-library/react';
import PlacemarksPanel from './PlacemarksPanel.js';
import userEvent from '@testing-library/user-event';
import { usePath } from '../../hooks/usePath/usePath.js';

function getMockMap(center) {
  return {
    getCenter() {
      return center;
    },
  };
}

const center = [55, 55];

const TestWrapper = ({ initialState }) => {
  const { placemarks, map, addPlacemark, removePlacemark } = usePath(initialState);
  map.current = getMockMap(center);

  return (
    <PlacemarksPanel
      placemarks={placemarks}
      removePlacemark={removePlacemark}
      addPlacemark={addPlacemark}
    />
  );
};

describe('PlacemarksPanel', () => {
  it('should render an input with autofocus', () => {
    render(<TestWrapper />);

    const textbox = screen.getByRole('textbox');

    expect(textbox).toBeInTheDocument();
    expect(textbox).toBeEmptyDOMElement();
    expect(textbox).toHaveFocus();
  });

  it('should have a placeholder when the list is empty', () => {
    render(<TestWrapper />);

    const placeholder = screen.queryByTestId('list-stub');
    expect(placeholder).toBeInTheDocument();
  });

  it('should add new item when the Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const placemarkName = 'new placemark';
    const textbox = screen.getByRole('textbox');

    await user.type(textbox, placemarkName);
    await user.keyboard('{Enter}');

    expect(textbox).toBeEmptyDOMElement();
    expect(screen.queryByTestId('list-stub')).not.toBeInTheDocument();
    expect(screen.getByText(placemarkName)).toBeInTheDocument();
  });

  it('should render a color indicator for each placemark', async () => {
    const user = userEvent.setup();
    const { container } = render(<TestWrapper />);

    const textbox = screen.getByRole('textbox');

    await user.type(textbox, 'new placemark');
    await user.keyboard('{Enter}');

    expect(screen.getByLabelText('Начало пути')).toBeInTheDocument();

    await user.type(textbox, 'new placemark');
    await user.keyboard('{Enter}');

    expect(screen.getByLabelText('Конец пути')).toBeInTheDocument();

    await user.type(textbox, 'new placemark');
    await user.keyboard('{Enter}');

    expect(
      container
        .querySelector('li:nth-child(1) > .PlacemarkItem__Point')
        .classList
        .contains('PlacemarkItem__Point_start')
    ).toBeTruthy();

    expect(
      container
        .querySelector('li:nth-child(2) > .PlacemarkItem__Point')
        .classList
        .contains('PlacemarkItem__Point_start')
    ).toBeFalsy();

    expect(
      container
        .querySelector('li:nth-child(2) > .PlacemarkItem__Point')
        .classList
        .contains('PlacemarkItem__Point_end')
    ).toBeFalsy();

    expect(
      container
        .querySelector('li:nth-child(3) > .PlacemarkItem__Point')
        .classList
        .contains('PlacemarkItem__Point_end')
    ).toBeTruthy();
  })
});
