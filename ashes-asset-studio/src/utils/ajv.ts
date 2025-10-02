import Ajv from "ajv";
import addFormats from "ajv-formats";
import { AllSchemas } from "../schemas";
import type { ErrorObject } from "ajv";

export const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
addFormats(ajv);
AllSchemas.forEach(s => ajv.addSchema(s));

export type ValidationError = { path: string; message: string };
type AjvError = ErrorObject<string, Record<string, unknown>, unknown>;

export function toFriendlyErrors(errors: readonly AjvError[] | null | undefined): ValidationError[] {
  if (!errors) return [];
  return errors.map(e => ({ path: e.instancePath || "/", message: e.message || "Invalid" }));
}
