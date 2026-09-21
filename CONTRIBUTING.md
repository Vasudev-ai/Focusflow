# Contributing to FocusFlow

Thank you for your interest in contributing to **FocusFlow**! FocusFlow is a community-driven, open-source productivity dashboard built for students, developers, and builders who want to streamline task management and focused work sprints.

Whether you are fixing a typo, polishing accessibility, improving responsiveness, writing unit tests, or introducing a new feature, your contributions are warmly welcomed.

---

## Contribution Workflow (Step-by-Step)

Follow these seven steps to make a contribution:

### 1. Fork Repository
Fork the repository on GitHub to your personal account by clicking the **Fork** button in the top-right corner.

### 2. Clone Repository
Clone your fork locally:
```bash
git clone https://github.com/<your-username>/focusflow.git
cd focusflow
```

### 3. Create Branch
Create a descriptive feature or bug-fix branch off `main`:
```bash
git checkout -b fix/timer-pause-edge-case
# or
git checkout -b feat/keyboard-shortcuts
```

### 4. Install Dependencies
Install all required dependencies using npm:
```bash
npm install
```

### 5. Run Development Server
Start the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to preview your changes live.

### 6. Run Tests
Verify that all unit tests pass and add new test cases for your changes:
```bash
npm run test
```
To run tests in interactive watch mode while editing:
```bash
npm run test:watch
```

### 7. Create Pull Request
Push your branch to your remote fork:
```bash
git add .
git commit -m "fix(timer): resolve pause state handling during mode transition"
git push origin <your-branch-name>
```
Then navigate to the main repository on GitHub and open a **Pull Request**. Please fill out the PR template with clear context, testing steps, and relevant issue references.

---

## Contributor Guidelines

### Coding Standards
- **Component Architecture**: Keep components modular, accessible, and single-purpose.
- **Styling**: Use standard Tailwind CSS utility classes. Ensure all UI components render cleanly in both light and dark themes.
- **Accessibility**: Use semantic HTML elements (`<button>`, `<main>`, `<nav>`, `<header>`), provide accessible labels (`aria-label`, `aria-checked`), and ensure clear focus indicators.
- **Persistence**: Any state stored in `localStorage` must use the safe wrappers in `src/utils/storage.js` to prevent crashes.

### Finding Good First Issues
If you are new to the repository, look for issues labeled:
- `good first issue` — Beginner-friendly tasks (UI text, accessibility labels, styling tweaks, simple test additions).
- `help wanted` — Intermediate features, bug fixes, or test expansions.
- `enhancement` — Architectural improvements, performance tuning, and new workflow features.

### Code of Conduct
Please be kind, welcoming, respectful, and constructive in all interactions across issues and pull requests.
