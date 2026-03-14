# AGENTS.md - Agentic Coding Guidelines

## Overview

Black Quantum Labs is a Next.js 16 + TypeScript digital engineering studio website. This file provides guidelines for agents working on this codebase.

---

## Build Commands

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run linter on specific file
npx eslint path/to/file.tsx

# Run linter with auto-fix
npm run lint -- --fix
```

---

## Code Style Guidelines

### General Conventions

- **Language**: TypeScript (strict mode enabled)
- **Framework**: Next.js 16 (App Router)
- **Package Manager**: npm
- **Styling**: Tailwind CSS 4 with custom design tokens

### TypeScript

- Strict mode is enabled in `tsconfig.json` - do not disable it
- Always define proper types for props, function parameters, and return values
- Use interface for object shapes, type for unions/aliases
- Avoid `any` - use `unknown` if type is truly unknown

### Imports

- Use path alias `@/*` for all imports (configured in `tsconfig.json`)
- Order imports: external libs → components → utils/constants → types
- Group imports with blank lines between groups

```typescript
// Good
import { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./types";
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `HeroSection.tsx`)
- **Files**: kebab-case for non-component files (e.g., `utils.ts`, `constants.ts`)
- **Variables/functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for runtime constants, camelCase for config objects
- **Interfaces**: PascalCase with `Props` suffix for component props (e.g., `ButtonProps`)

### Component Structure

```typescript
import React from "react";
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export function ComponentName({ variant = "primary", className }: ComponentNameProps) {
  return (
    <div className={cn("base-styles", variantClasses[variant], className)}>
      {/* content */}
    </div>
  );
}
```

### Tailwind CSS

- Use Tailwind's `@apply` sparingly - prefer utility classes directly in JSX
- Use CSS variables defined in `app/globals.css` for colors
- Available colors: `bg`, `bg-2`, `bg-3`, `surface`, `border`, `border-strong`, `cyan`, `ink`, `ink-2`, `ink-3`
- Use `cn()` utility from `@/lib/utils` for conditional class merging
- Use `class-variance-authority` (cva) for component variants

### CSS/Tailwind Patterns

- Use CSS custom properties for theme colors (not hardcoded hex values)
- Prefer Tailwind utilities over custom CSS
- Use `var(--color-*)` tokens for colors in custom CSS
- Avoid transitions on universal selector - apply per-element

### Error Handling

- Use try/catch for async operations
- Handle errors gracefully with user feedback
- Log errors appropriately for debugging
- Use Zod for runtime validation of external data

### File Organization

```
app/                    # Next.js App Router pages
├── page.tsx           # Home page
├── layout.tsx         # Root layout
├── globals.css        # Global styles + design tokens
└── [slug]/            # Dynamic routes

components/
├── ui/                # Reusable UI components (Button, Card, etc.)
├── sections/          # Page sections (HeroSection, ServicesSection, etc.)
├── layout/            # Layout components (Navbar, Footer, etc.)
├── animations/        # Animation components
└── three/             # Three.js/React Three Fiber components

lib/
├── utils.ts           # Utility functions (cn, etc.)
└── constants.ts       # Static constants
```

### React/Next.js Patterns

- Use Server Components by default in App Router
- Add "use client" directive only when needed (hooks, event handlers, browser APIs)
- Use proper metadata export for SEO
- Use `next-themes` for theme management (dark/light mode)

### Testing

- Currently no test framework configured
- If adding tests, use Vitest for unit tests
- Test files should be named `*.test.tsx` or `*.spec.tsx`

### Linting & Formatting

- ESLint is configured with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Prettier is available as dev dependency
- Run `npm run lint` before committing
- ESLint ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Common Patterns

**Conditional classes:**

```typescript
const variants = {
  primary: "bg-cyan text-bg",
  secondary: "bg-surface text-ink",
};

<div className={cn(baseClass, variants[variant])} />
```

**Client component directive:**

```typescript
"use client";

import { useState } from "react";
// component code...
```

**Font usage:**

```typescript
// In layout.tsx
import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({ variable: "--font-syne", subsets: ["latin"] });
// Apply via className: ${syne.variable}
```

---

## Environment Variables

- Copy `.env` to `.env.local` for local development
- Never commit `.env.local` or secrets
- Required variables are defined in `.env` file

---

## Important Notes

1. The project uses custom cursor - see `CustomCursor.tsx`
2. Three.js/React Three Fiber components require client-side rendering
3. Lenis is used for smooth scrolling
4. Design system uses CSS variables for theming (dark/light mode)
5. The project uses custom grain texture overlay on body

---

## Key Dependencies

- Next.js 16.1.6
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12
- React Three Fiber + Drei
- Zod (validation)
- next-themes (dark mode)

---

## Services & Pricing Structure

The project has 10 services defined in `lib/constants.ts`:

### Services (with slugs)

1. **Web Engineering** (`web-engineering`) - Full-stack web platforms, SaaS, marketing sites
2. **Mobile Development** (`mobile-development`) - iOS/Android with React Native
3. **AI & Automation** (`ai-automation`) - LLM integrations, RAG pipelines, workflow automation
4. **Cloud & DevOps** (`cloud-devops`) - AWS/GCP, Kubernetes, CI/CD
5. **UI/UX Design** (`ui-ux-design`) - Design systems, prototypes, Figma handoffs
6. **Tech Consulting** (`tech-consulting`) - Architecture reviews, CTO advisory
7. **API Development** (`api-development`) - REST/GraphQL, microservices, integrations
8. **E-commerce Solutions** (`ecommerce`) - Custom stores, payment integrations
9. **Data Engineering** (`data-engineering`) - Data pipelines, analytics dashboards
10. **Blockchain & Web3** (`blockchain`) - Smart contracts, dApp development

### Pricing (in USD)

- **Starter**: $2,500 – $5,000 (landing pages, MVPs)
- **Growth**: $8,000 – $18,000 (full-featured web/mobile apps)
- **Enterprise**: $25,000+ (end-to-end products with support)

### Individual Service Pages

Each service has its own dedicated page at `/services/[slug]` with:

- Full description and overview
- Features, benefits, and process tabs
- Service-specific pricing recommendations
- Related services section
- CTA to contact page

---

## UX Design Principles Implemented

The project follows these UX laws and principles:

- **Von Restorff Effect**: Highlighted "Most Popular" pricing tier stands out with distinct styling
- **Miller's Law**: Information grouped into digestible chunks (features lists limited to 4-6 items)
- **Law of Proximity**: Related elements visually grouped (features + benefits + process)
- **Law of Common Region**: Elements in same container perceived as related (pricing cards)
- **Peak-End Rule**: Memorable CTA sections at service page endings
- **Progressive Disclosure**: Tabbed interface for features/benefits/process to reduce cognitive load
- **Visual Hierarchy**: Clear typography scale and color usage to guide attention
