# SASE-310-FULL

Scaffold base de SASE-310 para React, Vite, TypeScript, Tailwind, Vitest, ESLint y Vercel.

## Comandos de Fase 1

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm run build
```

## Variables

Copiar `.env.example` a `.env.local` en entornos locales. No incluir llaves secretas ni `service_role` en variables `VITE_*`.

## Fase 1.5 - Sistema visual institucional

La identidad visual `SASE Institucional Luminous` mejora el scaffold sin agregar funcionalidad real:

- shell institucional con marca, rol activo y estado de fase;
- sidebar agrupada por jerarquía operativa;
- módulos placeholder con estado profesional `En preparación`;
- tarjetas visuales reutilizables para alcance, roles y próximas capacidades;
- placeholder visual de Sasito sin comportamiento operativo.

Esta fase no implementa Supabase, RLS, dashboards reales, expediente real ni integraciones externas.
