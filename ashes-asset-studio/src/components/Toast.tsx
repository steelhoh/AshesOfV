import React from "react";
export function Toast({ text }:{ text:string }){
  return <div role="status" className="fixed bottom-4 right-4 bg-black/80 border border-brand.frame rounded px-3 py-2">{text}</div>;
}
