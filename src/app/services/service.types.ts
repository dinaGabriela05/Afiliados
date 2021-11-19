// Return type of a Service
type ServiceRes<T> = (Partial<T> | null) | Promise<Partial<T> | null>;
// Service Type
export type Service<T extends object> = (
  req: Request,
  ...args: any[]
) => ServiceRes<T>;
