import React from "react";

export function Stepper({ step }: { step: number }){
  const labels = ["Type","Mode","Input","Validate","Save","Preview"];
  return (
    <div className="flex items-center gap-2 text-sm mb-4" aria-label="progress">
      {labels.map((l,i)=> (
        <div key={l} className={`px-2 py-1 rounded ${i<=step? 'bg-brand.red/40':'bg-white/10'}`}>{i+1}. {l}</div>
      ))}
    </div>
  );
}
