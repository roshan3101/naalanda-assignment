# Binary Search Tree (BST) Visualizer

**Live Demo: [https://naalanda-assignment.vercel.app/](https://naalanda-assignment.vercel.app/)**

A professional, interactive, and educational tool designed to visualize Binary Search Tree operations with smooth animations, step-by-step algorithmic guidance, and an intuitive user interface inspired by VisuAlgo.

![BST Visualizer Preview](https://github.com/roshan3101/naalanda-assignment/raw/main/public/preview.png) *(Note: Add a real preview image link here if available)*

## 🚀 Features

### Core BST Operations
- **Insertion**: Animated traversal with comparison logic and edge highlighting.
- **Search**: Step-by-step search for values with "Found" or "Not Found" states.
- **Deletion**: Support for all cases (no child, one child, two children with successor replacement).
- **Traversals**: In-order, Pre-order, and Post-order visualizations.
- **Queries**: Find Minimum, Find Maximum, Successor, and Predecessor.

### UI & UX Enhancements
- **Dynamic Input Modes**: Smart input fields that auto-populate for `min`, `max`, and `exact` value operations.
- **Collapsible Panels**: Sidebar and Algorithm panels can be collapsed to maximize canvas space.
- **Responsive Canvas**: Auto-scaling SVG canvas that adjusts to the tree height.
- **Zoom Functionality**: Zoom in/out and 1:1 reset for comfortable viewing of large trees.
- **Tree Statistics**: Real-time display of node count and tree height in the header.
- **Starter Tree**: Boots with a balanced 25-node tree for immediate exploration.

### Advanced Animation System
- **State-Synced Logic**: Animations are perfectly synced with the data structure. Nodes only appear/disappear when the algorithm reach the actual mutation step.
- **Contextual Feedback**: Always-visible comparison box showing real-time logic (e.g., "93 > 82").
- **Algorithm Highlight**: Pseudocode display with current line highlighting during execution.
- **Smooth Transitions**: CSS-driven node scaling, edge transitions, and highlighting for path traversal.
- **Speed Control**: Adjustable playback speed (slow for learning, fast for verification).

## 🛠️ Tech Stack

- **React 18**: Frontend framework.
- **TypeScript**: Static typing for robust core logic.
- **Vite**: Ultra-fast build tool and dev server.
- **SVG**: High-performance, resolution-independent tree rendering.
- **CSS3 Transitions**: Smooth animations and micro-interactions.

## 📁 Project Structure

```text
src/
├── components/
│   ├── tree/           # SVG Rendering components (TreeNode, TreeCanvas)
│   └── ui/             # Control panels, Playback, and Algorithm displays
├── core/
│   ├── bst/            # Modular BST Logic
│   │   ├── ops/        # Individual operation modules (insert, delete, etc.)
│   │   └── index.ts    # Aggregated exports
│   └── layout.ts       # Coordinate calculation for tree rendering
├── hooks/
│   └── useAnimator.ts  # Generic animation sequence manager
├── types.ts            # Shared TypeScript interfaces
└── App.tsx             # Main application orchestrator
```

## 🚥 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/roshan3101/naalanda-assignment.git
   cd naalanda-assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📘 Implementation Details

- **Modular Archetecture**: The project follows a "State Record" pattern. The BST logic generates an array of "Steps", which are then consumed by the `useAnimator` hook to drive the UI.
- **Recursive Layout**: Uses a recursive algorithm to calculate X/Y coordinates for each node based on tree depth and subtree width, ensuring no overlaps.
- **Decoupled Logic**: Tree mutations for visualization are performed on clones first to ensure animations are logically separated from the "committed" state.

---
Built with ❤️ for educational clarity.