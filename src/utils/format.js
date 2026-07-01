/**
 * General Format Utils
 */

/**
 * Formats a raw number using Indian groupings (e.g. 1,00,000).
 * @param {number|string} num
 * @returns {string}
 */
export function formatNumber(num) {
  return Number(num || 0).toLocaleString('en-IN');
}

/**
 * Truncates string length and adds trailing ellipsis if over limit.
 * @param {string} text
 * @param {number} limit
 * @returns {string}
 */
export function truncateText(text, limit = 50) {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
}
