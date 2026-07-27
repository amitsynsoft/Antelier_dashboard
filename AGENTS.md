<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Antelier Dashboard — Project Conventions & AI Agent Guidelines

## 1. Tech Stack Overview
- **Framework**: Next.js 16+ (App Router, React 19)
- **Language**: TypeScript 5+ (Strict Mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), Base UI (`@base-ui/react`), Shadcn UI
- **Icons**: Lucide React (`lucide-react`)
- **Animation**: Framer Motion (`framer-motion`)
- **Theme**: Light & Dark mode via `next-themes`

---

## 2. Code Style & Formatting Rules
All code must adhere to `.prettierrc` specifications:
- **Semicolons**: `false` — Do NOT use trailing semicolons at the end of statements.
- **Quotes**: Double quotes (`"..."`) for all string literals and JSX attributes.
- **Indent**: 2 spaces (no hard tabs).
- **Trailing Commas**: `es5` (commas where valid in ES5, e.g., objects, arrays).
- **Class Merging**: Always use the `cn(...)` utility from `@/lib/utils` when merging dynamic or conditional Tailwind classes.

---

## 3. Directory Structure & Path Aliases
Always use path aliases defined in `tsconfig.json` (`@/*` maps to project root `./`):
- `@/app` — App Router pages, layouts, API routes, and global styles (`globals.css`).
- `@/components/ui` — Reusable, atomic UI primitives (Shadcn / Base UI).
- `@/components/forms` — Form components and form-related logic.
- `@/components/layout` — Structural layout components (Navbars, Sidebars, Footers).
- `@/components/shell` — Core application shell and wrapper layouts.
- `@/features` — Domain-specific feature modules and views.
- `@/hooks` — Custom React hooks.
- `@/context` — React Context providers for global/workspace state management.
- `@/lib` — Core utilities and helper functions (e.g. `utils.ts`).
- `@/types` — Centralized TypeScript interfaces and type definitions.
- `@/mock` — Mock data sets and seed state.

---

## 4. Component & React Conventions
1. **Server vs. Client Components**:
   - Default to Server Components (`React Server Components`).
   - Add `"use client"` at the very top of files that require browser interactivity, state (`useState`, `useReducer`), effects (`useEffect`), context consumption, or DOM event handlers.
2. **Component Declarations**:
   - Define components as functional components using `export function ComponentName({ ... }: ComponentProps)`.
   - Prefer named exports for components in `@/components/` and `@/features/`.
   - Use default exports for Next.js routing files (`page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`).
3. **Props & Type Safety**:
   - Define explicit TypeScript interfaces for component props (e.g., `interface ComponentNameProps { ... }`).
   - Do NOT use `any`. Use proper interfaces, generics, or union types.
4. **Icons**:
   - Import icons directly from `lucide-react` (e.g., `import { Bot, Sparkles } from "lucide-react"`).

---

## 5. UI & Styling Guidelines
- **Theme Variables**: Use semantic Tailwind color classes consistent with CSS variables (e.g., `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`).
- **Responsive Design**: Mobile-first design using Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- **Accessibility**: Ensure form inputs have clear `<label>`s, proper `aria-` attributes, and keyboard navigation support.

---

## 6. Verification & Development Scripts
Before declaring code changes ready, execute relevant validation scripts:
- **Development**: `npm run dev`
- **Typecheck**: `npm run typecheck` (`tsc --noEmit`)
- **Linting**: `npm run lint` (`eslint`)
- **Formatting**: `npm run format` (`prettier --write "**/*.{ts,tsx}"`)
- **Build**: `npm run build` (`next build`)

