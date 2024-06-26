export const isEditableElement = (element?: Element | null): boolean => {
  if (!element) {
    return false;
  }

  return ['textarea', 'input', 'select'].includes(element.tagName.toLowerCase()) || Boolean((element as HTMLElement)?.isContentEditable);
};
