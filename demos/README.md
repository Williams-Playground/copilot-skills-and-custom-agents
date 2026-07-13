# Demo Guides

This folder contains the current hands-on demo guides for GitHub Copilot workflows.

## Available Demos

### 1. Customize Copilot ([1-customize-copilot.md](1-customize-copilot.md))

**What it covers:**

- Prompt files for reusable AI tasks
- Custom agent modes
- Custom instructions and MCP server setup/authentication

**Notes:**

- Best for teams standardizing Copilot behavior and workflow conventions.
- Includes a bonus challenge to create a custom prompt file for unit test generation.

---

### 2. Custom Skills in Agent Mode ([2-custom-skills.md](2-custom-skills.md))

**What it covers:**

- Creating a reusable skill with `/create-skill`
- Building a Python + Pillow image-resizing workflow
- Running the generated skill in Agent Mode and validating outputs

**Notes:**

- Requires Python 3.9+ and `pillow`.
- Uses the `copilot-agent-and-mcp` template flow in the setup steps.

---

### 3. Copilot Spaces ([3-copilot-spaces.md](3-copilot-spaces.md))

**What it covers:**

- Creating and configuring Copilot Spaces
- Adding instructions and context sources
- Collaborative workflows for security analysis or documentation planning

**Notes:**

- Includes two guided tracks: security hardening (Group A) and documentation/API design (Group B).

---

## Suggested Order

1. Start with `1-customize-copilot.md` to set up core Copilot customization.
2. Continue with `2-custom-skills.md` to practice reusable skill creation and execution.
3. Finish with `3-copilot-spaces.md` to apply collaboration workflows at team scale.
