import React, { useEffect } from 'react';
import Canvas from './components/Canvas/Canvas';
import { useBoardStore } from './store/boardStore';

const sampleBoard = {"boardId": "board_ux_workflow_001",
  "title": "User Interviews to Problem Statement",
  "owner": "user_001",
  "createdAt": "2024-12-06T10:00:00Z",
  "updatedAt": "2024-12-06T12:30:00Z",
  "canvas": {
    "zoom": 1.0,
    "viewport": {
      "x": 0,
      "y": 0,
      "width": 1920,
      "height": 1080
    },
    "gridVisible": true
  },
  "collaborators": [
    {
      "userId": "user_001",
      "displayName": "Alice",
      "role": "owner",
      "lastActiveAt": "2024-12-06T12:29:50Z",
      "presence": {
        "online": true,
        "cursor": {
          "x": 1100,
          "y": 350
        },
        "selectedObjects": []
      }
    },
    {
      "userId": "user_002",
      "displayName": "Bob",
      "role": "editor",
      "lastActiveAt": "2024-12-06T12:28:00Z",
      "presence": {
        "online": false,
        "cursor": null,
        "selectedObjects": []
      }
    },
    {
      "userId": "user_003",
      "displayName": "Charlie",
      "role": "viewer",
      "lastActiveAt": "2024-12-06T12:30:00Z",
      "presence": {
        "online": true,
        "cursor": {
          "x": 450,
          "y": 360
        },
        "selectedObjects": [
          "sticky_synthesis_1"
        ]
      }
    }
  ],
  "objects": [
    {
      "id": "sticky_1",
      "type": "stickyNote",
      "x": 100,
      "y": 200,
      "width": 200,
      "height": 120,
      "content": "User #1: 'I find it difficult to navigate the settings menu when I'm in a hurry.'",
      "color": "#FFFACD",
      "createdBy": "user_002",
      "lastUpdated": "2024-12-06T10:05:00Z",
      "lastUpdatedBy": "user_002"
    },
    {
      "id": "sticky_2",
      "type": "stickyNote",
      "x": 100,
      "y": 350,
      "width": 200,
      "height": 120,
      "content": "User #2: 'I wish the app would remember my last-used preferences.'",
      "color": "#FFFACD",
      "createdBy": "user_002",
      "lastUpdated": "2024-12-06T10:10:00Z",
      "lastUpdatedBy": "user_002"
    },
    {
      "id": "sticky_3",
      "type": "stickyNote",
      "x": 100,
      "y": 500,
      "width": 200,
      "height": 120,
      "content": "User #3: 'The interface is too cluttered; I get overwhelmed trying to find what I need quickly.'",
      "color": "#FFFACD",
      "createdBy": "user_002",
      "lastUpdated": "2024-12-06T10:15:00Z",
      "lastUpdatedBy": "user_002"
    },
    {
      "id": "image_persona",
      "type": "image",
      "x": 50,
      "y": 50,
      "width": 200,
      "height": 120,
      "src": "https://example.com/persona.jpg",
      "createdBy": "user_002",
      "lastUpdated": "2024-12-06T10:20:00Z",
      "lastUpdatedBy": "user_002",
      "description": "Persona image representing a typical user: 'Busy professional'"
    },
    {
      "id": "reference_doc",
      "type": "reference",
      "x": 320,
      "y": 50,
      "width": 220,
      "height": 100,
      "title": "Interview Notes PDF",
      "url": "https://example.com/interview_notes.pdf",
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T10:25:00Z",
      "lastUpdatedBy": "user_003"
    },
    {
      "id": "shape_cluster_1",
      "type": "shape",
      "shapeType": "rectangle",
      "x": 400,
      "y": 300,
      "width": 500,
      "height": 300,
      "strokeColor": "#000000",
      "strokeWidth": 2,
      "fillColor": "#E6FFE6",
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T10:40:00Z",
      "lastUpdatedBy": "user_003",
      "label": "Synthesis: Key Themes",
      "objectsContained": [
        "sticky_1",
        "sticky_2",
        "sticky_3"
      ],
      "annotation": "Common Themes: Difficulty navigating, cluttered interface, lack of quick access to preferences."
    },
    {
      "id": "sticky_synthesis_1",
      "type": "stickyNote",
      "x": 450,
      "y": 350,
      "width": 180,
      "height": 100,
      "content": "Theme 1: Navigation complexity is a major pain point.",
      "color": "#FAFAD2",
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T10:45:00Z",
      "lastUpdatedBy": "user_003"
    },
    {
      "id": "sticky_synthesis_2",
      "type": "stickyNote",
      "x": 450,
      "y": 470,
      "width": 180,
      "height": 100,
      "content": "Theme 2: Users want personalized, remembered settings.",
      "color": "#FAFAD2",
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T10:50:00Z",
      "lastUpdatedBy": "user_003"
    },
    {
      "id": "sticky_synthesis_3",
      "type": "stickyNote",
      "x": 650,
      "y": 400,
      "width": 180,
      "height": 100,
      "content": "Theme 3: Clutter leads to overwhelming experiences.",
      "color": "#FAFAD2",
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T10:55:00Z",
      "lastUpdatedBy": "user_003"
    },
    {
      "id": "arrow_connection_1",
      "type": "shape",
      "shapeType": "arrow",
      "x": 350,
      "y": 300,
      "width": 50,
      "height": 20,
      "strokeColor": "#000",
      "strokeWidth": 2,
      "fillColor": "#000000",
      "createdBy": "user_004",
      "lastUpdated": "2024-12-06T11:00:00Z",
      "lastUpdatedBy": "user_004",
      "annotation": "Arrow from user quotes cluster to synthesis block.",
      "startObject": "sticky_1",
      "endObject": "shape_cluster_1"
    },
    {
      "id": "shape_problem_box",
      "type": "shape",
      "shapeType": "rectangle",
      "x": 1000,
      "y": 300,
      "width": 400,
      "height": 200,
      "strokeColor": "#000000",
      "strokeWidth": 2,
      "fillColor": "#FFE6E6",
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T11:10:00Z",
      "lastUpdatedBy": "user_003",
      "label": "Problem Statement",
      "annotation": "Derived from the key themes"
    },
    {
      "id": "sticky_problem_statement",
      "type": "stickyNote",
      "x": 1050,
      "y": 350,
      "width": 300,
      "height": 150,
      "content": "Problem: Busy professionals struggle to quickly find and adjust critical settings due to a cluttered, non-personalized interface. They need a streamlined, intuitive way to access their most-used tools and preferences.",
      "color": "#FFD1D1",
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T11:15:00Z",
      "lastUpdatedBy": "user_003"
    },
    {
      "id": "arrow_connection_2",
      "type": "shape",
      "shapeType": "arrow",
      "x": 950,
      "y": 350,
      "width": 50,
      "height": 20,
      "strokeColor": "#000000",
      "strokeWidth": 2,
      "fillColor": "#000000",
      "createdBy": "user_004",
      "lastUpdated": "2024-12-06T11:20:00Z",
      "lastUpdatedBy": "user_004",
      "annotation": "Arrow from synthesis block to problem statement box.",
      "startObject": "shape_cluster_1",
      "endObject": "shape_problem_box"
    },

    
    {
      "id": "shape_circle_1",
      "type": "shape",
      "shapeType": "circle",
      "x": 600,
      "y": 600,
      "width": 100,
      "height": 100,
      "strokeColor": "#333333",
      "strokeWidth": 1,
      "fillColor": "#ADD8E6",
      "createdBy": "user_002",
      "lastUpdated": "2024-12-06T11:30:00Z",
      "lastUpdatedBy": "user_002"
    },
    {
      "id": "shape_square_1",
      "type": "shape",
      "shapeType": "square",
      "x": 750,
      "y": 600,
      "width": 100,
      "height": 100,
      "strokeColor": "#333333",
      "strokeWidth": 1,
      "fillColor": "#90EE90",
      "createdBy": "user_002",
      "lastUpdated": "2024-12-06T11:35:00Z",
      "lastUpdatedBy": "user_002"
    },
    {
      "id": "table_1",
      "type": "table",
      "x": 900,
      "y": 600,
      "width": 300,
      "height": 200,
      "createdBy": "user_001",
      "lastUpdated": "2024-12-06T11:40:00Z",
      "lastUpdatedBy": "user_001",
      "tableData": [
        ["Feature", "Issue", "Priority"],
        ["Navigation", "Complex", "High"],
        ["Settings", "Not remembered", "Medium"],
        ["Clutter", "Overwhelming", "High"]
      ]
    },
    {
      "id": "text_area_1",
      "type": "textArea",
      "x": 200,
      "y": 700,
      "width": 400,
      "height": 100,
      "createdBy": "user_002",
      "lastUpdated": "2024-12-06T11:45:00Z",
      "lastUpdatedBy": "user_002",
      "content": "This is a free-form text area where participants can add notes or comments."
    },
    {
      "id": "frame_1",
      "type": "frame",
      "x": 300,
      "y": 900,
      "width": 400,
      "height": 300,
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T11:50:00Z",
      "lastUpdatedBy": "user_003",
      "frameChildren": [
        "sticky_synthesis_1",
        "sticky_synthesis_2",
        "sticky_synthesis_3"
      ]
    },
    {
      "id": "doc_editor_1",
      "type": "documentEditor",
      "x": 700,
      "y": 900,
      "width": 400,
      "height": 300,
      "createdBy": "user_003",
      "lastUpdated": "2024-12-06T11:55:00Z",
      "lastUpdatedBy": "user_003",
      "content": "Editable document content.\n- Point 1: Improve navigation.\n- Point 2: Remember settings.\n- Point 3: Reduce clutter."
    },
    {
      "id": "line_1",
      "type": "line",
      "x": 500,
      "y": 800,
      "width": 0,
      "height": 0,
      "createdBy": "user_004",
      "lastUpdated": "2024-12-06T12:00:00Z",
      "lastUpdatedBy": "user_004",
      "color": "#000000",
      "linePoints": {
        "start": { "x": 500, "y": 800 },
        "end": { "x": 600, "y": 850 }
      }
    },
    {
      "id": "video_1",
      "type": "media",
      "x": 1200,
      "y": 700,
      "width": 400,
      "height": 300,
      "createdBy": "user_001",
      "lastUpdated": "2024-12-06T12:05:00Z",
      "lastUpdatedBy": "user_001",
      "mediaType": "video",
      "url": "https://example.com/demo_video.mp4"
    }
  ]

};

function App() {
  const setBoard = useBoardStore((state) => state.setBoard);

  useEffect(() => {
    setBoard(sampleBoard);
  }, [setBoard]);

  return (
    <div className="w-full h-screen overflow-hidden">
      <Canvas />
    </div>
  );
}

export default App;