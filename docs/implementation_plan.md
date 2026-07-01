# Implementation Plan: Happy Pocket – Wedding Moi Management System

This document outlines the finalized, production-ready folder structure and architecture for the Happy Pocket web application. Following best practices for modern React applications, it is built to be scalable, maintainable, and seamlessly transitionable to Firebase.

## Finalized Folder Structure

```text
src/
├── assets/             # Static assets like images, icons, logos
├── components/         # Component Architecture
│   ├── ui/             # Generic, reusable atomic components (Buttons, Cards, Inputs, Modals)
│   ├── layout/         # Layout components (Sidebar, Header, Footer)
│   └── shared/         # Reusable business components (Tables, SummaryCards, Searchbars)
├── constants/          # Reusable application constants
│   ├── paymentMethods.js
│   ├── routes.js
│   ├── theme.js
│   └── receipt.js
├── context/            # Segmented Global State Management
│   ├── EventContext.jsx
│   ├── ThemeContext.jsx
│   └── SettingsContext.jsx
├── hooks/              # Custom React hooks, single responsibility each
│   ├── useLocalStorage.js
│   ├── useReceiptNumber.js
│   ├── useTotals.js
│   ├── useSearch.js
│   └── usePrint.js
├── models/             # Data structure definitions (documentation for Firebase migration)
│   ├── Event.js
│   └── Entry.js
├── pages/              # Page-level route components
│   ├── Dashboard/      
│   ├── EventCreate/    
│   ├── EventView/      
│   ├── EventHistory/   
│   ├── Database/       
│   └── Settings/       
├── print/              # Dedicated printing module isolate thermal print views
│   ├── Thermal58.jsx
│   ├── Thermal80.jsx
│   ├── PrintPreview.jsx
│   └── PrintHelpers.js
├── services/           # Abstraction layer for Data APIs
│   ├── storage.js      # All database I/O goes through here. Replaced with Firebase later.
│   └── export.js       # CSV, Excel, PDF generation logic
├── utils/              # Pure utility functions
│   ├── currency.js
│   ├── date.js
│   ├── validation.js
│   ├── format.js
│   ├── receipt.js
│   └── helpers.js
├── App.jsx             # Main App router
├── index.css           # Tailwind configuration and global styles
└── main.jsx            # React app mount point
```

## Architecture Details

- **Models**: The `models/` directory documents the shape of the data ensuring that future Firebase migrations are just mapping objects to these models.
- **Constants**: All magic strings and values are extracted out into `constants/` to ensure consistency application-wide.
- **Print Module**: Thermal receipt rendering is decoupled from UI logic in the dedicated `print/` directory.
- **Hooks & Utils**: Segmented into focused specific files to guarantee high reusability and unit testing capabilities.
- **Storage Layer**: A strict "No Component Local Storage Access" rule is enforced. `services/storage.js` acts as our DB mock. The localized schema resembles a real normalized database with flat structures (`{ "settings": {}, "events": [], "entries": [] }`).
- **UI Design**: Premium, minimalistic dashboard design, steering completely clear of raw "Excel sheet" vibes. Soft shadows, rounded interfaces, responsive logic included.

## Next Steps

1. Approve this finalized layout (Step 1).
2. Initialize React + Vite project (Step 2).
3. Configure Tailwind CSS and React Router (Steps 3 & 4).
4. Scaffold directories (Step 5).
5. Create placeholder pages (Step 6).

Once you approve, we will begin execution module by module.
