import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Shape as ShapeType } from '../../types/board';

interface ShapeProps extends ShapeType {
  isSelected: boolean;
}

export default function Shape(props: ShapeProps) {
  const {
    id,
    x,
    y,
    width,
    height,
    shapeType,
    strokeColor,
    strokeWidth,
    fillColor,
    label,
    isSelected,
  } = props;
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

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
        backgroundColor: fillColor,
        border: `${strokeWidth}px solid ${strokeColor}`,
        borderRadius: shapeType === 'rectangle' ? '4px' : '0',
      }}
      className={`cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      {...listeners}
      {...attributes}
    >
      {label && (
        <div className="absolute -top-6 left-0 text-sm font-medium">{label}</div>
      )}
    </div>
  );
}