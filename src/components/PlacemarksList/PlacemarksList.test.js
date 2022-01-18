import { render, screen } from '@testing-library/react';
import { usePath } from '../../hooks/usePath/usePath.js';
import userEvent from '@testing-library/user-event';
import { PlacemarksList } from './PlacemarksList.js';

const TestWrapper = ({ initialState }) => {
  const { placemarks, removePlacemark } = usePath(initialState);

  return (
    <PlacemarksList
      placemarks={placemarks}
      removePlacemark={removePlacemark}
    />
  );
};

describe('PlacemarksList', () => {
  it('should remove item when delete button is clicked', async () => {
    const user = userEvent.setup();
    const placemarkName = 'new placemark';
    const coords = [55, 55];
    const initialState = {
      placemarks: [{ id: 1, name: placemarkName, coords }],
    };

    render(
      <TestWrapper
        initialState={initialState}
      />,
    );

    expect(screen.getByText(placemarkName)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Удалить точку/i }));

    expect(screen.queryByText(placemarkName)).not.toBeInTheDocument();
  });
});
