# GitHub Copilot Instructions Schema Specification

This document defines the schema and authoring guidelines for **GitHub Copilot Instructions** contributed to this repository.

## What Is a custom instruction?

Repository custom instructions give Copilot persistent context about your project—its structure, coding standards, and how to build and test code. Every Copilot interaction in the repository uses these instructions automatically.

Personal custom instructions apply to every conversation you have on the GitHub website, so Copilot always responds in your preferred language, tone, and style.

Organization owners can add instructions for Copilot, to tailor responses to specific needs and preferences across the organization. For an overview of this, and other types of custom instructions for Copilot, see [About customizing GitHub Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=webui).

Instructions are different from prompts and skills:

| Concept | What it is | Where it runs |
|---------|-----------|---------------|
| **Prompt** | A single natural-language instruction the user types | Microsoft 365 Copilot, Microsoft Copilot, or GitHub Copilot Chat |
| **Skill** | A reusable instruction file that teaches GitHub Copilot a multi-step task | GitHub Copilot in VS Code (via `.github/skills/` or workspace config) |
| **Custom Instruction** | A reusable instruction file that provides GitHub Copilot a set of custom instructions for personal preferences, repository standards and structure, and org preferences | GitHub Copilot in VS Code (via `.github/copilot-instructions.md` or workspace config) |

## Limitations

- Non-deterministic behavior: Copilot may not follow every instruction perfectly every time.
- Context limits: Very long instruction files may result in some instructions being overlooked.
- Specificity matters: Clear, specific instructions work better than vague directives.

## Order of Evaluation

Multiple types of custom instructions can apply to a request sent to Copilot. However certain instructions take priority over others. 

1. Personal instructions take the highest priority. 
2. Repository instructions come next
3. Then organization instructions are prioritized last. 

However, all sets of relevant instructions are provided to Copilot.

### When to use repository-wide instructions

Use `.github/copilot-instructions.md` for:

- General team standards and guidelines
- Universal security requirements
- Cross-cutting concerns like error handling philosophy
- Documentation expectations

### When to use path-specific instructions

Use *.instructions.md files with the applyTo frontmatter property for:

- Language-specific coding standards
- Framework-specific patterns
- Technology-specific security concerns
- Different rules for different parts of your codebase

### When to use agent-specific instructions

Use AGENTS.md for instructions that apply to specific custom agents in your repository. This allows you to tailor the behavior of different agents for different tasks, including shaping Copilot code review feedback to better reflect your repository's conventions and expectations.

## Directory Structure

```markdown
AGENTS.md                          # Agent-specific

.github/
  copilot-instructions.md          # General standards

.github/instructions/
  python.instructions.md           # Python-specific
  javascript.instructions.md       # JavaScript-specific
  security.instructions.md         # Security-specific
  api.instructions.md              # API-specific
```

## Best practices

- Keep instructions short and focused - Shorter instruction files are more likely to be fully processed by Copilot. Start with a minimal set of instructions and add more iteratively based on what works.
- Use clear structure and formatting - Copilot benefits from well-structured instructions with:
  - Distinct headings that separate different topics.
  - Bullet points for easy scanning and reference.
  - Short, imperative directives rather than long narrative paragraphs.
- Provide concrete examples - Just like when you explain a concept to a colleague, examples help Copilot understand what you mean. Include code snippets showing both correct and incorrect patterns.

## File Format

```markdown
---
applyTo: "**/*.{js,ts}"  # If this is a path-specific file
---

# [Title: Technology or Domain Name] Guidelines

<Body — instructions for GitHub Copilot>
```

## Body Structure

The Markdown body after the frontmatter contains the instructions. There are no format restrictions. Write whatever helps agents perform the task effectively.

Recommended sections:

- Title
- Purpose - Brief statement of what this file covers and when these instructions apply.
- Conventions
- Style
- Error handling
- Security considerations
- Testing
- Performance

## What not to include in custom instructions

Understanding what Copilot code review currently doesn't support helps you avoid wasting time on instructions that won't work.

- Unsupported instruction types - Copilot code review currently does not support instructions that attempt to:
  - Change the user experience or formatting
  - Modify the pull request overview comment:
  - Change GitHub Copilot's core function
  - Follow external links (Workaround: Copy the relevant content directly into your instruction file instead)
  - Vague quality improvements