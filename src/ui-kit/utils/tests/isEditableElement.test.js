import { describe, expect, it } from 'vitest';

import { isEditableElement } from '../isEditableElement';

describe('isEditableElement', () => {
  describe('when element is not defined', () => {
    it('should return false', () => {
      expect(isEditableElement()).toBeFalsy();
    });
  });
  describe('when element is null', () => {
    it('should return false', () => {
      expect(isEditableElement(null)).toBeFalsy();
    });
  });
  describe('when element is input', () => {
    it('should return true', () => {
      const input = document.createElement('input');
      expect(isEditableElement(input)).toBeTruthy();
    });
  });
  describe('when element is div', () => {
    it('should return false', () => {
      const div = document.createElement('div');
      expect(isEditableElement(div)).toBeFalsy();
    });
  });
  describe('when element with contenteditable=true', () => {
    it('should return true', () => {
      const div = document.createElement('div');
      div.isContentEditable = true;
      expect(isEditableElement(div)).toBeTruthy();
    });
  });
});
