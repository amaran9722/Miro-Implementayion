import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { DocumentEditor as DocumentEditorType } from '../../types/board';

interface DocumentEditorProps extends DocumentEditorType {
  isSelected: boolean;
}

export default function DocumentEditor(props: DocumentEditorProps) {
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
      className={`bg-white rounded-lg shadow-lg cursor-move ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <div className="p-4 h-full overflow-auto whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}