# Sharing Skills

## Installing a skill from a shared repository

Install a skill. You can run `gh skill install` with no arguments for a fully interactive flow, or specify a repository to browse its skills interactively:

```
gh skill install OWNER/REPOSITORY SKILL
```


## Publishing skills

If you maintain a skills repository, you can validate and publish your skills using GitHub CLI.

To validate your skills against the Agent Skills specification and check remote settings like tag protection, secret scanning, and code scanning, without publishing, use --dry-run:
```
gh skill publish --dry-run
```
To auto-fix metadata issues in your skill files, use --fix. This does not publish your skills:
```
gh skill publish --fix
```
To validate and publish your skills:
```
gh skill publish
```

### Directpry Structure

A skill is a directory containing, at minimum, a SKILL.md file:

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

[Optional Directories](https://agentskills.io/specification#optional-directories)