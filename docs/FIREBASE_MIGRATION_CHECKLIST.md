# Firebase Firestore Migration Checklist (Phase 2)

This checklist provides a technical walkthrough for transitioning the Happy Pocket storage layer to Firebase Cloud Firestore.

## 1. Firebase Initialization & Auth
* [ ] Install Firebase dependencies in `package.json`:
  ```bash
  npm install firebase
  ```
* [ ] Create environment configuration files (`.env.local` and `.env.production`) to declare API credentials.
* [ ] Create `src/services/firebase.js` to initialize the Firebase App SDK, Cloud Firestore database instance, and Client Authentication.
* [ ] Implement User Login / Session listeners inside `App.jsx` or a custom Auth Context:
  ```javascript
  import { onAuthStateChanged } from 'firebase/auth';
  ```
* [ ] Restrict database calls in storage hooks to wait until user authentication resolves.

## 2. Collection & Security Rules Configuration
* [ ] Set up the `users`, `events`, and `entries` collections in the Firebase Console.
* [ ] Establish composite indices on the `entries` collection:
  * Key 1: `eventId` (Ascending)
  * Key 2: `createdAt` (Descending)
* [ ] Publish Firestore Security Rules protecting user-owned nodes:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /events/{eventId} {
        allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      }
      match /entries/{entryId} {
        allow read, write: if request.auth != null && get(/databases/$(database)/documents/events/$(request.resource.data.eventId)).data.userId == request.auth.uid;
      }
    }
  }
  ```

## 3. Storage Service Implementation Rewrite
* [ ] Overwrite `src/services/storage.js` to utilize Firestore collection triggers (`getDocs`, `addDoc`, etc.).
* [ ] Rewrite settings updates to merge parameters on user docs:
  ```javascript
  setDoc(doc(db, 'users', uid), updates, { merge: true });
  ```
* [ ] Convert the `createEntry` function to a Firestore transaction to ensure atomic event aggregations:
  * Retrieve active event document.
  * Query current entry counts to determine next sequential receipt ID.
  * Write contribution document.
  * Update event aggregates (`totalAmount += amount`, `totalEntries += 1`).
* [ ] Convert `deleteEntry` and `updateEntry` to use transactions to recalculate parent event totals.

## 4. Offline Capabilities (Firestore Local Cache)
* [ ] Enable Offline Persistence inside `firebase.js` for mobile web users who run ledgers in remote rural marriage halls without internet connections:
  ```javascript
  import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
  
  const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  });
  ```

## 5. UI Integration & Validation
* [ ] Verify that page routing loaders transition smoothly during network roundtrips.
* [ ] Test backup export downloads using Firestore queries.
* [ ] Verify CSV/Excel/PDF exports function cleanly with the retrieved Firestore payloads.
