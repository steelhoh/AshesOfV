export type AssetType =
  | "monsterStat"
  | "monsterAbility"
  | "heroAbility"
  | "equipment"
  | "consumable"
  | "burden"
  | "ash";

export interface MonsterStatScalingRow {
  hp: number;
  dmg: number;
  spd: number;
}

export interface MonsterStatScalingBlock {
  lv1?: MonsterStatScalingRow;
  lv2?: MonsterStatScalingRow;
  lv3?: MonsterStatScalingRow;
}

export interface MonsterStatCard {
  id: string;
  name: string;
  rarityTag: "common" | "elite" | "boss" | "legendary";
  category: "undead" | "aberration" | "wretched" | "eldritch" | "feral" | "construct";
  type: "minion" | "elite" | "boss";
  hp: number;
  dmg: number;
  spd: number;
  traits: string[];
  xp: number;
  gold: number;
  threatValue: number;
  lootValue: number;
  portraitUrl?: string | null;
  scaling?: {
    normal?: MonsterStatScalingBlock;
    elite?: MonsterStatScalingBlock;
  };
}
