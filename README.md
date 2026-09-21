# FocusFlow

> A modern, lightweight open-source productivity dashboard for students, developers, and builders who want to manage tasks and focused work sessions without clutter.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-v19-61dafb.svg)
![TailwindCSS](https://img.shields.io/badge/tailwind-v4-38bdf8.svg)
![Vitest](https://img.shields.io/badge/tests-vitest-fcc72b.svg)

FocusFlow delivers an intentional, developer-friendly interface designed around high-impact execution. It combines robust task organization with a distraction-free Pomodoro focus timer, streak momentum tracking, and dark/light mode persistence.

---

## Features

### 1. Unified Productivity Dashboard
- **Real-Time Workspace Metrics**: Track total tasks, completed items, pending backlog, and urgent high-priority flags at a glance.
- **Today's Progress Indicator**: Visual progress bar calculating delivery ratios for items scheduled today.
- **Productivity Percentage**: Automatic efficiency rating reflecting your resolution rate.

### 2. Full Task Lifecycle Management
- **CRUD Operations**: Create, edit, inspect, and delete tasks seamlessly.
- **Priority Classification**: Categorize deliverables as **High**, **Medium**, or **Low** priority with distinct visual hierarchy.
- **Domain Categories**: Tag items across **Development**, **Study**, **Work**, **Personal**, and **Other**.
- **Deadlines & Overdue Detection**: Relative date badges (*Today*, *Tomorrow*, *Yesterday*) with dynamic warning indicators for overdue obligations.
- **Context Notes**: Expandable task descriptions for requirements, links, and acceptance criteria.

### 3. Search, Filtering, and Sorting
- **Instant Search**: Filter tasks by title in real-time.
- **Status Filters**: Quick tabs for *All*, *Active*, *Completed*, and *High Priority*.
- **Category Filter**: Slice workspace deliverables by specific category domains.
- **Multi-Factor Sorting**: Order tasks by *Newest*, *Oldest*, *Priority rank*, or *Due Date*.

### 4. Integrated Pomodoro Focus Engine
- **Work & Rest Cycles**: Standard 25-minute Deep Work sprint and 5-minute Short Break recharge.
- **Session Counter**: Automatic tallying of completed focus blocks to quantify uninterrupted deep work.
- **Objective Linking**: Target a specific active task during your sprint directly inside the Focus Room.

### 5. Quantitative Analytics & Streaks
- **Daily Streak Tracking**: Algorithmic streak counter calculating consecutive days of completed tasks.
- **Category & Priority Breakdowns**: Visual distribution meters reflecting where your time and effort are allocated.

### 6. Theme & Responsive Architecture
- **Dual Themes**: Native Light and Dark themes with automated OS preference detection and `localStorage` persistence.
- **Fully Responsive**: Fluid experience optimized across desktop workstations, tablets, and mobile devices.
- **Contextual Empty States**: Helpful, empathetic empty states guiding users when there are no tasks, empty search results, or zero completed items.

---

## Tech Stack

- **Frontend Core**: [React](https://react.dev/) 19 & modern JavaScript / JSX
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Lucide React icons
- **Test Framework**: [Vitest](https://vitest.dev/)
- **State & Storage**: React Context/Hooks + safe, fault-tolerant `localStorage` persistence
- **Build Tooling**: Node.js & Vite / Next.js compatible runtime

---

## Project Structure

```text
focusflow/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── src/
│   ├── components/
│   │   ├── DashboardStats.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Navbar.jsx
│   │   ├── PomodoroTimer.jsx
│   │   ├── ProductivityStats.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── TaskFormModal.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── data/
│   │   ├── constants.js
│   │   └── initialTasks.js
│   ├── hooks/
│   │   ├── useProductivity.js
│   │   ├── useTasks.js
│   │   ├── useTheme.js
│   │   └── useTimer.js
│   ├── pages/
│   │   ├── DashboardView.jsx
│   │   ├── StatsView.jsx
│   │   ├── TasksView.jsx
│   │   └── TimerView.jsx
│   ├── utils/
│   │   ├── dateHelpers.js
│   │   ├── storage.js
│   │   ├── streakHelpers.js
│   │   └── taskHelpers.js
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── storage.test.js
│   ├── taskCompletion.test.js
│   ├── taskCreation.test.js
│   ├── taskDeletion.test.js
│   ├── taskFiltering.test.js
│   └── taskSorting.test.js
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── README.md
└── vitest.config.mjs
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/vasudev-ai-arena/focusflow.git
cd focusflow
```

### 2. Install Dependencies
```bash
npm install
```

---

## Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local development server on `http://localhost:3000` |
| `npm run build` | Compiles production assets |
| `npm run start` | Runs the production-optimized build locally |
| `npm run test` | Executes the Vitest test suite once |
| `npm run test:watch` | Runs Vitest in interactive watch mode |
| `npm run lint` | Runs ESLint static analysis checks |

---

## Testing

FocusFlow utilizes **Vitest** for fast, reliable unit testing of core state, storage safety, and calculation routines:

```bash
# Run all unit tests
npm run test
```

The test suite covers:
- Task entity generation, stable unique IDs, and field normalization
- Completion state toggling and update timestamp modification
- Immutable task deletion and missing-ID safety
- Multi-criteria filtering (status, category, search query)
- Multi-factor sorting (newest, oldest, priority, due date)
- Fault-tolerant `localStorage` persistence and fallback recovery from malformed JSON

---

## Contributing

We welcome contributions of all skill levels! Whether you want to improve accessibility, address open issues, polish mobile UI layouts, or optimize performance, please review our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## License

This project is open source and available under the [MIT License](LICENSE).
