import React from "react";
import { Stepper } from "./components/Stepper";
import { TypePicker } from "./components/TypePicker";
import { ModeSwitcher, type Mode } from "./components/ModeSwitcher";
import { MonsterFormView } from "./components/DynamicForm";
import { JsonPane } from "./components/JsonPane";
import { useLibrary, type LibraryAsset } from "./state/libraryStore";
import { CardPreview } from "./components/CardPreview";
import { Toast } from "./components/Toast";
import { ajv } from "./utils/ajv";
import { isoNow } from "./utils/id";
import { LibraryPanel } from "./components/LibraryPanel";

export default function App(){
  const [step,setStep]=React.useState(0);
  const [type,setType]=React.useState<string| null>(null);
  const [mode,setMode]=React.useState<Mode>("form");
  const [validPayload,setValidPayload]=React.useState<any>(null);
  const [preview,setPreview]=React.useState<LibraryAsset|null>(null);
  const [toast,setToast]=React.useState<string| null>(null);
  const { upsert } = useLibrary();

  const start = (t: string)=>{ setType(t); setStep(1); setValidPayload(null); };

  const onValid = (payload:any)=>{ setValidPayload(payload); setStep(3); };

  const save = ()=>{
    if(!type || !validPayload) return;
    const schema = ajv.getSchema(type);
    if(!schema) return;
    const ok = schema(validPayload);
    if(!ok){ setToast("Validation failed before save"); return; }
    const asset: LibraryAsset = { id: validPayload.id, type: type as any, name: validPayload.name || validPayload.abilityName || validPayload.monsterName || validPayload.id, payload: { ...validPayload, updatedAt: isoNow() }, updatedAt: isoNow() };
    upsert(asset); setPreview(asset); setToast("Saved to library ✓"); setStep(5);
    setTimeout(()=>setToast(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-brand-red text-center">Ashes of Verdun – Asset Studio</h1>
      <Stepper step={step} />

      {step===0 && (<TypePicker value={type as any} onChange={t=>start(t)} />)}

      {step>=1 && type && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm">Type: <b>{type}</b></div>
            <ModeSwitcher value={mode} onChange={m=>{ setMode(m); setStep(2); }} />
          </div>

          {mode==='form' && type==='MonsterStatCard' && (
            <MonsterFormView onValid={onValid} />
          )}

          {mode==='json' && (
            <JsonPane schemaId={type} onValid={onValid} />
          )}

          <div className="flex gap-2">
            <button className="px-3 py-2 bg-brand.gold/30 rounded disabled:opacity-50" disabled={!validPayload} onClick={()=>{ setStep(4); save(); }}>Save</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h2 className="text-lg">Library</h2>
              <LibraryPanel onOpen={(a)=>{ setPreview(a); setStep(5);} } />
            </div>
            <div>
              <h2 className="text-lg">Preview</h2>
              <CardPreview asset={preview} />
            </div>
          </div>
        </div>
      )}

      {toast && <Toast text={toast} />}
    </div>
  );
}
