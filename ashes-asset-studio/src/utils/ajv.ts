import Ajv from "ajv";
import addFormats from "ajv-formats";
import { AllSchemas } from "../schemas";
import type { ErrorObject } from "ajv";

export const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
addFormats(ajv);
AllSchemas.forEach(s => ajv.addSchema(s));

export type ValidationError = { path: string; message: string };
export function toFriendlyErrors(errors: ErrorObject[] | null | undefined): ValidationError[] {
  if (!errors) return [];
  return errors.map(e => ({ path: e.instancePath || "/", message: e.message || "Invalid" }));
}
