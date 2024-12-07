import React, { useCallback, useRef, useState } from 'react';
import { useBoardStore } from '../../store/boardStore';
import StickyNote from '../Objects/StickyNote';
import Shape from '../Objects/Shape';
import Image from '../Objects/Image';
import Reference from '../Objects/Reference';
import Table from '../Objects/Table';
import TextArea from '../Objects/TextArea';
import DocumentEditor from '../Objects/DocumentEditor';
import Line from '../Objects/Line';
import Media from '../Objects/Media';
import SelectionBox from './SelectionBox';
import CanvasControls from './CanvasControls';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { GRID_SIZE } from '../../utils/constants';

export default function Canvas() {
  const { 
    board,
    updateObjectPosition,
    selectedObjectIds,
    toggleObjectSelection,
    clearSelection,
    selectionBox,
    setSelectionBox
  } = useBoardStore();

  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const startX = (e.clientX - rect.left) / (board?.canvas.zoom || 1);
    const startY = (e.clientY - rect.top) / (board?.canvas.zoom || 1);

    setIsDragging(true);
    setSelectionBox({
      startX,
      startY,
      endX: startX,
      endY: startY,
    });

    const clickedObject = e.target as HTMLElement;
    if (clickedObject.dataset.objectId) {
      toggleObjectSelection(clickedObject.dataset.objectId, !e.shiftKey);
    } else {
      clearSelection();
    }
  }, [board?.canvas.zoom, clearSelection, setSelectionBox, toggleObjectSelection]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current || !selectionBox) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const endX = (e.clientX - rect.left) / (board?.canvas.zoom || 1);
    const endY = (e.clientY - rect.top) / (board?.canvas.zoom || 1);

    setSelectionBox({
      ...selectionBox,
      endX,
      endY,
    });
  }, [isDragging, selectionBox, board?.canvas.zoom, setSelectionBox]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setSelectionBox(null);
  }, [setSelectionBox]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const draggedIds = selectedObjectIds.has(active.id as string)
      ? Array.from(selectedObjectIds)
      : [active.id as string];
    
    updateObjectPosition(draggedIds, {
      x: delta.x,
      y: delta.y,
    });
  };

  if (!board) return null;

  const renderObject = (object: any) => {
    const isSelected = selectedObjectIds.has(object.id);
    
    switch (object.type) {
      case 'stickyNote':
        return <StickyNote key={object.id} {...object} isSelected={isSelected} />;
      case 'shape':
        return <Shape key={object.id} {...object} isSelected={isSelected} />;
      case 'image':
        return <Image key={object.id} {...object} isSelected={isSelected} />;
      case 'reference':
        return <Reference key={object.id} {...object} isSelected={isSelected} />;
      case 'table':
        return <Table key={object.id} {...object} isSelected={isSelected} />;
      case 'textArea':
        return <TextArea key={object.id} {...object} isSelected={isSelected} />;
      case 'documentEditor':
        return <DocumentEditor key={object.id} {...object} isSelected={isSelected} />;
      case 'line':
        return <Line key={object.id} {...object} isSelected={isSelected} />;
      case 'media':
        return <Media key={object.id} {...object} isSelected={isSelected} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full h-screen overflow-hidden relative bg-gray-50"
      style={{
        backgroundImage: board.canvas.gridVisible
          ? `linear-gradient(to right, #ddd 1px, transparent 1px),
             linear-gradient(to bottom, #ddd 1px, transparent 1px)`
          : 'none',
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <div
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `scale(${board.canvas.zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {board.objects.map(renderObject)}
          {selectionBox && <SelectionBox {...selectionBox} />}
        </div>
      </DndContext>
      <CanvasControls />
    </div>
  );
}