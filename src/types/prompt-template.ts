export enum TemplateCategory {
  ALL = "All",
  PATIENTS = "patients",
  INTERVENTION = "interventions",
  COMPARATOR = "comparators",
  OUTCOMES = "outcomes",
  STUDY_DESIGN = "study design",
}

export interface PromptTemplate {
  id: number;
  title: string;
  description: string;
  prompt: string;
  type: `${TemplateCategory}`;
}
