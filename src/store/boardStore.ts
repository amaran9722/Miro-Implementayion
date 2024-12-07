import { create } from 'zustand';
import type { Board, Position } from '../types/board';

interface BoardState {
  board: Board | null;
  selectedObjectIds: Set<string>;
  selectionBox: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null;
  setBoard: (board: Board) => void;
  updateObjectPosition: (ids: string[], position: Position) => void;
  toggleObjectSelection: (id: string, exclusive: boolean) => void;
  clearSelection: () => void;
  setSelectionBox: (box: { startX: number; startY: number; endX: number; endY: number; } | null) => void;
  updateZoom: (zoom: number) => void;
  toggleGrid: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: null,
  selectedObjectIds: new Set(),
  selectionBox: null,
  setBoard: (board) => set({ board }),
  updateObjectPosition: (ids, position) =>
    set((state) => ({
      board: state.board
        ? {
            ...state.board,
            objects: state.board.objects.map((obj) =>
              ids.includes(obj.id)
                ? { ...obj, x: obj.x + position.x, y: obj.y + position.y }
                : obj
            ),
          }
        : null,
    })),
  toggleObjectSelection: (id, exclusive) =>
    set((state) => {
      const newSelection = new Set(exclusive ? [] : state.selectedObjectIds);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { selectedObjectIds: newSelection };
    }),
  clearSelection: () => set({ selectedObjectIds: new Set() }),
  setSelectionBox: (box) => set({ selectionBox: box }),
  updateZoom: (zoom) =>
    set((state) => ({
      board: state.board
        ? {
            ...state.board,
            canvas: {
              ...state.board.canvas,
              zoom,
            },
          }
        : null,
    })),
  toggleGrid: () =>
    set((state) => ({
      board: state.board
        ? {
            ...state.board,
            canvas: {
              ...state.board.canvas,
              gridVisible: !state.board.canvas.gridVisible,
            },
          }
        : null,
    })),
}));