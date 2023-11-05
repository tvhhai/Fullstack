import { isEqual, sortBy } from 'lodash';

/**
 * Checks if an array is empty.
 * @param arr - The array to check.
 * @returns True if the array is empty, false otherwise.
 */
export function isEmptyArray(arr: any[]): boolean {
  return !Array.isArray(arr) || arr.length === 0;
}

/**
 * Checks if a value is an object.
 * @param obj - The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj);
}

/**
 * Checks if an object is empty.
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export function isEmptyObj(obj: any): boolean {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
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
export function filterObjectByKeys(
  obj: Record<string, any>,
  keysToKeep: string[]
): object {
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter(key => keysToKeep.includes(key));
  return Object.fromEntries(filteredKeys.map(key => [key, obj[key]]));
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

/**
 * @description
 * Sort object in the array  by array keymap
 * If the array lengths are not equal, the residuals will be at the end of the array
 *
 * @example
 * Input:
 *      obj: [{key: 'c'}, {key: 'd'}, {key:'a'}, {key:'b'}]
 *      arrMap: [a,b,c]
 *      keySort: key
 * Output :
 *      obj: [{key:'a'}, {key:'b'}, {key:'c'}, {key:'d'} ]
 *
 * */
export const sortObjByObjMap = (
  obj: any,
  arrMap: object[],
  keySort: string
): object[] => {
  const NOT_FOUND_INDEX = -1;
  const MAX_VALUE = Number.MAX_VALUE;

  obj = [...obj];

  return obj.sort((a: { [x: string]: object }, b: { [x: string]: object }) => {
    const aIndex = arrMap.indexOf(a[keySort]);
    const bIndex = arrMap.indexOf(b[keySort]);
    return (
      (aIndex === -1 ? MAX_VALUE : aIndex) -
      (bIndex === NOT_FOUND_INDEX ? MAX_VALUE : bIndex)
    );
  });
};

/**
 * Deeply compares two objects and returns true if they are equal, false otherwise.
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns True if the objects are equal, false otherwise.
 */
export function deepCompareObj(obj1: any, obj2: any): boolean {
  // If either object is not an object, perform a strict equality check
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If the number of keys is not equal, the objects are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over the keys and recursively compare the values
  for (const key of keys1) {
    if (!deepCompareObj(obj1[key], obj2[key])) {
      return false;
    }
  }

  // If all keys and values are equal, the objects are equal
  return true;
}

/**
 * Checks if two arrays are equal regardless of the order of their elements.
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @param sortByKey - The key to sort the arrays before comparison.
 * @returns True if the arrays are equal, false otherwise.
 */
export function arraysEqualIgnoreOrder(
  arr1: any[],
  arr2: any[],
  sortByKey: string
): boolean {
  // Sort the arrays by the specified key
  const sortedArr1 = sortBy(arr1, [sortByKey]);
  const sortedArr2 = sortBy(arr2, [sortByKey]);

  // Check if the sorted arrays are equal
  return isEqual(sortedArr1, sortedArr2);
}

/**
 * Compares two objects by stringifying them and returns true if they are equal, false otherwise.
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns True if the objects are equal, false otherwise.
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
