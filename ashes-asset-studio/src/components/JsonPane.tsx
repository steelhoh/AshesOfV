import { useEffect } from "react";
import { useAsset } from "../context/useAsset";
import { validateAsset } from "../utils/ajv";

export function JsonPane() {
  const {
    state: {
      editor: { selectedType, jsonDraft }
    },
    dispatch
  } = useAsset();

  useEffect(() => {
    if (!selectedType) {
      dispatch({ type: "setValidation", payload: { valid: false, issues: [] } });
      return;
    }

    if (!jsonDraft.trim()) {
      dispatch({ type: "setValidation", payload: { valid: false, issues: [] } });
      return;
    }

    try {
      const parsed = JSON.parse(jsonDraft);
      const validation = validateAsset(selectedType, parsed);
      dispatch({ type: "setValidation", payload: validation });
      if (validation.valid) {
        dispatch({ type: "setDraft", payload: { draft: parsed } });
      }
    } catch (error) {
      dispatch({
        type: "setValidation",
        payload: {
          valid: false,
          issues: [
            {
              field: "json",
              message: error instanceof Error ? error.message : "Invalid JSON"
            }
          ]
        }
      });
    }
  }, [jsonDraft, selectedType, dispatch]);

  return (
    <section aria-labelledby="json-pane-heading" className="space-y-2">
      <div>
        <h2 id="json-pane-heading" className="text-sm font-semibold uppercase text-slate-200">
          3. Paste Asset JSON
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Schema validation runs automatically—no manual submit button required.
        </p>
      </div>
      <textarea
        value={jsonDraft}
        onChange={(event) => dispatch({ type: "setJsonDraft", payload: { value: event.target.value } })}
        className="h-72 w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 font-mono text-xs text-amber-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        placeholder="{\n  \"id\": \"...\",\n  \"name\": \"...\"\n}"
        spellCheck={false}
      />
    </section>
  );
}
