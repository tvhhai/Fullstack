export function isEmptyArray(arr: any[]): boolean {
  return !Array.isArray(arr) || arr.length === 0;
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj);
}

export function isEmptyObj(obj: any): boolean {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
  }
  return true;
}

export function getObjectKeys(obj: object): string[] {
  return Object.keys(obj);
}

export function filterObjectByKeys(
  obj: Record<string, any>,
  keysToKeep: string[]
): object {
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => keysToKeep.includes(key));
  return Object.fromEntries(filteredKeys.map((key) => [key, obj[key]]));
}
