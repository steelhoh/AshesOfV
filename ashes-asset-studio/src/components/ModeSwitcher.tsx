import React from "react";
export type Mode = "form" | "json";
export function ModeSwitcher({ value, onChange }: { value: Mode; onChange:(m:Mode)=>void }){
  return (
    <div className="inline-flex rounded overflow-hidden border border-brand.frame">
      {["form","json"].map(m => (
        <button key={m} className={`px-3 py-1 ${value===m? 'bg-brand.gold/30':'bg-white/10'}`} onClick={()=>onChange(m as Mode)} aria-pressed={value===m}>{m.toUpperCase()}</button>
      ))}
    </div>
  );
}
