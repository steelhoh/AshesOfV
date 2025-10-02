import React from "react";
import { ajv, toFriendlyErrors } from "../utils/ajv";

export function JsonPane({ schemaId, initial, onValid }:{ schemaId: string; initial?: object; onValid:(value:any)=>void }){
  const [text,setText]=React.useState<string>(()=> JSON.stringify(initial ?? {}, null, 2));
  const [errors,setErrors]=React.useState<string[]>([]);

  const validate = React.useCallback(()=>{
    try{
      const val = JSON.parse(text);
      const v = ajv.getSchema(schemaId);
      if(!v) throw new Error(`Schema not found: ${schemaId}`);
      const ok = v(val);
      if(!ok){ setErrors(toFriendlyErrors(v.errors).map(e=>`${e.path}: ${e.message}`)); return; }
      setErrors([]); onValid(val);
    }catch(e:any){ setErrors([e.message]); }
  },[text,schemaId,onValid]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <textarea className="min-h-[320px] font-mono text-sm p-3 bg-black/40 brand-frame rounded-brand" value={text} onChange={e=>setText(e.target.value)} aria-label="JSON editor"/>
      <div>
        <button className="px-3 py-2 bg-brand.red/60 rounded mb-2" onClick={validate}>Validate JSON</button>
        {errors.length>0 ? (
          <ul className="text-red-300 text-sm list-disc pl-5 whitespace-pre-wrap">{errors.map((e,i)=>(<li key={i}>{e}</li>))}</ul>
        ):<div className="text-green-300">Valid ✓</div>}
      </div>
    </div>
  );
}
