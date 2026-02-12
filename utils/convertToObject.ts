export function convertToSerializableObject<T>(leanDocument: T): T {
    return JSON.parse(JSON.stringify(leanDocument));
}