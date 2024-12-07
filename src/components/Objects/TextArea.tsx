import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { TextArea as TextAreaType } from '../../types/board';

interface TextAreaProps extends TextAreaType {
  isSelected: boolean;
}

export default function TextArea(props: TextAreaProps) {
  const { id, x, y, width, height, content, isSelected } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      data-object-id={id}
      style={{
        ...style,
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
      }}
      className={`bg-white p-4 rounded-lg shadow-lg cursor-move ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <div className="w-full h-full overflow-auto">
        {content}
      </div>
    </div>
  );
}