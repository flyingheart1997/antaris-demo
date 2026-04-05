# AI Working Rules

## Purpose
These rules define how any AI assistant MUST behave when working on the Antaris codebase. Following these rules ensures consistency, prevents regressions, and maintains the architectural integrity of the project.

---

## Rule 1: ALWAYS Read AI Context Before Coding

Before making ANY code changes:
1. Read `docs/ai-context/system-overview.md` — Understand what the project does
2. Read `docs/ai-context/folder-structure.md` — Know where things go
3. Read `docs/ai-context/coding-rules.md` — Follow established patterns
4. Read `docs/ai-context/feature-map.json` — Understand feature-to-file mapping
5. Read `docs/ai-context/tech-stack.md` — Know what technologies are used

**Never skip this step.** Even for small changes, context prevents mistakes.

---

## Rule 2: NEVER Assume Structure

- Do NOT assume a file exists — verify first
- Do NOT assume a component is available — check `components/ui/`
- Do NOT assume an API route exists — check `app/(server)/router/`
- Do NOT assume a feature has a specific structure — read its `index.ts`
- When in doubt, **read the actual code** before writing new code

---

## Rule 3: FOLLOW coding-rules.md Strictly

The `docs/ai-context/coding-rules.md` file defines:
- Component architecture patterns (CVA, forwardRef)
- Styling rules (design tokens, Tailwind v4)
- Data fetching patterns (oRPC + TanStack Query)
- State management rules (Zustand vs TanStack Query)
- Import conventions (path aliases)
- Naming conventions

**Every line of code you write MUST comply with these rules.**

---

## Rule 4: UPDATE Documentation After Any Change

After making code changes, update the relevant documentation:

| Change Type | Documentation to Update |
|---|---|
| New component in `components/ui/` | `docs/ai-context/feature-map.json` → `design-system.component-list` |
| New feature module | `docs/features/<feature-name>.md`, `docs/ai-context/feature-map.json` |
| New oRPC route | `docs/ai-context/feature-map.json` → `orpc-api.namespaces`, `docs/modules/orpc-api.md` |
| New provider | `docs/ai-context/feature-map.json` → `providers`, `docs/ai-context/folder-structure.md` |
| Architecture change | `docs/architecture/system-design.md`, `docs/architecture/data-flow.md` |
| New dependency | `docs/ai-context/tech-stack.md` |
| New folder/file pattern | `docs/ai-context/folder-structure.md` |
| Changed coding convention | `docs/ai-context/coding-rules.md` |

---

## Rule 5: DO NOT Break Existing Architecture

- Do NOT bypass the oRPC API layer (no raw `fetch()` from client components)
- Do NOT store server data in Zustand (use TanStack Query)
- Do NOT create API routes outside the oRPC router (except auth)
- Do NOT modify the provider tree order without understanding dependencies
- Do NOT skip Arcjet security middleware on write operations
- Do NOT violate the feature module boundary (no cross-feature imports of internals)

---

## Rule 6: Prefer Existing Patterns

Before creating something new:
1. Check if a similar pattern exists in the codebase
2. Follow the same approach (don't invent new patterns)
3. If a new pattern is needed, document it in `docs/decisions/`

---

## Rule 7: Test Before Completing

- Run `npm run dev` and verify the change works
- Check for TypeScript errors
- Check for runtime errors in the browser console
- Verify the UI renders correctly

---

## Rule 8: Design System Compliance

When creating or modifying UI components:
1. Read `docs/ai-context/coding-rules.md` for styling rules and conventions
2. Read `docs/features/design-system.md` for token details and component list
3. Use semantic design tokens from `styles/src/index.css`
4. Use CVA for variant management
5. Follow Figma specifications if available

---

## Rule 9: Error Handling Compliance

- Server-side: Use oRPC error types (`FORBIDDEN`, `NOT_FOUND`, etc.)
- Client-side: Use Sonner toast for user-facing errors
- Always wrap async operations in try/catch
- Never expose raw error messages to users

---

## Rule 10: Documentation Quality

When writing or updating documentation:
- Be specific, not vague
- Include code examples where helpful
- Keep documentation DRY (don't duplicate information)
- Use tables for reference data
- Use Mermaid diagrams for flows
- Keep it up to date with every code change
