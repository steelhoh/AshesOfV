import { nanoid } from "nanoid";
export const newId = (prefix: string) => `${prefix}_${nanoid(8)}`;
export const isoNow = () => new Date().toISOString();
