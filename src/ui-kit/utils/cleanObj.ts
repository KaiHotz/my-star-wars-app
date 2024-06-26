/** This function removes the _falsy_ values from the object.
 *  Please note this would remove all boolean values that are false.
 */
export const cleanObj = (obj: Record<string, unknown>) =>
  Object.entries(obj).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {} as Record<string, unknown>);
