import { AssetType } from "../schemas/types";

type BaseField = {
  name: string;
  label: string;
  placeholder?: string;
  help?: string;
  transform?: (value: string) => unknown;
};

type TextField = BaseField & {
  input: "text" | "number" | "textarea";
};

type SelectField = BaseField & {
  input: "select";
  options: { label: string; value: string }[];
};

type FieldConfig = TextField | SelectField;

const monsterStatFields: FieldConfig[] = [
  {
    name: "name",
    label: "Monster Name",
    input: "text",
    placeholder: "Carrion Warpriest"
  },
  {
    name: "rarityTag",
    label: "Rarity",
    input: "select",
    options: [
      { label: "Common", value: "common" },
      { label: "Elite", value: "elite" },
      { label: "Boss", value: "boss" },
      { label: "Legendary", value: "legendary" }
    ]
  },
  {
    name: "category",
    label: "Category",
    input: "select",
    options: [
      { label: "Undead", value: "undead" },
      { label: "Aberration", value: "aberration" },
      { label: "Wretched", value: "wretched" },
      { label: "Eldritch", value: "eldritch" },
      { label: "Feral", value: "feral" },
      { label: "Construct", value: "construct" }
    ]
  },
  {
    name: "type",
    label: "Role",
    input: "select",
    options: [
      { label: "Minion", value: "minion" },
      { label: "Elite", value: "elite" },
      { label: "Boss", value: "boss" }
    ]
  },
  {
    name: "hp",
    label: "Health",
    input: "number",
    placeholder: "18"
  },
  {
    name: "dmg",
    label: "Damage",
    input: "number",
    placeholder: "6"
  },
  {
    name: "spd",
    label: "Speed",
    input: "number",
    placeholder: "3"
  },
  {
    name: "traits",
    label: "Traits",
    input: "textarea",
    placeholder: "Aura of Rot\nAsh-Touched",
    help: "One trait per line; converted into list values.",
    transform: (value: string) =>
      value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
  },
  {
    name: "xp",
    label: "XP",
    input: "number",
    placeholder: "2"
  },
  {
    name: "gold",
    label: "Gold",
    input: "number",
    placeholder: "8"
  },
  {
    name: "threatValue",
    label: "Threat Value",
    input: "number",
    placeholder: "3"
  },
  {
    name: "lootValue",
    label: "Loot Value",
    input: "number",
    placeholder: "2"
  }
];

export const fieldConfigMap: Partial<Record<AssetType, FieldConfig[]>> = {
  monsterStat: monsterStatFields
};

export type { FieldConfig };
