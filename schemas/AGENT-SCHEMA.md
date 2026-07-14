# GitHub Copilot Custom Agent Schema Specification

This document defines the schema and authoring guidelines for **GitHub Copilot Custom Agents** contributed to this repository.

## What Is a Custom Agent?

Custom agents are tailored Copilot versions for your workflows, conventions, and use cases. Define them once using agent profile Markdown files—specifying prompts, tools, and MCP servers—to encode your standards directly into Copilot. The agent profile defines behavior, instantiating the custom agent when assigned to tasks or issues.

## Limitations

- Non-deterministic behavior: Copilot may not follow every instruction perfectly every time.
- Context limits: Very long instruction files may result in some instructions being overlooked.
- Specificity matters: Clear, specific instructions work better than vague directives.

## Where you can configure custom agents

You can define agent profiles at different levels:

- Repository level: Create `.github/agents/CUSTOM-AGENT-NAME.md` in your repository for project-specific agents.
- Organization level: Create `/agents/CUSTOM-AGENT-NAME.md` in the organization's `.github` or `.github-private` repository for broader availability within the organization.
- Enterprise level: Create `/agents/CUSTOM-AGENT-NAME.md` in the `.github-private` repository of an organization that an enterprise owner has designated in enterprise settings for availability across all repositories in the enterprise.

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
name: my-custom-agent-with-mcp
description: Custom agent description
tools: ['tool-a', 'tool-b', 'custom-mcp/tool-1']
mcp-servers:
  custom-mcp:
    type: 'local'
    command: 'some-command'
    args: ['--arg1', '--arg2']
    tools: ["*"]
    env:
      ENV_VAR_NAME: ${{ secrets.COPILOT_MCP_ENV_VAR_VALUE }}
---

# [Title: Technology or Domain Name] Guidelines

<Body — instructions for GitHub Copilot>
```

### YAML Frontmatter (Required)

The file **must** begin with a YAML frontmatter block delimited by `---`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | ❌ | Display name for the custom agent. Optional. |
| `description` | `string` | ✅ | **Required** string. Description of the custom agent's purpose and capabilities. |
| `target` | `string` | ❌ | Target environment or context for the custom agent (`vscode` or `github-copilot`). If unset, defaults to both environments. |
| `tools` | list of strings, string | ❌ | List of tool names the custom agent can use. Supports both a comma separated string and yaml string array. If unset, defaults to all tools. See [Tools](https://docs.github.com/en/copilot/reference/custom-agents-configuration#tools). |
| `model` | `string` | ❌ | Model to use when this custom agent executes. If unset, inherits the default model. |
| `disable-model-invocation` | `boolean` | ❌ | Disables Copilot cloud agent from automatically using this custom agent based on task context. When `true`, the agent must be manually selected. Setting `disable-model-invocation: true` is equivalent to `infer: false`. If both are set, `disable-model-invocation` takes precedence. If unset, defaults to `false`. |
| `user-invocable` | `boolean` | ❌ | Controls whether this custom agent can be selected by a user. When `false`, the agent cannot be manually selected and can only be accessed programmatically. If unset, defaults to `true`. |
| `infer` | `boolean` | ❌ | **Retired**. Use `disable-model-invocation` and `user-invocable` instead. Enables Copilot cloud agent to automatically use this custom agent based on task context. When `false`, the agent must be manually selected. If unset, defaults to `true`. |
| `mcp-servers` | `object` | ❌ | Additional MCP servers and tools that should be used by the custom agent. **Not used in VS Code and other IDE custom agents.** |
| `metadata` | object consisting of a name and value pair, both strings | ❌ | Allows annotation of the agent with useful data. **Not used in VS Code and other IDE custom agents.** |

### Body Structure

The Markdown body after the frontmatter contains the instructions. There are no format restrictions. Write whatever helps agents perform the task effectively.

Recommended structure (concise and relationship-first):

- **Title**: Short domain or role label.
- **Purpose**: What the agent is for, when to use it, and primary outcomes.
- **Scope**: In-scope vs out-of-scope tasks.
- **Core Rules**: Non-negotiable constraints (security, safety, correctness).
- **Workflow**: Ordered execution steps for typical requests.
- **Tooling**: Allowed tools, MCP/tool boundaries, and escalation rules.
- **Validation**: Required checks before responding (tests, lint, assumptions).
- **Output Contract**: Expected response shape and level of detail.
- **Examples (optional)**: One good example and one anti-pattern.

Component relationships for clarity and token efficiency:

- Purpose -> Scope -> Core Rules -> Workflow -> Validation -> Output Contract.
- Put stable policy in **Core Rules** and procedural detail in **Workflow**.
- Keep each section short; prefer bullets over prose.

## Sharing Custom Agents

- Create your test custom agent
  - In your organization or enterprise's .github-private repository, create a new directory called .github/agents. Agents stored in this directory are only available to members of your organization or enterprise who have access to the .github-private repository, and can only be used when they start a task within that repository.
  - In your .github/agents directory, create the agent profile for your test agent. You can create a net-new profile or duplicate an existing profile to test potential updates. For information on configuring an agent profile, see Creating custom agents for Copilot cloud agent.
  - Merge your test agent profile into the default branch of your repository.

- Test your custom agent
  - Go to the agents tab at [github.com/copilot/agents](https://github.com/copilot/agents).
  - Using the dropdown menu in the prompt box, select your .github-private repository.
  - Select the custom agent dropdown, then click your test agent.
  - To test your custom agent, send Copilot a prompt.
  - In the "Recent sessions" section, click your session to see detailed information about your results.
  - Continue making changes and testing your custom agent as needed until you are satisfied with its performance.

- Release your custom agent
  - In your .github-private repository, move your agent profile from the .github/agents directory into the agents directory.
  - Merge your changes into the default branch. Your custom agent is now available to all users in your organization or enterprise.
