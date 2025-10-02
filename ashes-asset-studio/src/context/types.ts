import { JSONSchemaType } from "ajv";
import { AssetType } from "../schemas/types";

export type EditorMode = "form" | "json";

export interface ValidationIssue {
  field: string;
  message: string;
}

export type AssetDataMap = Record<AssetType, unknown>;

export interface AssetRecord<T extends AssetType = AssetType> {
  id: string;
  type: T;
  data: AssetDataMap[T];
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  step: 0 | 1 | 2 | 3 | 4;
  selectedType: AssetType | null;
  mode: EditorMode;
  draft: Record<string, unknown> | null;
  jsonDraft: string;
  validationErrors: ValidationIssue[];
  isValid: boolean;
}

export interface LibraryState {
  records: AssetRecord[];
  filters: {
    search: string;
    types: AssetType[];
    sort: "updatedDesc" | "updatedAsc" | "nameAsc" | "nameDesc";
  };
  selectedId: string | null;
}

export type AssetAction =
  | { type: "setType"; payload: { type: AssetType } }
  | { type: "setMode"; payload: { mode: EditorMode } }
  | { type: "setStep"; payload: { step: EditorState["step"] } }
  | {
      type: "updateDraft";
      payload: { name: string; value: unknown };
    }
  | { type: "setDraft"; payload: { draft: Record<string, unknown> | null } }
  | { type: "setJsonDraft"; payload: { value: string } }
  | {
      type: "setValidation";
      payload: { issues: ValidationIssue[]; valid: boolean };
    }
  | { type: "reset" }
  | { type: "addRecord"; payload: { record: AssetRecord } }
  | { type: "selectRecord"; payload: { id: string | null } };

export interface SchemaEntry<T = unknown> {
  id: string;
  title: string;
  schema: JSONSchemaType<T> | Record<string, unknown>;
}
