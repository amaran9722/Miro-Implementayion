import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Media as MediaType } from '../../types/board';

interface MediaProps extends MediaType {
  isSelected: boolean;
}

export default function Media(props: MediaProps) {
  const { id, x, y, width, height, url, mediaType, isSelected } = props;
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
      className={`bg-white rounded-lg shadow-lg cursor-move overflow-hidden ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      {mediaType === 'video' ? (
        <video
          src={url}
          controls
          className="w-full h-full"
        />
      ) : (
        <audio
          src={url}
          controls
          className="w-full mt-4"
        />
      )}
    </div>
  );
}