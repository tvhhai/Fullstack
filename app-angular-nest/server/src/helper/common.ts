export function isObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj);
}