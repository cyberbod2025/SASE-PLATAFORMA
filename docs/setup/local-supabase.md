# Supabase local

Esta guia prepara el entorno local de SASE-310 para una ejecucion posterior
del seed. No inicia servicios, no ejecuta migrations y no carga
`supabase/seed.sql`.

## Requisitos

- Trabajar en `/home/hugo_system/code/SASE-310-FULL`.
- Usar Supabase CLI `2.90.0` o una version compatible con
  `supabase/config.toml`.
- Usar exclusivamente una instancia local o un entorno de desarrollo
  autorizado. Nunca usar produccion.

## Configurar el entorno de la aplicacion

1. Crea el archivo local a partir de la plantilla:

   ```bash
   cp .env.example .env.local
   ```

2. Completa localmente estas variables sin compartir ni registrar sus valores:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

3. Establece `VITE_APP_ENV` como `local` o `development`.

4. Confirma que `VITE_SUPABASE_URL` use `localhost` o `127.0.0.1`. Detente si
   contiene `supabase.co`, una IP remota o cualquier host de produccion.

5. Confirma que Git protege el archivo:

   ```bash
   git check-ignore -v .env.local
   git status --short
   ```

`.env.local` esta cubierto por las reglas actuales de `.gitignore`. Nunca debe
agregarse al staging, commit, documentacion, capturas o logs.

## Checklist previo al seed

- [ ] `pwd` es exactamente `/home/hugo_system/code/SASE-310-FULL`.
- [ ] El stack de Supabase esta iniciado y corresponde a este proyecto local.
- [ ] `.env.local` existe, esta ignorado y apunta solo a local/dev.
- [ ] No hay datos reales en la instancia de destino.
- [ ] `supabase/seed.sql` conserva exclusivamente datos demo.
- [ ] Existe autorizacion explicita para ejecutar el seed.
- [ ] Produccion y cualquier proyecto remoto estan fuera de la operacion.

Detenerse si no puede demostrarse cualquiera de estas condiciones. No usar
`supabase db reset`, `supabase db push`, `supabase db seed` ni ejecutar SQL
durante esta fase de preparacion.

## Alcance de esta preparacion

- `supabase/config.toml` configura el proyecto local.
- `.env.local` se crea solo en la maquina del desarrollador y no se commitea.
- El seed queda preparado para una fase posterior, pero no se ejecuta.
- Incidentes y auditoria continuan como funcionalidades mock en la interfaz.
