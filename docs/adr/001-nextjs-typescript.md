# ADR-001: Next.js 15 with TypeScript for Photo Gallery Application

- **Status**: Accepted
- **Date**: 2024-01-15

## Context

The application requires a modern, performant framework for a photo gallery and portfolio experience with secure file uploads, image-heavy rendering, and SEO-friendly routing. The team also requires strong developer ergonomics and maintainable code as the project grows.

## Decision

Adopt **Next.js 15 with TypeScript** using the **App Router** architecture.

## Considered Alternatives

- Create React App
- Vite + React
- Remix
- SvelteKit

## Rationale

- **Built-in image optimization** with `next/image` improves performance for large photo assets.
- **App Router and server components** support scalable data-fetching and reduce client bundle size.
- **TypeScript type safety** improves reliability for shared data models (for example `Photo`) and component contracts.
- **Large ecosystem** of React/Next.js libraries and community support.
- **Vercel deployment alignment** simplifies production hosting, previews, and CI/CD integration.

## Consequences

### Positive

- Better web performance and SEO defaults.
- Strong developer experience with modern routing and framework conventions.
- Safer refactoring with TypeScript static analysis.
- Clear path to production deployment with mature tooling.

### Negative

- Potential vendor lock-in risk when relying heavily on Next.js/Vercel platform features.
- Learning curve for App Router patterns, server components, and server/client boundaries.

## Security Implications

- Server components reduce client-side attack surface by keeping sensitive logic off the browser.
- Next.js platform patterns provide built-in protections that support CSRF-resistant flows when using recommended server handling.
- Server actions and route handlers provide safer form and file-upload handling patterns when paired with strict validation and authorization.
