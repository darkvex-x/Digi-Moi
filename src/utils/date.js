/**
 * Date Utils
 */

/**
 * Formats date into readable string (e.g. 1 Jul 2026).
 * @param {string|Date} dateString
 * @returns {string}
 */
export function formatDate(dateString, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!dateString) return '';
  const parts = String(dateString).split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day).toLocaleDateString('en-IN', options);
  }
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

/**
 * Formats date and time into readable string (e.g. 1 Jul 2026, 10:30 AM).
 * @param {string|Date} dateTimeString
 * @returns {string}
 */
export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return '';
  return new Date(dateTimeString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get current ISO YYYY-MM-DD date representation.
 * @returns {string}
 */
export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}
