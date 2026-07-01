/**
 * @typedef {Object} EventProps
 * @property {string} id - Unique identifier, formatted as `evt_uuid`.
 * @property {string} eventName - Display name for the event ledger.
 * @property {string} [brideName] - Name of the bride (optional).
 * @property {string} [groomName] - Name of the groom (optional).
 * @property {string} [venue] - Venue location of the event (optional).
 * @property {string} functionDate - Logical date of the event in YYYY-MM-DD format.
 * @property {string} [notes] - Additional remarks or notes (optional).
 * @property {number} totalAmount - Denormalized running total amount collected (performance optimization).
 * @property {number} totalEntries - Denormalized running count of guest contributions.
 * @property {string} createdAt - ISO 8601 string creation timestamp.
 * @property {string} updatedAt - ISO 8601 string last modified timestamp.
 */

export class Event {
  /**
   * Constructs and instantiates a normalized Event object.
   * @param {Partial<EventProps>} data
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.eventName = data.eventName || '';
    this.brideName = data.brideName || '';
    this.groomName = data.groomName || '';
    this.venue = data.venue || '';
    this.functionDate = data.functionDate || new Date().toISOString().split('T')[0];
    this.notes = data.notes || '';
    this.totalAmount = Number(data.totalAmount || 0);
    this.totalEntries = Number(data.totalEntries || 0);
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  /**
   * Helper to check if a value matches expected Firestore / Local Storage Event constraints.
   * @param {EventProps} obj
   * @returns {boolean}
   */
  static isValid(obj) {
    return !!(obj && typeof obj.eventName === 'string' && obj.eventName.trim().length > 0);
  }
}
