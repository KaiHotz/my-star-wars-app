/**
 * we read variable only once to avoid perf issues. It could be changed if we need to change variables in runtime
 */
const documentStyles = window.getComputedStyle(document.documentElement);
export const getCSSVariable = (variable: string): string => {
  return documentStyles.getPropertyValue(variable)?.trim() || '';
};
