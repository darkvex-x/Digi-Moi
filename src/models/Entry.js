/**
 * @typedef {Object} EntryProps
 * @property {string} id - Unique contribution identifier, formatted as `ent_uuid`.
 * @property {string} eventId - Foreign key reference to the parent Event ID (`evt_uuid`).
 * @property {string} receiptNumber - Serial counter sequential receipt number (e.g., "001", "002").
 * @property {string} name - Name of the guest contributing Moi.
 * @property {number} amount - Gift amount contributed (must be greater than 0).
 * @property {("Cash"|"UPI"|"Card"|"Cheque"|"Bank Transfer")} paymentMethod - The transaction medium used.
 * @property {string} date - Display date on receipt in YYYY-MM-DD format.
 * @property {string} time - Display time on receipt in HH:MM:SS format.
 * @property {string} createdAt - Precise ISO 8601 creation timestamp.
 */

export class Entry {
  /**
   * Constructs and instantiates a normalized Entry contribution object.
   * @param {Partial<EntryProps>} data
   */
  constructor(data = {}) {
    this.id = data.id || '';
    this.eventId = data.eventId || '';
    this.receiptNumber = data.receiptNumber || '';
    this.name = data.name || '';
    this.amount = Number(data.amount || 0);
    this.paymentMethod = data.paymentMethod || 'Cash';
    this.date = data.date || new Date().toISOString().split('T')[0];
    this.time = data.time || new Date().toLocaleTimeString('en-US', { hour12: false });
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  /**
   * Validates if a contribution conforms to the required data constraints.
   * @param {EntryProps} obj
   * @returns {boolean}
   */
  static isValid(obj) {
    return !!(
      obj &&
      typeof obj.eventId === 'string' &&
      obj.eventId.length > 0 &&
      typeof obj.name === 'string' &&
      obj.name.trim().length > 0 &&
      typeof obj.amount === 'number' &&
      obj.amount > 0
    );
  }
}
