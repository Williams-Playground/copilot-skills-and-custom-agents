---
agent: 'agent'
description: 'Generate unit tests for UI components following project patterns'
tools: ['search/codebase', 'edit/editFiles']
---

# Generate Unit Tests For UI Components

## Context
Generate unit tests for UI components in the Photo Gallery & Portfolio application.

Focus on components under `src/components/ui/`, including nested folders such as `src/components/ui/cards/` and `src/components/ui/layout/`.

## Testing Goals
- Create focused unit tests for component rendering and behavior
- Follow existing project structure and naming conventions
- Prefer small, readable tests over broad integration-style coverage
- Keep tests aligned with how components are actually used in the app

## Framework And Setup Rules
1. If the repository already has a test framework configured, use it.
2. If no component test setup exists, add the minimum required setup for React component unit testing.
3. Prefer:
	- Vitest for the test runner
	- React Testing Library for rendering and assertions
	- `@testing-library/jest-dom` for DOM matchers
4. Do not add unnecessary testing libraries.
5. Keep configuration minimal and consistent with Next.js + TypeScript.

## What To Test
For each selected component, cover the most important behavior:

1. Renders the required text, labels, or children
2. Applies important props correctly
3. Handles conditional rendering paths
4. Calls event handlers when interactive behavior exists
5. Verifies meaningful CSS class behavior only when it reflects component logic

Avoid testing:
- Tailwind implementation details that do not change behavior
- Third-party library internals
- Snapshot tests unless there is a clear reason

## Project-Specific Guidance
- Use TypeScript in test files
- Keep test files close to the component when appropriate, or follow the repository's existing test location pattern if one exists
- Mock icons or external dependencies only when necessary
- Use accessible queries first, such as `getByRole`, `getByText`, and `getByLabelText`
- Prefer one component per test file

For components like `src/components/ui/cards/FeatureCard.tsx`, test behavior such as:
- title and description rendering
- icon rendering
- prop-driven class mapping logic such as the `iconColor` variants

## Expected Output
When completing this task:

1. Add or update the required test setup files if they do not exist
2. Create unit test files for the requested UI components
3. Keep the tests deterministic and easy to maintain
4. Include brief comments only when the assertion intent is not obvious
5. Run the relevant test command if a test script exists, or add the script if setup is being introduced

## Example Request
Generate unit tests for the UI card and layout components in this repository.

## Deliverable Standard
Return production-ready test files that:
- compile under TypeScript
- follow the repository style
- avoid over-mocking
- validate the real public behavior of each component