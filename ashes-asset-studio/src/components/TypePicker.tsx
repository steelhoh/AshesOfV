import React from "react";
import type { AssetType } from "../state/libraryStore";

const TYPES: { id: AssetType; label: string; desc: string }[] = [
  { id:"MonsterStatCard", label:"Monster Stat Card", desc:"HP/DMG/SPD, traits, scaling" },
  { id:"MonsterAbilityCard", label:"Monster Ability Card", desc:"Initiative, actions, targets" },
  { id:"HeroAbilityCard", label:"Hero Ability Card", desc:"Class skills" },
  { id:"ItemEquipmentCard", label:"Item / Equipment", desc:"Slots, effects, rarity" },
  { id:"ConsumableCard", label:"Consumable", desc:"Uses & effects" },
  { id:"BurdenResolutionCard", label:"Burden Resolution", desc:"Afflictions & Virtues" },
  { id:"AshCard", label:"Ash (Optional)", desc:"Tiered boons/drawbacks" },
];

export function TypePicker({ value, onChange }: { value: AssetType | null; onChange: (v: AssetType)=>void }){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {TYPES.map(t=> (
        <button key={t.id} className={`brand-skin brand-frame rounded-brand p-3 text-left hover:scale-[1.01] transition ${value===t.id?'ring-2 ring-brand.gold':''}`} onClick={()=>onChange(t.id)}>
          <div className="text-lg text-brand-red font-semibold">{t.label}</div>
          <div className="text-xs opacity-80">{t.desc}</div>
        </button>
      ))}
    </div>
  );
}
