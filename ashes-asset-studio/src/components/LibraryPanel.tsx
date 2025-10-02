import { formatRelative } from "date-fns";
import { useAsset } from "../context/useAsset";
import { AssetRecord } from "../context/types";

export function LibraryPanel() {
  const {
    state: {
      library: { records, selectedId }
    },
    dispatch
  } = useAsset();

  const handleSelect = (record: AssetRecord) => {
    dispatch({ type: "selectRecord", payload: { id: record.id } });
  };

  return (
    <aside className="flex h-full flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <header className="space-y-1">
        <h2 className="text-sm font-semibold uppercase text-slate-200">Library</h2>
        <p className="text-xs text-slate-400">Saved assets persist locally via browser storage.</p>
      </header>
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {records.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-700 bg-slate-950/40 p-4 text-xs text-slate-400">
            Save your first asset to seed the Ash archives.
          </p>
        ) : (
          records.map((record) => {
            const isActive = record.id === selectedId;
            let relativeTime = "just now";
            try {
              relativeTime = formatRelative(new Date(record.updatedAt), new Date());
            } catch (error) {
              console.warn("Failed to format timestamp", error);
            }
            return (
              <button
                key={record.id}
                type="button"
                onClick={() => handleSelect(record)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? "border-amber-500/70 bg-amber-500/10 text-amber-100"
                    : "border-slate-800 bg-slate-950/60 text-slate-200 hover:border-amber-400/60 hover:text-amber-100"
                }`}
              >
                <span className="block text-xs font-semibold uppercase tracking-wide">
                  {record.data && typeof record.data === "object" && "name" in record.data
                    ? String((record.data as { name?: string }).name ?? record.id)
                    : record.id}
                </span>
                <span className="mt-1 block text-[11px] text-slate-400">
                  {record.type} · Saved {relativeTime}
                </span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
