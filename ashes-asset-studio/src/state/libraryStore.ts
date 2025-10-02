import { create } from "zustand";

export type AssetType = "MonsterStatCard"|"MonsterAbilityCard"|"HeroAbilityCard"|"ItemEquipmentCard"|"ConsumableCard"|"BurdenResolutionCard"|"AshCard";
export type LibraryAsset = { id: string; type: AssetType; name: string; payload: unknown; updatedAt: string };

type State = {
  assets: LibraryAsset[];
  upsert: (a: LibraryAsset) => void;
  remove: (id: string) => void;
  importMany: (list: LibraryAsset[]) => void;
}

const key = "aov_asset_library_v1";
const load = (): LibraryAsset[] => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const save = (assets: LibraryAsset[]) => localStorage.setItem(key, JSON.stringify(assets));

export const useLibrary = create<State>((set, get) => ({
  assets: load(),
  upsert: (a) => set(s => { const idx = s.assets.findIndex(x => x.id === a.id); const next = [...s.assets]; if (idx>=0) next[idx]=a; else next.unshift(a); save(next); return { assets: next }; }),
  remove: (id) => set(s => { const next = s.assets.filter(x => x.id !== id); save(next); return { assets: next }; }),
  importMany: (list) => set(s => { const map = new Map(s.assets.map(a=>[a.id,a] as const)); list.forEach(a=>map.set(a.id,a)); const next=[...map.values()].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)); save(next); return { assets: next }; })
}));
