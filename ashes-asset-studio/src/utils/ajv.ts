import Ajv from "ajv";
import addFormats from "ajv-formats";
import { schemaMap } from "../schemas";
import { AssetType } from "../schemas/types";

const ajv = new Ajv({
  allErrors: true,
  strict: true,
  removeAdditional: false,
  messages: true
});

addFormats(ajv);

export const validators: Record<AssetType, ReturnType<typeof ajv.compile>> =
  Object.entries(schemaMap).reduce((acc, [key, schema]) => {
    acc[key as AssetType] = ajv.compile(schema);
    return acc;
  }, {} as Record<AssetType, ReturnType<typeof ajv.compile>>);

export type ValidationResult = {
  valid: boolean;
  issues: { field: string; message: string }[];
};

export function validateAsset(type: AssetType, value: unknown): ValidationResult {
  const validator = validators[type];
  const valid = validator(value);
  if (valid) {
    return { valid: true, issues: [] };
  }

  const issues = (validator.errors ?? []).map((err) => ({
    field: err.instancePath ? err.instancePath.replace(/^\//, "") : err.params.missingProperty ?? "root",
    message: err.message ?? "Invalid"
  }));

  return { valid: false, issues };
}
