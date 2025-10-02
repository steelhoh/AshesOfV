import type { JSONSchemaType } from "ajv";

// 1) Monster Stat Card
export const MonsterStatSchema: JSONSchemaType<{
  id: string; name: string; type: "minion"|"elite"|"boss";
  hp: number; dmg: number; spd: number; traits: string[];
  xp: number; gold: number; threatValue: number; lootValue: number;
  scaling?: {
    normalLv1?: { hp:number; dmg:number; spd:number };
    normalLv2?: { hp:number; dmg:number; spd:number };
    normalLv3?: { hp:number; dmg:number; spd:number };
    eliteLv1?:  { hp:number; dmg:number; spd:number };
    eliteLv2?:  { hp:number; dmg:number; spd:number };
    eliteLv3?:  { hp:number; dmg:number; spd:number };
  };
  portraitUrl?: string;
  updatedAt: string;
}> = {
  $id: "MonsterStatCard",
  type: "object",
  additionalProperties: false,
  required: ["id","name","type","hp","dmg","spd","traits","xp","gold","threatValue","lootValue","updatedAt"],
  properties: {
    id: { type: "string", minLength: 1 },
    name: { type: "string", minLength: 1 },
    type: { type: "string", enum: ["minion","elite","boss"] },
    hp: { type: "integer", minimum: 0 },
    dmg: { type: "integer", minimum: 0 },
    spd: { type: "integer", minimum: 0 },
    traits: { type: "array", items: { type: "string", minLength: 1 }, minItems: 0 },
    xp: { type: "integer", minimum: 0 },
    gold: { type: "integer", minimum: 0 },
    threatValue: { type: "integer", minimum: 0 },
    lootValue: { type: "integer", minimum: 0 },
    scaling: {
      type: "object",
      nullable: true,
      additionalProperties: false,
      required: [],
      properties: {
        normalLv1: { type: "object", nullable:true, required:["hp","dmg","spd"], additionalProperties:false, properties:{ hp:{type:"integer",minimum:0}, dmg:{type:"integer",minimum:0}, spd:{type:"integer",minimum:0} } },
        normalLv2: { type: "object", nullable:true, required:["hp","dmg","spd"], additionalProperties:false, properties:{ hp:{type:"integer",minimum:0}, dmg:{type:"integer",minimum:0}, spd:{type:"integer",minimum:0} } },
        normalLv3: { type: "object", nullable:true, required:["hp","dmg","spd"], additionalProperties:false, properties:{ hp:{type:"integer",minimum:0}, dmg:{type:"integer",minimum:0}, spd:{type:"integer",minimum:0} } },
        eliteLv1:  { type: "object", nullable:true, required:["hp","dmg","spd"], additionalProperties:false, properties:{ hp:{type:"integer",minimum:0}, dmg:{type:"integer",minimum:0}, spd:{type:"integer",minimum:0} } },
        eliteLv2:  { type: "object", nullable:true, required:["hp","dmg","spd"], additionalProperties:false, properties:{ hp:{type:"integer",minimum:0}, dmg:{type:"integer",minimum:0}, spd:{type:"integer",minimum:0} } },
        eliteLv3:  { type: "object", nullable:true, required:["hp","dmg","spd"], additionalProperties:false, properties:{ hp:{type:"integer",minimum:0}, dmg:{type:"integer",minimum:0}, spd:{type:"integer",minimum:0} } },
      }
    },
    portraitUrl: { type: "string", nullable: true },
    updatedAt: { type: "string", minLength: 1 }
  },
  examples: [
    {
      id: "mon_grave_stalker",
      name: "Grave Stalker",
      type: "minion",
      hp: 6, dmg: 2, spd: 2,
      traits: ["Undead","Silent"],
      xp: 2, gold: 1, threatValue: 2, lootValue: 10,
      scaling: {
        normalLv1: { hp:6, dmg:2, spd:2 },
        normalLv2: { hp:8, dmg:2, spd:2 },
        normalLv3: { hp:10,dmg:3, spd:3 },
        eliteLv1:  { hp:12,dmg:3, spd:3 },
        eliteLv2:  { hp:14,dmg:3, spd:3 },
        eliteLv3:  { hp:16,dmg:4, spd:3 }
      },
      portraitUrl: "",
      updatedAt: "2025-09-30T10:00:00Z"
    }
  ]
};

// 2) Monster Ability Card
export const MonsterAbilitySchema = {
  $id: "MonsterAbilityCard",
  type: "object",
  additionalProperties: false,
  required: ["id","monsterName","initiative","attackName","actions","targets","flavor","updatedAt"],
  properties: {
    id: { type: "string" },
    monsterName: { type: "string", minLength: 1 },
    initiative: { type: "integer", minimum: 0, maximum: 10 },
    attackName: { type: "string", minLength: 1 },
    actions: { type: "array", minItems: 1, items: { type: "string", minLength: 1 } },
    targets: { type: "string", enum: ["nearest","highestBurden","lowestHP"] },
    ashSurge: { type: "string", nullable: true },
    flavor: { type: "string" },
    updatedAt: { type: "string" }
  },
  examples: [
    {
      id:"mab_grave_stalker_6",
      monsterName:"Grave Stalker",
      initiative:6,
      attackName:"Hamstring Swipe",
      actions:["Move 2 toward target","Deal 2 damage","Apply Staggered"],
      targets:"nearest",
      ashSurge:"Empowered: +1 damage if Ash ≥ 3",
      flavor:"You hear it before you see it.",
      updatedAt:"2025-09-30T10:00:00Z"
    }
  ]
} as const;

// 3) Hero Ability Card
export const HeroAbilitySchema = {
  $id: "HeroAbilityCard",
  type: "object",
  additionalProperties: false,
  required: ["id","class","abilityName","level","range","timing","type","skillActions","successOutcomes","updatedAt"],
  properties: {
    id: { type: "string" },
    class: { type: "string", minLength: 1 },
    abilityName: { type: "string", minLength: 1 },
    level: { type: "string", enum: ["Lv.1","Lv.2","Lv.3"] },
    range: { type: "string" },
    timing: { type: "string", enum: ["action","reaction","free","interrupt"] },
    type: { type: "string", enum: ["melee","ranged","aoe","support"] },
    skillActions: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 5 },
    successOutcomes: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 6 },
    critical: { type: "string", nullable: true },
    bonusOutcome: { type: "string", nullable: true },
    gigaFail: { type: "string", nullable: true },
    costs: { type: "array", nullable: true, items: { type: "string" }, maxItems: 4 },
    updatedAt: { type: "string" }
  },
  examples: [
    {
      id:"hab_warrior_cleave_l1",
      class:"Warrior",
      abilityName:"Cleave",
      level:"Lv.1",
      range:"adjacent",
      timing:"action",
      type:"melee",
      skillActions:["Swing your blade in an arc"],
      successOutcomes:["Deal 2 to two adjacent foes"],
      critical:"20 – +1 damage and apply Staggered",
      gigaFail:"1 – You are Staggered",
      costs:["+1 Burden"],
      updatedAt:"2025-09-30T10:00:00Z"
    }
  ]
} as const;

// 4) Item / Equipment Card
export const ItemSchema = {
  $id: "ItemEquipmentCard",
  type: "object",
  additionalProperties: false,
  required: ["id","slot","name","effects","rarity","updatedAt"],
  properties: {
    id: { type: "string" },
    slot: { type: "string", enum: ["weapon1H","offhand","weapon2H","armorBody","armorOther","talismanRelic"] },
    name: { type: "string" },
    effects: { type: "array", items: { type: "string" }, minItems: 1 },
    drawbacks: { type: "array", items: { type: "string" }, nullable: true },
    charges: { type: "integer", minimum: 0, nullable: true },
    rarity: { type: "string", enum: ["common","uncommon","rare","relic"] },
    notes: { type: "string", nullable: true },
    updatedAt: { type: "string" }
  },
  examples: [
    { id:"itm_iron_sabre", slot:"weapon1H", name:"Iron Sabre", effects:["+1 dmg"], rarity:"common", updatedAt:"2025-09-30T10:00:00Z" }
  ]
} as const;

// 5) Consumable Card
export const ConsumableSchema = {
  $id: "ConsumableCard",
  type: "object",
  additionalProperties: false,
  required: ["id","name","uses","effect","updatedAt"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    uses: { type: "integer", minimum: 1 },
    effect: { type: "string" },
    limitPerRound: { type: "integer", minimum: 1, nullable: true },
    afterEffect: { type: "string", nullable: true },
    updatedAt: { type: "string" }
  },
  examples: [
    { id:"con_grit_tonic", name:"Grit Tonic", uses:2, effect:"Remove Staggered or -1 Burden", updatedAt:"2025-09-30T10:00:00Z" }
  ]
} as const;

// 6) Burden Resolution Card
export const BurdenCardSchema = {
  $id: "BurdenResolutionCard",
  type: "object",
  additionalProperties: false,
  required: ["id","kind","name","effect","updatedAt"],
  properties: {
    id: { type: "string" },
    kind: { type: "string", enum: ["affliction","virtue"] },
    name: { type: "string" },
    effect: { type: "string" },
    partyRipple: { type: "string", nullable: true },
    roleplayLine: { type: "string", nullable: true },
    updatedAt: { type: "string" }
  },
  examples: [
    { id:"bur_heroism", kind:"virtue", name:"Heroism", effect:"Empowered: +1 dmg; also 1 dmg to adjacent allies on each hit.", partyRipple:"Allies gain +1 Burden on your crit.", updatedAt:"2025-09-30T10:00:00Z" }
  ]
} as const;

// 7) Ash Card (optional module)
export const AshCardSchema = {
  $id: "AshCard",
  type: "object",
  additionalProperties: false,
  required: ["id","tiers","updatedAt"],
  properties: {
    id: { type: "string" },
    tiers: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["threshold","boon","drawback"],
        additionalProperties: false,
        properties: {
          threshold: { type: "integer", enum: [1,3,5] },
          boon: { type: "string" },
          drawback: { type: "string" }
        }
      }
    },
    monsterSurge: { type: "string", nullable: true },
    updatedAt: { type: "string" }
  },
  examples: [
    { id:"ash_default", tiers:[{threshold:1,boon:"+1 to rolls",drawback:"-1 DEF"},{threshold:3,boon:"Empowered attacks",drawback:"+1 Burden on miss"},{threshold:5,boon:"Summon surge",drawback:"Boss +1 dmg"}], updatedAt:"2025-09-30T10:00:00Z" }
  ]
} as const;

export const AllSchemas = [
  MonsterStatSchema,
  MonsterAbilitySchema,
  HeroAbilitySchema,
  ItemSchema,
  ConsumableSchema,
  BurdenCardSchema,
  AshCardSchema
];
