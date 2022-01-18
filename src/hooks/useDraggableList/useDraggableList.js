import { createRef, useState } from 'react';

export const useDraggableList = ({itemSelector, handlers}) => {
  const listRef = createRef();
  const [isDragging, setIsDragging] = useState(false);
  const [draggableData, setDraggableData] = useState(null);

  const isDraggableItem = (el) => el.matches(itemSelector)

  const onDragStart = e => {
    setIsDragging(true);
    handlers.onDragStart(e);
  };

  const onDragEnd = e => {
    if (!isDraggableItem(e.target)) return;

    setIsDragging(false);
    e.target.style.opacity = 1;
  };

  const onDrop = e => {
    if (!isDraggableItem(e.target)) return;

    handlers.onDrop(e);
    setDraggableData(null);

    e.target.style.opacity = 1;
  }

  const onDragLeave = e => {
    if (!isDraggableItem(e.target)) return;

    e.target.style.opacity = 1;
  };

  const onDragOver = e => {
    e.preventDefault();
    if (!isDraggableItem(e.target)) return;

    e.target.style.opacity = 0.5;
  };

  return {
    draggableData,
    setDraggableData,
    isDragging,
    listRef,
    handlers: {
      onDragStart,
      onDragEnd,
      onDrop,
      onDragLeave,
      onDragOver,
    }
  }
}
