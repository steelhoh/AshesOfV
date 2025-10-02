import { useAsset } from "../context/useAsset";

export function ValidationPanel() {
  const {
    state: {
      editor: { validationErrors, isValid }
    }
  } = useAsset();

  if (validationErrors.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-xs text-slate-300">
        {isValid
          ? "Validation succeeded. Save to add this asset to the Ash library."
          : "Complete the form or paste JSON to begin validation."}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-rose-700/70 bg-rose-900/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-rose-200">
        Validation Issues
      </p>
      <ul className="mt-2 space-y-1 text-xs text-rose-100">
        {validationErrors.map((issue, index) => (
          <li key={`${issue.field}-${index}`}>
            <span className="font-semibold">{issue.field}:</span> {issue.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
