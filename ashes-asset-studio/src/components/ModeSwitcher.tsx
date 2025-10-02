import { useAsset } from "../context/useAsset";

export function ModeSwitcher() {
  const {
    state: {
      editor: { mode }
    },
    dispatch
  } = useAsset();

  const modes: { value: "form" | "json"; label: string; description: string }[] = [
    { value: "form", label: "Form Mode", description: "Guided fields with inline validation." },
    { value: "json", label: "JSON Mode", description: "Paste raw JSON and validate via schema." }
  ];

  return (
    <section aria-labelledby="mode-switcher-heading" className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 id="mode-switcher-heading" className="text-sm font-semibold uppercase text-slate-200">
            2. Choose Input Mode
          </h2>
          <p className="mt-1 text-xs text-slate-400">Switch anytime—drafts persist while you experiment.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {modes.map((entry) => {
          const isActive = entry.value === mode;
          return (
            <button
              key={entry.value}
              type="button"
              onClick={() => dispatch({ type: "setMode", payload: { mode: entry.value } })}
              aria-pressed={isActive}
              className={`rounded-lg border px-4 py-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                isActive
                  ? "border-amber-500/80 bg-amber-500/10 text-amber-100"
                  : "border-slate-800 bg-slate-950/60 text-slate-200 hover:border-amber-400/60 hover:text-amber-100"
              }`}
            >
              <span className="block text-xs font-semibold uppercase tracking-wide">{entry.label}</span>
              <span className="mt-1 block text-[11px] text-slate-400">{entry.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
