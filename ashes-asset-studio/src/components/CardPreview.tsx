import { clsx } from "clsx";
import { useAsset } from "../context/useAsset";
import { AssetType } from "../schemas/types";

const labelMap: Record<AssetType, string> = {
  monsterStat: "Monster Stat Card",
  monsterAbility: "Monster Ability Card",
  heroAbility: "Hero Ability Card",
  equipment: "Equipment Card",
  consumable: "Consumable Card",
  burden: "Burden Resolution Card",
  ash: "Ash Surge Card"
};

export function CardPreview() {
  const {
    state: {
      editor: { selectedType, draft }
    }
  } = useAsset();

  if (!selectedType || !draft) {
    return (
      <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center text-sm text-slate-400">
        Save an asset to see the Ashen card frame come to life.
      </section>
    );
  }

  const name = (draft as Record<string, unknown>).name ?? "Unnamed Asset";
  const subtitle = labelMap[selectedType];

  return (
    <section className="mt-6">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase text-slate-200">Preview</h2>
        <span className="text-xs text-slate-500">Shared Ashen brand across asset types</span>
      </header>
      <article className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 p-6 shadow-[0_0_40px_rgba(255,176,0,0.15)]">
        <div className="flex items-baseline justify-between text-amber-200">
          <h3 className="font-display text-2xl uppercase tracking-[0.2em]">{String(name)}</h3>
          <span className="rounded-full border border-amber-500/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-300">
            {subtitle}
          </span>
        </div>
        <div className="mt-4 rounded-lg border border-slate-800/70 bg-slate-950/80 p-4 text-left text-sm text-slate-200">
          {Object.entries(draft as Record<string, unknown>).map(([key, value]) => {
            const displayValue = Array.isArray(value)
              ? value.join(", ")
              : value && typeof value === "object"
                ? JSON.stringify(value, null, 0)
                : value ?? "—";
            return (
              <div
                key={key}
                className={clsx(
                  "flex justify-between border-b border-slate-800/40 py-1 text-xs uppercase tracking-wide",
                  key === "traits" && "items-start"
                )}
              >
                <span className="text-slate-400">{key}</span>
                <span className="text-amber-100">{String(displayValue)}</span>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}
