export interface ContentType {
  companyMission: { [key: string]: string };
  companyTechStack_same: { [key: string]: string };
  companyTechStack_other: { [key: string]: string };
  staticParts: {
    base: string;
    base_long: string;
    join_company: string;
    experience: string;
    tech_experience: string;
    tech_objectives: string;
    personal_traits: string;
    closing: string;
    signature: string;
  };
}
