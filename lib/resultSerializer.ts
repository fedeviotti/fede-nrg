export function resultSerializer<T>(result: T) {
  return JSON.parse(JSON.stringify(result));
}
