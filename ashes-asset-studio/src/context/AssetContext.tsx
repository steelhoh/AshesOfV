import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode
} from "react";
import {
  AssetAction,
  AssetRecord,
  EditorState,
  LibraryState
} from "./types";
import { AssetType } from "../schemas/types";
import { loadLibrary, persistLibrary } from "../utils/storage";
import { validateAsset } from "../utils/ajv";
import { defaultMonsterStat } from "../data/defaultAssets";

const initialEditor: EditorState = {
  step: 0,
  selectedType: null,
  mode: "form",
  draft: null,
  jsonDraft: "",
  validationErrors: [],
  isValid: false
};

const initialLibrary: LibraryState = {
  records: [],
  filters: {
    search: "",
    types: [],
    sort: "updatedDesc"
  },
  selectedId: null
};

type State = {
  editor: EditorState;
  library: LibraryState;
};

const AssetContext = createContext<{
  state: State;
  dispatch: Dispatch<AssetAction>;
}>({
  state: { editor: initialEditor, library: initialLibrary },
  dispatch: () => {
    throw new Error("AssetContext used outside provider");
  }
});

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return template.replace(/[xy]/g, (char) => {
    const rand = (Math.random() * 16) | 0;
    const value = char === "x" ? rand : (rand & 0x3) | 0x8;
    return value.toString(16);
  });
}

function reducer(state: State, action: AssetAction): State {
  switch (action.type) {
    case "setType": {
      return {
        editor: {
          ...state.editor,
          selectedType: action.payload.type,
          step: 1,
          draft: { id: generateId() },
          jsonDraft: "",
          validationErrors: [],
          isValid: false
        },
        library: state.library
      };
    }
    case "setMode": {
      return {
        editor: {
          ...state.editor,
          mode: action.payload.mode,
          step: Math.max(state.editor.step, 2)
        },
        library: state.library
      };
    }
    case "setStep": {
      return {
        editor: { ...state.editor, step: action.payload.step },
        library: state.library
      };
    }
    case "updateDraft": {
      const baseDraft = state.editor.draft ?? { id: generateId() };
      const draft = {
        ...baseDraft,
        [action.payload.name]: action.payload.value
      };
      const type = state.editor.selectedType;
      let validation = { valid: false, issues: [] as { field: string; message: string }[] };
      if (type) {
        validation = validateAsset(type, draft);
      }
      return {
        editor: {
          ...state.editor,
          draft,
          validationErrors: validation.issues,
          isValid: validation.valid,
          step: Math.max(state.editor.step, 3)
        },
        library: state.library
      };
    }
    case "setDraft": {
      return {
        editor: { ...state.editor, draft: action.payload.draft },
        library: state.library
      };
    }
    case "setJsonDraft": {
      return {
        editor: { ...state.editor, jsonDraft: action.payload.value },
        library: state.library
      };
    }
    case "setValidation": {
      return {
        editor: {
          ...state.editor,
          validationErrors: action.payload.issues,
          isValid: action.payload.valid,
          step:
            action.payload.issues.length > 0 || action.payload.valid
              ? Math.max(state.editor.step, 3)
              : state.editor.step
        },
        library: state.library
      };
    }
    case "addRecord": {
      const records = [...state.library.records];
      const existingIndex = records.findIndex((r) => r.id === action.payload.record.id);
      if (existingIndex >= 0) {
        records[existingIndex] = action.payload.record;
      } else {
        records.unshift(action.payload.record);
      }
      return {
        editor: {
          ...state.editor,
          step: 4,
          draft: action.payload.record.data as Record<string, unknown>,
          isValid: true
        },
        library: {
          ...state.library,
          records
        }
      };
    }
    case "selectRecord": {
      const record = state.library.records.find((r) => r.id === action.payload.id);
      return {
        editor: {
          ...state.editor,
          selectedType: record?.type ?? null,
          draft: (record?.data as Record<string, unknown>) ?? null,
          step: record ? 3 : 0,
          validationErrors: [],
          isValid: Boolean(record)
        },
        library: { ...state.library, selectedId: action.payload.id }
      };
    }
    case "reset": {
      return {
        editor: initialEditor,
        library: state.library
      };
    }
    default:
      return state;
  }
}

export function AssetProvider({ children }: { children: ReactNode }) {
  const existingRecords = loadLibrary();
  const seedRecords =
    existingRecords.length === 0
      ? [createRecord("monsterStat", defaultMonsterStat)]
      : existingRecords;

  const [state, dispatch] = useReducer(reducer, {
    editor: initialEditor,
    library: { ...initialLibrary, records: seedRecords }
  });

  useEffect(() => {
    persistLibrary(state.library.records);
  }, [state.library.records]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}

export function useAssetContext() {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAssetContext must be used within AssetProvider");
  }
  return context;
}

export function createRecord(type: AssetType, data: Record<string, unknown>): AssetRecord {
  const now = new Date().toISOString();
  const normalizedData = JSON.parse(JSON.stringify(data));
  return {
    id: typeof data.id === "string" ? data.id : generateId(),
    type,
    data: normalizedData,
    createdAt: now,
    updatedAt: now
  };
}
