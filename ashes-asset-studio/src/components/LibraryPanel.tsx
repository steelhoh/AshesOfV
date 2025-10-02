import React from "react";
import { useLibrary, type LibraryAsset } from "../state/libraryStore";

export function LibraryPanel({ onOpen }:{ onOpen:(a:LibraryAsset)=>void }){
  const { assets, remove } = useLibrary();
  const [q,setQ]=React.useState("");
  const [type,setType]=React.useState<string>("all");

  const view = assets.filter(a=> (type==='all' || a.type===type) && a.name.toLowerCase().includes(q.toLowerCase()));

  const exportAll = ()=>{
    const blob = new Blob([JSON.stringify(assets,null,2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='aov_asset_library.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const importFile = (f: File)=>{
    const r = new FileReader();
    r.onload = ()=>{ try{ const list = JSON.parse(String(r.result)); if(Array.isArray(list)) { useLibrary.getState().importMany(list); } }catch{} };
    r.readAsText(f);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <input placeholder="Search by name" value={q} onChange={e=>setQ(e.target.value)} className="px-2 py-1 bg-black/40 brand-frame rounded"/>
        <select value={type} onChange={e=>setType(e.target.value)} className="px-2 py-1 bg-black/40 brand-frame rounded">
          <option value="all">All Types</option>
          {['MonsterStatCard','MonsterAbilityCard','HeroAbilityCard','ItemEquipmentCard','ConsumableCard','BurdenResolutionCard','AshCard'].map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="px-3 py-1 bg-brand.gold/30 rounded" onClick={exportAll}>Export</button>
        <label className="px-3 py-1 bg-white/10 rounded cursor-pointer">Import<input type="file" className="hidden" accept="application/json" onChange={e=>{ const f=e.target.files?.[0]; if(f) importFile(f); }}/></label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {view.map(a=> (
          <div key={a.id} className="brand-skin brand-frame rounded-brand p-3">
            <div className="text-brand-red font-semibold">{a.name}</div>
            <div className="text-xs opacity-70">{a.type} • {new Date(a.updatedAt).toLocaleString()}</div>
            <div className="mt-2 flex gap-2">
              <button className="px-2 py-1 bg-brand.gold/30 rounded" onClick={()=>onOpen(a)}>Open</button>
              <button className="px-2 py-1 bg-red-800/60 rounded" onClick={()=>remove(a.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
