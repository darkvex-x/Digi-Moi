# Happy Pocket Testing Guide

This guide outlines manual and automated testing checklists to verify the functionality, correctness, accessibility, and reliability of the Happy Pocket application.

## 1. Manual QA Verification Checklist

### A. General Operations
1. **Routing Verification**:
   * Navigate to Dashboard, Event View, Database Viewer, Event History, and Settings.
   * Verify that routing updates clean URL paths and transition with fade animations.
   * Reload settings views to verify preference states are maintained in IndexedDB.
2. **Theme Toggling**:
   * Open Settings, change Theme selector to Dark. Verify that background elements shift to dark shades.
   * Reload setting page and check if theme persist correctly.
3. **Database Reset**:
   * Under settings page, click "Reset Everything". Approve the validation warnings.
   * Verify that browser reloads and re-initiates default configurations.

### B. Event & Contribution Flows
1. **Event Creation**:
   * Go to "Create New Event". Fill name and venue, click submit.
   * Verify Toast pops up declaring event initialization, and redirect handles active layout views.
2. **Contribution Input**:
   * Enter a guest name and amount inside the active event view page.
   * Select a payment method, click "Add Entry".
   * Verify table list logs the entry immediately. Recalculates stats cards (running total + entry count).
3. **Receipt Number Generation**:
   * Record three entries. Verify receipt tags are sequential (e.g. `Moi-001`, `Moi-002`, `Moi-003`).

### C. Advanced Interactions
1. **Search Debounce**:
   * Open the Database Page, type guest name keywords in the search bar.
   * Verify that the database grid does not lock or stutter, updating 250ms after typing halts.
2. **Keyboard Pagination**:
   * Click search inputs or blank areas on Database grid to lose input focus.
   * Press `ArrowLeft` and `ArrowRight` on the keyboard. Verify table pages slide back/forth.

### D. Export & Print Integrations
1. **Thermal Receipts Layout**:
   * Select an entry row and trigger the Print action.
   * Toggle simulated paper widths (`58mm` / `80mm`). Zoom in/out.
   * Check if text renders in high-contrast solid black.
2. **CSV / Excel / PDF Downloads**:
   * In the Database Viewer page, click PDF/CSV/Excel buttons.
   * Verify files save correctly under standardized names: `eventname_YYYY-MM-DD.ext`.
   * Open PDF to inspect table totals.

---

## 2. Mock Data Setup for Verification
To run tests with populated values:
1. Go to the Settings page.
2. Under "Restore Data", select a JSON file containing the following format:
   ```json
   {
     "settings": {
       "businessName": "Test Wedding Hall",
       "receiptPrefix": "Moi-",
       "currency": "₹",
       "paperWidth": "58mm",
       "theme": "light"
     },
     "events": [
       {
         "id": "evt_test1",
         "eventName": "Raja & Priya Wedding",
         "brideName": "Priya",
         "groomName": "Raja",
         "venue": "Grand Mandapam, Chennai",
         "functionDate": "2026-07-01",
         "notes": "Testing event ledger",
         "totalAmount": 5000,
         "totalEntries": 2,
         "createdAt": "2026-07-01T05:00:00.000Z",
         "updatedAt": "2026-07-01T05:00:00.000Z"
       }
     ],
     "entries": [
       {
         "id": "ent_test1",
         "eventId": "evt_test1",
         "receiptNumber": "001",
         "name": "Elavarasan",
         "amount": 2000,
         "paymentMethod": "Cash",
         "date": "2026-07-01",
         "time": "10:30:00",
         "createdAt": "2026-07-01T05:01:00.000Z"
       },
       {
         "id": "ent_test2",
         "eventId": "evt_test1",
         "receiptNumber": "002",
         "name": "Anbarasan",
         "amount": 3000,
         "paymentMethod": "UPI",
         "date": "2026-07-01",
         "time": "10:35:00",
         "createdAt": "2026-07-01T05:02:00.000Z"
       }
     ]
   }
   ```
3. Trigger upload and verify mock values hydrate automatically.
