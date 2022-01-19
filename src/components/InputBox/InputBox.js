import { Input } from '../Input/Input.js';
import { useState } from 'react';
import './InputBox.scss';
import { Button } from '../Button/Button.js';
import { useIsTouch } from '../../hooks/useIsTouch/useIsTouch.js';

export const InputBox = ({ addPlacemark }) => {
  const isTouch = useIsTouch();
  const [name, setName] = useState('');
  const addItem = () => {
    if (!name.trim()) return;

    addPlacemark(name);
    setName('');
  }
  /**
   * @param {React.KeyboardEvent} event
   */
  const onKeyPress = (event) => {
    if (event.key !== 'Enter') return;

    addItem();
  };

  return (
    <div className="InputBox">
      <Input
        id="placemark-name"
        name="placemark-name"
        title="Название новой метки"
        placeholder="Название новой метки"
        classNames={['PlacemarkName']}
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyPress={onKeyPress}
        autoFocus
        autoComplete="disabled"
      />
      {
        isTouch &&
        <Button
          classNames={['AddButton']}
          onClick={addItem}
        >
          Добавить
        </Button>
      }
    </div>
  )
}
