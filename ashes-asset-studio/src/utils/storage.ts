import { AssetRecord } from "../context/types";

const STORAGE_KEY = "ashes-of-verdun-asset-library";

export function loadLibrary(): AssetRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as AssetRecord[];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to parse library", error);
    return [];
  }
}

export function persistLibrary(records: AssetRecord[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error("Failed to persist library", error);
  }
}
