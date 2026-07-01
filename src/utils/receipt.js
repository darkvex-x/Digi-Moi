/**
 * Receipt Formatting Utils
 */

/**
 * Prepends prefix formatting to sequential receipt counters (e.g. Moi-001).
 * @param {string|number} number
 * @param {string} prefix
 * @returns {string}
 */
export function formatReceiptNumber(number, prefix = 'MR-') {
  if (!number) return '';
  return `${prefix}${number}`;
}
