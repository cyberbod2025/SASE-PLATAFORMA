import { Sparkles } from 'lucide-react';

export function SasitoOrbPlaceholder() {
  return (
    <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-6">
      <button
        type="button"
        disabled
        className="group relative flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full border border-cyan-200 bg-slate-950 text-cyan-100 opacity-70 shadow-luminous"
        aria-describedby="sasito-placeholder-help"
        aria-label="Sasito en preparación"
        title="Sasito en preparación"
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
