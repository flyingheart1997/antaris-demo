# Documentation Sync Rules

## Purpose
These rules ensure documentation stays in sync with code changes. **Stale documentation is worse than no documentation** — it misleads both AI and developers.

---

## Mandatory Update Rules

### When Code Changes → Update Documentation

| Code Change | Documentation Updates Required |
|---|---|
| **New UI component** in `components/ui/` | • `docs/ai-context/feature-map.json` → add to `design-system.component-list` |
| **New feature module** in `features/` | • Create `docs/features/<name>.md`<br/>• `docs/ai-context/feature-map.json` → add new feature entry<br/>• `docs/ai-context/folder-structure.md` → add feature directory |
| **New oRPC route** | • `docs/ai-context/feature-map.json` → add to `orpc-api.namespaces`<br/>• `docs/modules/orpc-api.md` → document new route<br/>• `docs/architecture/api-architecture.md` → add to endpoint table |
| **New provider** | • `docs/modules/providers.md` → add provider and explain position<br/>• `docs/ai-context/feature-map.json` → update providers list |
| **New Zustand store** | • `docs/modules/state-management.md` → document new store<br/>• `docs/ai-context/folder-structure.md` → add to store directory |
| **New dependency** added to `package.json` | • `docs/ai-context/tech-stack.md` → add to appropriate section |
| **New environment variable** | • `docs/ai-context/tech-stack.md` → add to env var table |
| **New folder** or **structural change** | • `docs/ai-context/folder-structure.md` → update tree |
| **Changed coding convention** | • `docs/ai-context/coding-rules.md` → update rules |
| **Architecture decision** | • Create `docs/decisions/<date>-<topic>.md` |
| **New middleware** | • `docs/features/security.md` → update middleware table<br/>• `docs/architecture/api-architecture.md` → update security section |
| **Auth flow changes** | • `docs/features/authentication.md` → update flow diagram |
| **Design token changes** | • `docs/features/design-system.md` → update token tables |

---

## Decision Records

When making significant architectural decisions, create an Architectural Decision Record (ADR):

### File Location
`docs/decisions/<YYYY-MM-DD>-<topic>.md`

### Template
```markdown
# ADR: <Title>

## Date
YYYY-MM-DD

## Status
Proposed | Accepted | Deprecated | Superseded

## Context
What is the issue that we're seeing that is motivating this decision?

## Decision
What is the change that we're proposing?

## Consequences
What becomes easier or harder?
```

---

## Verification Checklist

Before marking any PR/change as complete, verify:

- [ ] All affected documentation files have been updated
- [ ] `feature-map.json` reflects current file-to-feature mapping
- [ ] `folder-structure.md` reflects current project structure
- [ ] `tech-stack.md` lists all current dependencies
- [ ] `coding-rules.md` reflects current conventions
- [ ] Feature docs accurately describe current behavior
- [ ] Architecture docs reflect current system design
