import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { StickyNote as StickyNoteType } from '../../types/board';

interface StickyNoteProps extends StickyNoteType {
  isSelected: boolean;
}

export default function StickyNote(props: StickyNoteProps) {
  const { id, x, y, width, height, content, color, isSelected } = props;
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
        backgroundColor: color,
      }}
      className={`p-4 rounded-lg shadow-lg cursor-move ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <p className="text-sm">{content}</p>
    </div>
  );
}