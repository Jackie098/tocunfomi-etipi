export enum TeamType {
  DEV = "DESENVOLVIMENTO",
  DESIGN = "DESIGN",
  REQUIREMENT = "REQUISITOS",
}

export type Team = {
  id: string;
  description: TeamType;
  created_at: Date;
  updated_at: Date;
};
