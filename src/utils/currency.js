/**
 * Currency Utils
 */

/**
 * Formats a number with currency symbol and Indian grouping style.
 * @param {number|string} amount
 * @param {string} symbol
 * @returns {string}
 */
export function formatCurrency(amount, symbol = '₹') {
  const num = Number(amount || 0);
  return `${symbol} ${num.toLocaleString('en-IN')}`;
}
