# Scope Guard

Objetivo:
Evitar que el agente expanda el alcance.

Reglas:
- Una tarea = un alcance.
- No agregar dependencias salvo autorización.
- No tocar package.json/pnpm-lock sin autorización.
- No modificar archivos fuera de candidatos declarados.
- No implementar fases futuras.
- No vender placeholders como funcionalidad real.

Formato requerido antes de editar:
- Objetivo
- Archivos candidatos
- Archivos prohibidos
- Validación esperada
