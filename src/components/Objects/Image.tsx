import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Image as ImageType } from '../../types/board';

interface ImageProps extends ImageType {
  isSelected: boolean;
}

export default function Image(props: ImageProps) {
  const { id, x, y, width, height, src, description, isSelected } = props;
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
      className={`cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      {...listeners}
      {...attributes}
    >
      <img
        src={src}
        alt={description}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}