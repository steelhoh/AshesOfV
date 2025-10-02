import { ChangeEvent } from "react";
import { fieldConfigMap, type FieldConfig } from "../utils/formConfig";
import { useAsset } from "../context/useAsset";
import { AssetType } from "../schemas/types";

export function DynamicForm() {
  const {
    state: {
      editor: { selectedType, draft }
    },
    dispatch
  } = useAsset();

  if (!selectedType) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950/40 p-6 text-sm text-slate-400">
        Choose an asset type to reveal its tailored form.
      </div>
    );
  }

  const fields = fieldConfigMap[selectedType as AssetType] ?? [];

  if (fields.length === 0) {
    return (
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-6 text-sm text-amber-100">
        Form scaffolding for this asset type is under construction. Use JSON mode meanwhile.
      </div>
    );
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: FieldConfig
  ) => {
    const { value } = event.target;
    const parsedValue = field.input === "number" && value !== "" ? Number(value) : value;
    const finalValue = field.transform ? field.transform(String(parsedValue)) : parsedValue;
    dispatch({ type: "updateDraft", payload: { name: field.name, value: finalValue } });
  };

  return (
    <section aria-labelledby="dynamic-form-heading" className="space-y-3">
      <div>
        <h2 id="dynamic-form-heading" className="text-sm font-semibold uppercase text-slate-200">
          3. Complete Required Fields
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Validation fires as you type. Hover labels for contextual hints.
        </p>
      </div>
      <form className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => {
          let fieldValue = (draft ?? {})[field.name] ?? "";
          if (field.input === "textarea" && Array.isArray(fieldValue)) {
            fieldValue = fieldValue.join("\n");
          }
          if (field.input === "select") {
            return (
              <label key={field.name} className="flex flex-col gap-2 text-sm">
                <span className="text-xs font-semibold uppercase text-slate-300">{field.label}</span>
                <select
                  value={String(fieldValue)}
                  onChange={(event) => handleChange(event, field)}
                  className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {field.help && <span className="text-[11px] text-slate-500">{field.help}</span>}
              </label>
            );
          }

          const inputProps = {
            value: String(fieldValue),
            onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
              handleChange(event, field),
            placeholder: field.placeholder,
            className:
              "w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          } as const;

          if (field.input === "number") {
            return (
              <label key={field.name} className="flex flex-col gap-2 text-sm">
                <span className="text-xs font-semibold uppercase text-slate-300">{field.label}</span>
                <input type="number" {...inputProps} />
                {field.help && <span className="text-[11px] text-slate-500">{field.help}</span>}
              </label>
            );
          }

          if (field.input === "textarea") {
            return (
              <label key={field.name} className="flex flex-col gap-2 text-sm md:col-span-2">
                <span className="text-xs font-semibold uppercase text-slate-300">{field.label}</span>
                <textarea rows={3} {...inputProps} />
                {field.help && <span className="text-[11px] text-slate-500">{field.help}</span>}
              </label>
            );
          }

          return (
            <label key={field.name} className="flex flex-col gap-2 text-sm">
              <span className="text-xs font-semibold uppercase text-slate-300">{field.label}</span>
              <input type="text" {...inputProps} />
              {field.help && <span className="text-[11px] text-slate-500">{field.help}</span>}
            </label>
          );
        })}
      </form>
    </section>
  );
}
