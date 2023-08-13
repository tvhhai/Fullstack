export function isObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj);
}

export function isDefined(value: any): boolean {
  return typeof value !== undefined;
}