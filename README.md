# Photo Gallery & Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

A security-focused **Photo Gallery & Portfolio** application built with **Next.js 15** and **TypeScript**.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- React 19
- Tailwind CSS
- react-dropzone
- Framer Motion
- Lucide React

## Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

## Installation

```bash
git clone https://github.com/Williams-Playground/copilot-skills-and-custom-agents.git
cd copilot-skills-and-custom-agents
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file for runtime configuration:

```bash
NEXT_PUBLIC_API_URL=
UPLOAD_STORAGE_BUCKET=
UPLOAD_STORAGE_REGION=
UPLOAD_MAX_FILE_SIZE_MB=10
```

> These values are placeholders for future API/storage integration.

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Run production server
- `npm run lint` — Run ESLint checks

## Project Structure

```text
src/
├── app/            # Next.js app router pages and layouts
├── components/     # UI, gallery, and upload components
└── lib/            # Mock data and shared utilities
docs/
├── api/            # OpenAPI specifications
├── components/     # Component documentation
└── adr/            # Architecture decision records
```

## Security Features

- Security-first design aligned with **OWASP Top 10** principles
- File upload constraints for type and size (JPEG/PNG/GIF/WebP, max 10MB)
- Input validation and sanitization expectations on API boundaries
- JWT bearer-token based authentication model for protected API endpoints

## Deployment

Typical production workflow:

1. `npm run build`
2. `npm run start` for self-hosted runtime, or deploy to a Next.js-compatible platform (for example Vercel)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
