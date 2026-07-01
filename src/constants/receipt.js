/**
 * Receipt & Printing Constants
 */

export const PAPER_WIDTHS = {
  WIDTH_58MM: '58mm',
  WIDTH_80MM: '80mm',
};

export const DEFAULT_PAPER_WIDTH = PAPER_WIDTHS.WIDTH_58MM;

export const PAPER_OPTIONS = [
  PAPER_WIDTHS.WIDTH_58MM,
  PAPER_WIDTHS.WIDTH_80MM,
];

export const CURRENCY_OPTIONS = ['₹', '$', '€', '£', '¥'];

export const DEFAULT_CURRENCY = '₹';

export const DEFAULT_RECEIPT_PREFIX = 'Moi-';

export const CONSTRAINTS = {
  MAX_BUSINESS_NAME: 50,
  MAX_RECEIPT_PREFIX: 10,
  MAX_EVENT_NAME: 100,
  MAX_GUEST_NAME: 100,
  MAX_NOTES: 500,
};
