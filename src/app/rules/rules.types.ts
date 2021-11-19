// Common types for rules
export interface Rule {
  name: string;
  rule?: (
    value: any,
    requirement: any,
    attribute: any,
    passes?: any
  ) => boolean;
  asyncRule?: (
    value: any,
    requirement: any,
    attribute: any,
    passes?: any
  ) => Promise<void>;
  message: string;
}
