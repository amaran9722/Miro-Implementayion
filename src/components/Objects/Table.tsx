import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Table as TableType } from '../../types/board';

interface TableProps extends TableType {
  isSelected: boolean;
}

export default function Table(props: TableProps) {
  const { id, x, y, width, height, tableData, isSelected } = props;
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
      className={`bg-white rounded-lg shadow-lg cursor-move overflow-auto ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {tableData[0].map((header, index) => (
              <th
                key={index}
                className="border border-gray-200 bg-gray-50 p-2 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-200 p-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}