import React from "react";
import { ajv, toFriendlyErrors } from "../utils/ajv";
import { isoNow, newId } from "../utils/id";

type MonsterForm = {
  id: string; name: string; type: "minion"|"elite"|"boss";
  hp: number; dmg: number; spd: number; traits: string[];
  xp: number; gold: number; threatValue: number; lootValue: number;
  portraitUrl?: string; updatedAt: string;
};

const defaults: MonsterForm = {
  id: "", name: "", type: "minion", hp: 1, dmg: 1, spd: 1, traits: [], xp: 0, gold: 0, threatValue: 0, lootValue: 0, portraitUrl: "", updatedAt: ""
};

export function MonsterFormView({ onValid }:{ onValid:(val: MonsterForm)=>void }){
  const [data,setData]=React.useState<MonsterForm>({...defaults, id: newId('mon'), updatedAt: isoNow()});
  const [errors,setErrors]=React.useState<string[]>([]);

  const change = (k: keyof MonsterForm, v: any) => setData(d=>({...d,[k]:v}));

  const validate = ()=>{
    const v = ajv.getSchema("MonsterStatCard");
    if(!v) return;
    const ok = v(data as any);
    if(!ok) setErrors(toFriendlyErrors(v.errors).map(e=>`${e.path}: ${e.message}`));
    else { setErrors([]); onValid(data); }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <label className="flex flex-col text-sm">Name<input value={data.name} onChange={e=>change('name', e.target.value)} className="px-2 py-1 bg-black/40 brand-frame rounded"/></label>
        <label className="flex flex-col text-sm">Type<select value={data.type} onChange={e=>change('type', e.target.value as any)} className="px-2 py-1 bg-black/40 brand-frame rounded"><option>minion</option><option>elite</option><option>boss</option></select></label>
        <label className="flex flex-col text-sm">Portrait URL<input value={data.portraitUrl} onChange={e=>change('portraitUrl', e.target.value)} className="px-2 py-1 bg-black/40 brand-frame rounded"/></label>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {([['hp','HP'],['dmg','DMG'],['spd','SPD']] as const).map(([k,label])=> (
          <label key={k} className="flex flex-col text-sm">{label}
            <input type="number" min={0} value={data[k]} onChange={e=>change(k as any, Number(e.target.value))} className="px-2 py-1 bg-black/40 brand-frame rounded"/>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {([['xp','XP'],['gold','Gold'],['threatValue','Threat'],['lootValue','Loot Val']] as const).map(([k,label])=> (
          <label key={k} className="flex flex-col text-sm">{label}
            <input type="number" min={0} value={data[k as keyof MonsterForm] as number} onChange={e=>change(k as any, Number(e.target.value))} className="px-2 py-1 bg-black/40 brand-frame rounded"/>
          </label>
        ))}
      </div>
      <label className="flex flex-col text-sm">Traits (comma separated)
        <input value={(data.traits||[]).join(', ')} onChange={e=>change('traits', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} className="px-2 py-1 bg-black/40 brand-frame rounded"/>
      </label>

      <div className="flex items-center gap-2">
        <button className="px-3 py-2 bg-brand.gold/30 rounded" onClick={validate}>Validate</button>
        {errors.length? <ul className="text-red-300 text-xs list-disc pl-5">{errors.map((e,i)=>(<li key={i}>{e}</li>))}</ul>:<span className="text-green-300">Ready ✓</span>}
      </div>
    </div>
  );
}
