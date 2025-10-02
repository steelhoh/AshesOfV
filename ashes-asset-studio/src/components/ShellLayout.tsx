import { type ReactNode } from "react";

export function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/70">Ashes of Verdun</p>
            <h1 className="font-display text-xl uppercase tracking-[0.3em] text-amber-100">
              Asset Studio
            </h1>
          </div>
          <span className="text-xs text-slate-500">Craft, validate, and archive every card asset.</span>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">{children}</main>
    </div>
  );
}
