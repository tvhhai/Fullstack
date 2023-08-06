/**
 * Checks if an array is empty.
 * @param arr - The array to check.
 * @returns True if the array is empty, false otherwise.
 */
export function isEmptyArray(arr: any[]): boolean {
    return !Array.isArray(arr) || arr.length===0;
}

/**
 * Checks if a value is an object.
 * @param obj - The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObject(obj: any): boolean {
    return typeof obj==="object" && !Array.isArray(obj);
}

/**
 * Checks if an object is empty.
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export function isEmptyObj(obj: any): boolean {
    if (Array.isArray(obj)) {
        return obj.length===0;
    }
    if (typeof obj==="object" && obj!==null) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Returns the keys of an object.
 * @param obj - The object from which to retrieve the keys.
 * @returns An array of keys.
 */
export function getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
}

/**
 * Filters an object by the specified keys.
 * @param obj - The object to filter.
 * @param keysToKeep - The keys to keep in the filtered object.
 * @returns The filtered object.
 */
export function filterObjectByKeys(obj: Record<string, any>, keysToKeep: string[]): object {
    const objKeys = Object.keys(obj);
    const filteredKeys = objKeys.filter((key) => keysToKeep.includes(key));
    return Object.fromEntries(filteredKeys.map((key) => [key, obj[key]]));
}

/**
 * Returns the first data object from the given object.
 * @param obj - The object from which to retrieve the first data object.
 * @returns The first data object.
 */
export function getFirstDataObj(obj: Record<string, any>): object {
    const keys = getObjectKeys(obj);
    return obj[keys[0]];
}

/**
 * Returns the last data object from the given object.
 * @param obj - The object from which to retrieve the last data object.
 * @returns The last data object.
 */
export function getLastDataObj(obj: Record<string, any>): object {
    const keys = getObjectKeys(obj);
    const lastIndex = keys.length - 1;
    return obj[keys[lastIndex]];
}


