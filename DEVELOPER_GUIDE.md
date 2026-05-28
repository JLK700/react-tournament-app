# Developer Guide - React Tournament App

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Running Tests](#running-tests)
- [Linting & Formatting](#linting--formatting)
- [CSV File Format](#csv-file-format)
- [Project Structure](#project-structure)
- [How the App Works](#how-the-app-works)
- [Troubleshooting](#troubleshooting)

---

## Overview

A client-side React application for running single-elimination tournament brackets. Players upload CSV files defining contestants and voters, then vote through each match in a bracket-style tournament. Ties are broken by a randomized "battle" animation.

**Tech Stack:**

- React 19 (JavaScript/JSX)
- React Router DOM v7 (client-side routing)
- Tailwind CSS v4 + CSS Modules (styling)
- PapaParse (CSV file import)
- Vite 7 (build toolchain & dev server)
- Vitest + Testing Library (tests)
- ESLint 9 (flat config) + Prettier (linting/formatting)

> **Migration note:** This project was migrated from Create React App (react-scripts 4) to Vite. The build, dev server, and test runner all changed. See the [Troubleshooting](#troubleshooting) section if you have an old checkout with stale `node_modules`.

---

## Prerequisites

Before running the app, ensure you have the following installed:

| Tool    | Minimum Version    | Check Command    |
| ------- | ------------------ | ---------------- |
| Node.js | 20.19+ or 22.12+   | `node --version` |
| npm     | 10.x               | `npm --version`  |

> **Note:** Vite 7 requires Node.js 20.19+, 22.12+, or any newer LTS. Older Node versions are not supported.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/JLK700/react-tournament-app.git
cd react-tournament-app
```

### 2. Install Dependencies

```bash
npm install
```

> **Note:** The project uses npm as its package manager (`package-lock.json`). A clean install reports **0 vulnerabilities**.

---

## Running the Application

### Development Mode

```bash
npm run dev
```

This starts the Vite dev server and opens the app automatically at **http://localhost:3000**.

Hot Module Replacement (HMR) is enabled -- changes to source files update the browser instantly without a full reload. Tailwind CSS is compiled on the fly by the `@tailwindcss/vite` plugin (no separate build step is needed anymore).

> `npm start` is kept as an alias for `npm run dev` for convenience.

---

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory. Preview it locally with:

```bash
npm run preview
```

Or serve it with any static file server:

```bash
npx serve -s dist
```

---

## Running Tests

```bash
npm test
```

This launches the [Vitest](https://vitest.dev/) test runner in watch mode (configured in `vite.config.js`). Tests use Testing Library and run in a `jsdom` environment. For a single non-watch run (e.g. in CI):

```bash
npx vitest run
```

---

## Linting & Formatting

```bash
npm run lint     # ESLint (flat config in eslint.config.js)
npm run format   # Prettier -- formats src/**/*.{js,jsx,css}
```

---

## CSV File Format

The app requires two CSV files to start a tournament. Template files are provided in the `CSVs/` directory.

### Tournament CSV (`tournament.csv`)

Defines the contestants. Uses `;` (semicolon) as the delimiter (auto-detected by PapaParse).

| Column  | Description                                       |
| ------- | ------------------------------------------------- |
| id      | Unique numeric identifier                         |
| name    | Display name of the contestant                    |
| isVideo | `"true"` for video (iframe), `"false"` for image  |
| url     | URL to the image or embeddable video              |

**Example:**

```csv
0;Entry One;false;https://example.com/image1.jpg
1;Entry Two;true;https://www.youtube.com/embed/VIDEO_ID
```

**Important:** The number of contestants **must be a power of 2** (4, 8, 16, 32, 64, etc.) for the bracket to render correctly. The parser preserves the trailing newline as an empty final row, which the app intentionally skips, so a normal text editor that ends the file with a newline is expected.

### Players CSV (`players.csv`)

Defines the voters/judges. Uses `;` (semicolon) as the delimiter.

| Column | Description                        |
| ------ | ---------------------------------- |
| index  | Numeric index (starting from 0)    |
| name   | Display name of the voter          |
| color  | Color value (currently unused)     |

**Example:**

```csv
0;Alice;red
1;Bob;blue
2;Charlie;green
```

---

## Project Structure

```
react-tournament-app/
├── CSVs/                        # Template CSV files
│   ├── tournament.csv
│   └── players.csv
├── index.html                  # Vite HTML entry point
├── src/
│   ├── main.jsx                 # App entry point (ReactDOM createRoot)
│   ├── App.jsx                  # Main component with routing
│   ├── setupTests.js            # Vitest/Testing Library setup
│   ├── App.test.jsx             # Smoke test
│   ├── classes/                 # Data model classes
│   │   ├── Contender.js         # Tournament contestant
│   │   ├── Match.js             # Single match (two contenders)
│   │   ├── Player.js            # Voter/judge
│   │   └── Tree.js              # Tournament bracket structure
│   ├── components/              # React UI components
│   │   ├── Opener.jsx           # Setup screen (CSV upload)
│   │   ├── CSVReader.jsx        # PapaParse-based CSV file input
│   │   ├── TournamentTree.jsx   # Bracket visualization
│   │   ├── MatchComponent.jsx   # Match box in bracket
│   │   ├── MatchSiteComponent.jsx # Match voting interface
│   │   ├── SummaryWinnerComponent.jsx  # Winner display
│   │   └── GeneralSummaryComponent.jsx # Statistics table
│   └── styles/                  # CSS files
│       ├── tailwind.css         # Tailwind v4 entry (@import "tailwindcss")
│       └── *.module.css         # Component-scoped styles
├── package.json
├── vite.config.js               # Vite + Tailwind + Vitest config
├── eslint.config.js             # ESLint 9 flat config
└── README.md
```

> Tailwind v4 is configured CSS-first, so there is no longer a `tailwind.config.js` or `postcss.config.js`. The single entry `src/styles/tailwind.css` (imported once in `main.jsx`) drives the whole build.

---

## How the App Works

1. **Setup (Opener):** Upload a tournament CSV and a players CSV.
2. **Tournament Tree:** View the full bracket. Click any match to enter the voting screen.
3. **Match Voting:** Each player votes for one of two contenders. Click "BATTLE" to resolve.
   - If votes are not tied: the majority winner advances.
   - If votes are tied: a randomized HP battle animation determines the winner.
4. **Winner Summary:** After the final match, the overall winner is displayed with their match history.
5. **General Summary:** A statistics table showing all contenders' performance metrics.

### App Routes

| Route               | Component                | Description             |
| ------------------- | ------------------------ | ----------------------- |
| `/`                 | `Opener`                 | CSV upload & setup      |
| `/tournament`       | `TournamentTree`         | Bracket view            |
| `/match/:id`        | `MatchSiteComponent`     | Match voting            |
| `/winner-summary`   | `SummaryWinnerComponent` | Winner display          |
| `/general-summary`  | `GeneralSummaryComponent`| Stats table             |

Routing uses React Router v7 (`<Routes>` / `element` props and the `useNavigate` hook).

---

## Troubleshooting

| Problem                                  | Solution                                                                          |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| `npm install` fails with `ERESOLVE`      | You have an old checkout. Delete `node_modules`, `package-lock.json` and any `yarn.lock`, then re-run `npm install`. |
| Dev server won't start (Node error)      | Upgrade Node to 20.19+ / 22.12+ (Vite 7 requirement).                             |
| Blank page after navigating then refresh | The app uses `BrowserRouter`; a hard refresh on a sub-route 404s with a plain static server. Use the in-app nav, or configure SPA fallback when deploying. |
| Bracket looks broken                     | Ensure your tournament CSV has a power-of-2 number of entries (8, 16, 32).        |
| Videos not loading                       | Use embed URLs (e.g., `youtube.com/embed/ID`), not regular watch URLs.            |
| Styles missing in production             | Confirm `src/styles/tailwind.css` is imported in `main.jsx`; Tailwind v4 builds from it. |
