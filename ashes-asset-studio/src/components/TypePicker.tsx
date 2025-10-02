import { AssetType } from "../schemas/types";
import { useAsset } from "../context/useAsset";

const typeOptions: { value: AssetType; label: string; description: string }[] = [
  {
    value: "monsterStat",
    label: "Monster Stat Card",
    description: "Core monster statline, traits, and scaling."
  },
  {
    value: "monsterAbility",
    label: "Monster Ability Card",
    description: "Initiative and scripted actions for encounters."
  },
  {
    value: "heroAbility",
    label: "Hero Ability Card",
    description: "Class skills with timing, outcomes, and costs."
  },
  {
    value: "equipment",
    label: "Item / Equipment",
    description: "Weapons, armor, and relics bearing perks and drawbacks."
  },
  {
    value: "consumable",
    label: "Consumable",
    description: "Single-use brews, bandages, or alchemical aids."
  },
  {
    value: "burden",
    label: "Burden Resolution",
    description: "Afflictions and virtues that shape a hero's psyche."
  },
  {
    value: "ash",
    label: "Ash Surge Card",
    description: "Optional module for Ash escalation and surge boons."
  }
];

export function TypePicker() {
  const {
    state: {
      editor: { selectedType }
    },
    dispatch
  } = useAsset();

  return (
    <section aria-labelledby="type-picker-heading" className="space-y-3">
      <div>
        <h2 id="type-picker-heading" className="text-sm font-semibold uppercase text-slate-200">
          1. Choose Asset Type
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Assets share a cohesive Ashen brand but expose type-specific fields.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {typeOptions.map((option) => {
          const isActive = option.value === selectedType;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                dispatch({ type: "setType", payload: { type: option.value } })
              }
              aria-pressed={isActive}
              className={`rounded-xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                isActive
                  ? "border-amber-500/80 bg-amber-500/10 text-amber-100 shadow-[0_0_0_1px_rgba(240,171,0,0.25)]"
                  : "border-slate-800 bg-slate-950/60 text-slate-200 hover:border-amber-500/50 hover:bg-slate-900"
              }`}
            >
              <span className="block text-xs font-semibold uppercase tracking-wide">
                {option.label}
              </span>
              <span className="mt-2 block text-[11px] text-slate-400">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
