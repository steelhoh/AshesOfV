import { createRecord, useAssetContext } from "../context/AssetContext";

export function ActionBar() {
  const {
    state: {
      editor: { selectedType, draft, isValid }
    },
    dispatch
  } = useAssetContext();

  const canSave = Boolean(selectedType && isValid && draft);

  const handleSave = () => {
    if (!selectedType || !draft) return;
    const record = createRecord(selectedType, draft);
    dispatch({ type: "addRecord", payload: { record } });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          Save to Library
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "reset" })}
          className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-amber-100"
        >
          Reset
        </button>
      </div>
      <p className="text-xs text-slate-400">
        Saving locks validation for preview; edit again by selecting the asset from the library.
      </p>
    </div>
  );
}
