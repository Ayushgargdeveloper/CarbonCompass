# Carbon Compass

Carbon Compass is a Phase 1 Carbon Footprint Awareness Platform. It helps individuals estimate their weekly carbon footprint, understand the main contributors, track saved results locally, and follow simple personalized reduction tips.

## Features

- Carbon footprint calculator for electricity, travel, transport mode, diet type, and recycling habit.
- Input validation with negative values blocked.
- Category-wise footprint breakdown.
- Personalized reduction tips based on user inputs.
- Progress tracking with local saved records.
- Eco action checklist with local persistence.
- Responsive and accessible interface.

## Installation

```bash
npm install
```

## Run Commands

```bash
npm run dev
npm run build
npm run preview
```

Development server:

```text
http://127.0.0.1:5900
```

## Test Commands

```bash
npm test
npm run lint
npm run format:check
npm audit --audit-level=high
```

## Evaluation Criteria Mapping

### Code Quality

- Clean structure: `src/components`, `src/hooks`, `src/services`, `src/types`, `src/utils`, `src/data`, `src/tests`.
- Reusable components for form, cards, metric bars, results, insights, progress, and checklist.
- Dashboard state is isolated in a custom hook.
- Calculation, validation, recommendation, record creation, and storage logic are separated from UI.
- Shared PropTypes document component contracts.
- ESLint runs with zero warnings and Prettier formatting is enforced.
- Source guardrail tests block unsafe HTML injection, console logging, and obvious exposed key names.

### Security

- No API keys, secrets, backend credentials, or unsafe external scripts.
- No `dangerouslySetInnerHTML`.
- Numeric inputs are validated and sanitized.
- Select values are checked against allowlists.
- Invalid or unavailable `localStorage` data is handled safely.

### Efficiency

- No heavy charting dependency; charts use lightweight HTML/CSS.
- Client-side calculations are small and synchronous.
- Saved records are capped to the latest 8 entries.
- `useMemo` is used only for derived personalized tips.
- Production build is optimized with Vite.

### Testing

- Carbon calculation tests.
- Input validation and sanitization tests.
- Personalized recommendation tests.
- `localStorage` save/load and invalid-data tests.
- Accessible app rendering and invalid-input UI tests.
- Source quality and security guardrail tests.
- ESLint validates unused code, React Hooks usage, refresh-safe exports, and console-free source.

### Accessibility

- Semantic HTML structure.
- Every input has a visible label.
- Invalid fields expose `aria-invalid` and linked error messages.
- Buttons and checklist controls are keyboard accessible.
- Good color contrast and visible focus styles.
- Mobile-responsive layout.
