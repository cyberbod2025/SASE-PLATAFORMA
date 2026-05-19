# Agent Skills — SASE-310-FULL

Antes de trabajar en este repo, todo agente debe:

1. Leer solo:
   - .agent-context/CURRENT_TASK.md
   - .agent-context/PROJECT_MAP.md
   - .agent-context/DO_NOT_TOUCH.md
   - .agent-context/KNOWN_DEBT.md

2. No escanear todo el repo.

3. Declarar archivos candidatos antes de editar.

4. No usar git add .

5. Validar antes de reportar:
   - pnpm lint
   - pnpm type-check
   - pnpm exec tsc --noEmit
   - pnpm test
   - pnpm run build

6. No commit sin autorización humana.
