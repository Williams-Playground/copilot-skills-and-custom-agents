# Contributing

Thanks for contributing to **Photo Gallery & Portfolio**.

## Code of Conduct

Please follow our community standards and be respectful in all project interactions.

## Reporting Bugs

Use GitHub Issues and include:

- Clear reproduction steps
- Expected vs actual behavior
- Environment details (OS, Node.js version, browser, branch/commit)
- Relevant logs or screenshots

## Suggesting Features

Open a GitHub Issue describing:

- Problem statement
- Proposed solution
- Alternatives considered
- Security and user impact

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Start development server

```bash
git clone https://github.com/<your-user>/copilot-skills-and-custom-agents.git
cd copilot-skills-and-custom-agents
npm install
npm run dev
```

## Branch Naming Convention

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `chore/<short-description>`

## Commit Message Convention

Use Conventional Commits:

- `feat:`
- `fix:`
- `docs:`
- `chore:`
- `test:`

## Pull Request Process

- PR description must clearly explain **what** changed, **why** it changed, and **how** it was validated.
- Add or update tests for behavior changes.
- Run lint/build checks before requesting review.
- Include a security review checklist confirming:
  - No hardcoded secrets or credentials
  - All inputs are validated
  - No new XSS vectors introduced
- PR comments must start with **4 emojis** per org standards.

## Code Style

- Follow existing ESLint and TypeScript configuration.
- Maintain strict typing and avoid `any`.
- Keep changes small, focused, and consistent with project conventions.

## Security Guidelines

- Follow OWASP Top 10 guidance.
- Never hardcode API keys, tokens, or credentials.
- Validate and sanitize untrusted input.
- Validate all file uploads (type, size, and content) on the server.
