import monsterStatSchema from "./monsterStat.schema.json";
import monsterAbilitySchema from "./monsterAbility.schema.json";
import heroAbilitySchema from "./heroAbility.schema.json";
import equipmentSchema from "./equipment.schema.json";
import consumableSchema from "./consumable.schema.json";
import burdenSchema from "./burden.schema.json";
import ashSchema from "./ash.schema.json";
import { AssetType } from "./types";

export const schemaMap = {
  monsterStat: monsterStatSchema,
  monsterAbility: monsterAbilitySchema,
  heroAbility: heroAbilitySchema,
  equipment: equipmentSchema,
  consumable: consumableSchema,
  burden: burdenSchema,
  ash: ashSchema
} satisfies Record<AssetType, unknown>;

export type SchemaKey = keyof typeof schemaMap;
