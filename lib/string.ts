export const isString = (value: any) => typeof value === "string" || value instanceof String;

export function isValidUrl(url: string): boolean {
  try {
    new URL(url); // If the URL constructor succeeds, it's a valid URL
    return true;
  } catch (error) {
    return false; // If an error is thrown, it's not a valid URL
  }
}
