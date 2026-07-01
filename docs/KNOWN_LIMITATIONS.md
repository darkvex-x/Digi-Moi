# Known Limitations & Boundaries: Happy Pocket

This document details the design constraints, browser storage limits, and boundary behaviors of the Happy Pocket application in its Phase 1 (Local Storage / IndexedDB) implementation.

## 1. Storage Quotas (IndexedDB / Local Storage)
* **Local Storage Boundary**: Standard web browsers restrict `localStorage` writes to **5 MB – 10 MB** per origin domain.
* **Impact**:
  * A single guest contribution entry consumes approximately **250 bytes** when stringified.
  * The database can safely store up to **20,000–30,000 guest contributions** before browser warnings occur.
  * Large backup imports containing over 15,000 records might encounter writing exceptions on space-constrained mobile devices.
* **Resolution**: In Phase 2, migrating to Firebase Cloud Firestore will offload database storage to the cloud, removing browser quota limits.

---

## 2. Concurrency & Multi-Device Sync
* **Single Device Domain**: Under Phase 1, data is confined strictly to the browser engine of the local device.
* **No Real-Time Sync**: Ledgers created on a laptop will not sync automatically to a smartphone unless a manual JSON backup is exported and imported.
* **Collision Hazards**: If multiple users edit settings simultaneously in separate browser tabs on the same device, the last write wins (`localStorage.setItem`).

---

## 3. Receipt Generation Limitations
* **Sequence Computation**: Next sequential receipt numbers are computed dynamically based on the highest existing receipt number within that event (`maxReceiptNumber + 1`).
* **Manual Deletions Impact**:
  * If a user records entries up to `Moi-010` and deletes the last entry (`Moi-010`), the next added entry will reuse receipt number `Moi-010`.
  * If a historical entry is deleted (e.g. deleting `Moi-005` out of a list of 10 entries), the sequence is not adjusted retrospectively to preserve the chronological audit trail. The next generated entry remains `Moi-011`.

---

## 4. Printer Integration Rules
* **Hardware Drivers**: The web app relies on the browser's standard Print dialog (`window.print()`).
* **Thermal Dimensions**: Thermal printers (e.g. 58mm/80mm POS printers) require proper setup in the system print dialog:
  * Margin: Set to **None**.
  * Headers/Footers: **Disabled** (to prevent the browser from printing URL strings, page counts, or date-stamps on the receipt paper).
  * Scale: Set to **Fit to Page** or **100%**.
