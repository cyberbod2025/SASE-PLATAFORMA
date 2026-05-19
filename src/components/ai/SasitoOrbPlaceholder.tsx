import { Sparkles } from 'lucide-react';

export function SasitoOrbPlaceholder() {
  return (
    <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
      <button
        type="button"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200 bg-slate-950 text-cyan-100 shadow-luminous transition hover:-translate-y-0.5 hover:border-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
        aria-describedby="sasito-placeholder-help"
        aria-label="Sasito en preparación"
      >
        <Sparkles aria-hidden="true" size={20} />
        <span
          id="sasito-placeholder-help"
          role="tooltip"
          className="pointer-events-none absolute bottom-14 right-0 w-64 rounded-lg border border-slate-200 bg-white p-3 text-left text-sm font-medium leading-6 text-slate-700 opacity-0 shadow-luminous transition group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Sasito estará disponible en fases posteriores.
        </span>
      </button>
    </div>
  );
}
