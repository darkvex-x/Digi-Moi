# Firebase Firestore Migration Guide

This document maps out the steps required to migrate Happy Pocket's storage backend from Local Storage (`StorageService`) to Firebase Cloud Firestore.

## 1. Firestore Database Schema Design

 Firestore is a NoSQL document database. We will establish three root collections to model our application structures:

### Collection 1: `users` (For settings configuration)
* **Document ID**: Unique Auth UID (`users/{userId}`)
* **Fields**:
  * `businessName`: string (e.g. "Happy Pocket")
  * `receiptPrefix`: string (e.g. "Moi-")
  * `currency`: string (e.g. "₹")
  * `paperWidth`: string (e.g. "58mm")
  * `theme`: string (e.g. "light")

### Collection 2: `events` (For ledger events)
* **Document ID**: Generated Event UUID (`events/{eventId}`)
* **Fields**:
  * `userId`: string (matches auth user UID)
  * `eventName`: string (required)
  * `brideName`: string
  * `groomName`: string
  * `venue`: string
  * `functionDate`: string (YYYY-MM-DD)
  * `notes`: string
  * `totalAmount`: number (aggregated counter)
  * `totalEntries`: number (aggregated counter)
  * `createdAt`: timestamp
  * `updatedAt`: timestamp

### Collection 3: `entries` (For guest contributions)
* **Document ID**: Generated Entry UUID (`entries/{entryId}`)
* **Fields**:
  * `eventId`: string (foreign key index reference)
  * `receiptNumber`: string (e.g. "001", "002")
  * `name`: string
  * `amount`: number
  * `paymentMethod`: string
  * `notes`: string
  * `date`: string
  * `time`: string
  * `createdAt`: timestamp

---

## 2. API Method Transformations

Since our `StorageService` returns Promises for all operations, the React UI is fully async-ready. The migration involves rewriting functions inside `src/services/storage.js` to call Firebase web SDK methods:

| Existing Local Storage Method | Firestore Implementation | SDK Call Examples |
| :--- | :--- | :--- |
| `getSettings()` | Fetch document by user auth ID | `getDoc(doc(db, 'users', uid))` |
| `saveSettings()` | Write updates to user document | `setDoc(doc(db, 'users', uid), updates, { merge: true })` |
| `getEvents()` | Query event collection ordered by creation | `getDocs(query(collection(db, 'events'), where('userId', '==', uid), orderBy('createdAt', 'desc')))` |
| `createEvent()` | Add doc to events collection | `addDoc(collection(db, 'events'), newEventData)` |
| `createEntry()` | Execute transactional write (add entry + increment event count) | `runTransaction(db, async (t) => { ... t.update(eventRef, { totalAmount: increment(a), totalEntries: increment(1) }) })` |

---

## 3. Recommended Firebase Setup Steps

1. **Install Firebase dependency**:
   ```bash
   npm install firebase
   ```
2. **Scaffold initialization script** inside `src/services/firebase.js`:
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };

   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   ```
3. **Configure Firestore Indexes**:
   Create a composite query index for the `entries` collection:
   * **Collection ID**: `entries`
   * **Fields**: `eventId: Ascending`, `createdAt: Descending`
