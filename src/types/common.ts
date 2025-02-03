export interface SelectProp {
  label: string;
  value: string;
}

export interface FilterDataPayload {
  countries?: string[];
  agencies?: string[];
  drugs?: string[];
  biomarkers?: string[];
  modalities?: string[];
  diseases?: string[];
  final_recommendations?: string[];
}
