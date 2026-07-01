# Happy Pocket: Production Database Schema & Firestore Mapping

This document dictates the stringent database architecture for Happy Pocket. While Phase 1 relies on Local Storage, the models are meticulously designed as a **NoSQL Document Schema** completely primed for a drop-in replacement by **Firebase Firestore**.

---

## 1. Naming Conventions & Global Rules

* **Collection Names:** Plural, lowercase (e.g., `events`, `entries`, `settings`).
* **Document IDs:** Automatically generated UUIDs.
* **Property Names:** camelCase (e.g., `brideName`, `totalAmount`).
* **Timestamps:** Stored as ISO 8601 strings in Local Storage (e.g., `"2026-07-01T12:00:00Z"`). Upon Firebase migration, these will be converted to Firestore `Timestamp` objects.
* **Soft Deletes:** Records are strictly hard-deleted in early versions to optimize space, but architectural support for `isDeleted: boolean` is recommended for enterprise phase.

---

## 2. Entity Definitions & Constraints

### A. Collection: `settings`
*(In Firestore, this will be a single document at `/settings/global` or per-user `/users/{userId}/settings`)*

| Property | Type | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- |
| `businessName` | String | required, max 50 chars | Name printed on receipts. |
| `receiptPrefix` | String | max 10 chars, default "" | E.g., "Moi-" or "Rec-" |
| `currency` | String | required, default "₹" | Currency symbol used in UI. |
| `paperWidth` | String | enum: ["58mm", "80mm"] | Thermal printer dimensions. |
| `theme` | String | enum: ["light", "dark", "system"] | UI preference. |

### B. Collection: `events`
*(Path: `/events/{eventId}`)*

| Property | Type | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | required, unique, PK | UUID, formatted as `evt_uuid`. |
| `eventName` | String | required, max 100 chars | Display name for dashboard. |
| `brideName` | String | optional, max 50 chars | Kept optional for non-wedding events. |
| `groomName` | String | optional, max 50 chars | Kept optional for non-wedding events. |
| `venue` | String | optional, max 100 chars | Event location. |
| `functionDate` | String | YYYY-MM-DD | Logical date of the event. |
| `notes` | String | optional, max 500 chars | General remarks. |
| `totalAmount` | Number | `>= 0`, default `0` | Denormalized running total (for performance). |
| `totalEntries`| Number | `>= 0`, default `0` | Denormalized count of receipts. |
| `createdAt` | Date/String | required, immutable | Creation timestamp. |
| `updatedAt` | Date/String | required | Modified on every update. |

### C. Collection: `entries`
*(Path: `/entries/{entryId}`)*

| Property | Type | Constraints / Rules | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | required, unique, PK | UUID, formatted as `ent_uuid`. |
| `eventId` | String | required, FK -> `events.id` | The parent event this belongs to. |
| `receiptNumber`| String | required, unique per event | Formatted counter (e.g., "001", "002"). |
| `name` | String | required, max 100 chars | Name of the person giving Moi. |
| `amount` | Number | `> 0` | The gift amount. |
| `paymentMethod`| String | enum: ["Cash", "UPI", "Card", "Cheque", "Bank Transfer"] | How it was paid. |
| `date` | String | YYYY-MM-DD | Display date on receipt. |
| `time` | String | HH:MM:SS | Display time on receipt. |
| `createdAt` | Date/String | required, immutable | Precise creation timestamp. |

---

## 3. Relationships

The schema relies on a **One-to-Many Relationship** between `events` and `entries`.
Instead of embedding `entries` directly inside an `event` document (which hits Firestore's 1MB document limit rapidly), they are separated into a flat hierarchy. 
* To query all entries for an event, we perform: `WHERE eventId == "evt_abc123"`.

---

## 4. Denormalization Strategy

Notice the `totalAmount` and `totalEntries` on the `Event` model. 
* **Why?** If we want to show 10 events on the dashboard, querying and summing thousands of child entries just to display the total would be financially expensive (Firestore reads) and slow.
* **How it works:** When an `Entry` is created/deleted, a transaction increments/decrements the `Event.totalAmount` and `Event.totalEntries` mathematically.

---

## 5. Required Firestore Indexes

To support efficient queries in the Database Page (which features sorting and filtering), Firestore will require Composite Indexes. 

**Single Field Indexes (Auto-created by Firestore):**
* `entries.eventId` (Asc/Desc)
* `entries.createdAt` (Asc/Desc)
* `entries.paymentMethod` (Asc/Desc)
* `entries.name` (Asc/Desc)

**Composite Indexes (Must be deployed via `firestore.indexes.json`):**
1. **Collection:** `entries`
   * Field: `eventId` (Ascending)
   * Field: `createdAt` (Descending)
   * *Purpose:* Loading the live table in chronological order for a specific event.
2. **Collection:** `entries`
   * Field: `eventId` (Ascending)
   * Field: `paymentMethod` (Ascending)
   * Field: `createdAt` (Descending)
   * *Purpose:* Filtering a specific event's entries by payment method, while keeping them sorted by newest first.

---

## 6. Migration Map: Local Storage -> Firestore

### Local Storage Implementation (Phase 1)
In Local Storage, the entire database fits in a single JSON block.
```json
// window.localStorage.getItem("happy_pocket_db")
{
  "settings": { ... },
  "events": [ { ... } ],
  "entries": [ { ... } ]
}
```

### Firestore Implementation (Phase 2)
Because our Local Storage JSON structure separates `events` and `entries` natively, the data mappings are a literal 1:1 translation.

* `db.events` array `-->` Firestore Collection `/events/`
* `db.entries` array `-->` Firestore Collection `/entries/`
* `db.settings` object `-->` Firestore Document `/settings/global`

**The Code Swap:**
When swapping, the `services/storage.js` file is the ONLY file altered.
* **Old:** `JSON.parse(localStorage.getItem()).entries.filter(e => e.eventId === id)`
* **New:** `getDocs(query(collection(db, "entries"), where("eventId", "==", id)))`

No React components, hooks, or pages will need refactoring to accommodate this backend swap.
