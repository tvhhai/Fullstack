export function isEmptyArray(arr: any[]): boolean {
    return !Array.isArray(arr) || arr.length === 0;
}