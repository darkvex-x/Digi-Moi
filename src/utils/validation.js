/**
 * Validation Utils
 */

/**
 * Validates Event Creation form parameters.
 * @param {Object} data
 * @returns {{ errors: Object, isValid: boolean }}
 */
export function validateEvent(data) {
  const errors = {};
  if (!data.eventName?.trim()) {
    errors.eventName = "Event Name is required";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}

/**
 * Validates Guest Entry form parameters.
 * @param {Object} data
 * @returns {{ errors: Object, isValid: boolean }}
 */
export function validateEntry(data) {
  const errors = {};
  if (!data.name?.trim()) {
    errors.name = "Name is required";
  }
  if (!data.amount || Number(data.amount) <= 0) {
    errors.amount = "Invalid amount";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
