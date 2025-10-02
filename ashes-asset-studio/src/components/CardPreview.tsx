import React from "react";
import type { LibraryAsset } from "../state/libraryStore";

export function CardPreview({ asset }:{ asset: LibraryAsset | null }){
  if(!asset) return <div className="text-sm opacity-70">Select an asset to preview.</div>;
  const p = asset.payload as any;
  return (
    <div className="brand-skin brand-frame rounded-brand p-4">
      <div className="text-center text-2xl text-brand-red font-bold mb-2">{asset.name}</div>
      <div className="text-xs opacity-70 text-center mb-4">{asset.type}</div>
      {asset.type==='MonsterStatCard' && (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded p-2">HP<br/><b>{p.hp}</b></div>
            <div className="bg-white/10 rounded p-2">DMG<br/><b>{p.dmg}</b></div>
            <div className="bg-white/10 rounded p-2">SPD<br/><b>{p.spd}</b></div>
          </div>
          <div className="text-sm">Traits: {Array.isArray(p.traits)? p.traits.join(', '): ''}</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/10 rounded p-2">XP<br/><b>{p.xp}</b></div>
            <div className="bg-white/10 rounded p-2">Gold<br/><b>{p.gold}</b></div>
            <div className="bg-white/10 rounded p-2">Threat<br/><b>{p.threatValue}</b></div>
            <div className="bg-white/10 rounded p-2">LootVal<br/><b>{p.lootValue}</b></div>
          </div>
        </div>
      )}
      {/* Extend for other types in next pass */}
    </div>
  );
}
