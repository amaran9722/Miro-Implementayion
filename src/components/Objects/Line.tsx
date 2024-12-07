import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Line as LineType } from '../../types/board';

interface LineProps extends LineType {
  isSelected: boolean;
}

export default function Line(props: LineProps) {
  const { id, linePoints, color, isSelected } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const { start, end } = linePoints;
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);

  return (
    <div
      ref={setNodeRef}
      data-object-id={id}
      style={{
        ...style,
        position: 'absolute',
        left: Math.min(start.x, end.x),
        top: Math.min(start.y, end.y),
        width,
        height,
      }}
      className={`cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      {...listeners}
      {...attributes}
    >
      <svg
        width={width}
        height={height}
        className="pointer-events-none"
      >
        <line
          x1={start.x > end.x ? width : 0}
          y1={start.y > end.y ? height : 0}
          x2={start.x > end.x ? 0 : width}
          y2={start.y > end.y ? 0 : height}
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}