import { clsx } from "clsx";

const steps = ["Type", "Mode", "Fill / Paste", "Validate", "Preview"] as const;

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
      {steps.map((label, index) => {
        const stepIndex = index;
        const isActive = currentStep >= stepIndex;
        return (
          <li
            key={label}
            className={clsx(
              "flex items-center gap-2 rounded-full border px-3 py-1 transition",
              isActive
                ? "border-amber-500/60 bg-amber-500/10 text-amber-200"
                : "border-slate-700/60 bg-slate-900 text-slate-500"
            )}
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-slate-800 font-semibold text-[0.65rem] text-slate-200">
              {index + 1}
            </span>
            <span>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
