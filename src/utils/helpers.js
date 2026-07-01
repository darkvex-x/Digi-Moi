/**
 * General Helper Utils
 */

/**
 * Standard UUID generator mimicking unique Firestore indexes.
 * @param {string} prefix
 * @returns {string}
 */
export function generateUUID(prefix) {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
}

/**
 * Debounce utility to optimize search keystrokes.
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
