export interface Position {
  x: number;
  y: number;
}

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Canvas {
  zoom: number;
  viewport: Viewport;
  gridVisible: boolean;
}

export interface Cursor {
  x: number;
  y: number;
}

export interface Presence {
  online: boolean;
  cursor: Cursor | null;
  selectedObjects: string[];
}

export interface Collaborator {
  userId: string;
  displayName: string;
  role: 'owner' | 'editor' | 'viewer';
  lastActiveAt: string;
  presence: Presence;
}

export interface BoardObject {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  createdBy: string;
  lastUpdated: string;
  lastUpdatedBy: string;
}

export interface StickyNote extends BoardObject {
  type: 'stickyNote';
  content: string;
  color: string;
}

export interface Shape extends BoardObject {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'square' | 'arrow';
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
  label?: string;
  objectsContained?: string[];
  annotation?: string;
  startObject?: string;
  endObject?: string;
}

export interface Image extends BoardObject {
  type: 'image';
  src: string;
  description: string;
}

export interface Reference extends BoardObject {
  type: 'reference';
  title: string;
  url: string;
}

export interface Table extends BoardObject {
  type: 'table';
  tableData: string[][];
}

export interface TextArea extends BoardObject {
  type: 'textArea';
  content: string;
}

export interface Frame extends BoardObject {
  type: 'frame';
  frameChildren: string[];
}

export interface DocumentEditor extends BoardObject {
  type: 'documentEditor';
  content: string;
}

export interface Line extends BoardObject {
  type: 'line';
  color: string;
  linePoints: {
    start: Position;
    end: Position;
  };
}

export interface Media extends BoardObject {
  type: 'media';
  mediaType: 'video' | 'audio';
  url: string;
}

export type BoardObjectUnion = 
  | StickyNote 
  | Shape 
  | Image 
  | Reference 
  | Table 
  | TextArea 
  | Frame 
  | DocumentEditor 
  | Line 
  | Media;

export interface Board {
  boardId: string;
  title: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  canvas: Canvas;
  collaborators: Collaborator[];
  objects: BoardObjectUnion[];
}