import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { FileText } from 'lucide-react';
import type { Reference as ReferenceType } from '../../types/board';

interface ReferenceProps extends ReferenceType {
  isSelected: boolean;
}

export default function Reference(props: ReferenceProps) {
  const { id, x, y, width, height, title, url, isSelected } = props;
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
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-500" />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {title}
        </a>
      </div>
    </div>
  );
}