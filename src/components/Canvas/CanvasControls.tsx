import React from 'react';
import { ZoomIn, ZoomOut, Grid } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import { MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from '../../utils/constants';

export default function CanvasControls() {
  const { board, updateZoom, toggleGrid } = useBoardStore();
  
  if (!board) return null;

  const handleZoomIn = () => {
    if (board.canvas.zoom < MAX_ZOOM) {
      updateZoom(board.canvas.zoom + ZOOM_STEP);
    }
  };

  const handleZoomOut = () => {
    if (board.canvas.zoom > MIN_ZOOM) {
      updateZoom(board.canvas.zoom - ZOOM_STEP);
    }
  };

  return (
    <div className="absolute bottom-4 right-4 flex gap-2 bg-white rounded-lg shadow-lg p-2">
      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-gray-100 rounded-lg"
        title="Zoom In"
      >
        <ZoomIn size={20} />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 rounded-lg"
        title="Zoom Out"
      >
        <ZoomOut size={20} />
      </button>
      <button
        onClick={toggleGrid}
        className={`p-2 hover:bg-gray-100 rounded-lg ${
          board.canvas.gridVisible ? 'bg-gray-100' : ''
        }`}
        title="Toggle Grid"
      >
        <Grid size={20} />
      </button>
      <span className="p-2 text-sm">
        {Math.round(board.canvas.zoom * 100)}%
      </span>
    </div>
  );
}