# Happy Pocket: UI/UX Design Specification

## 1. Global Design System

Happy Pocket will be styled as premium business software. We will avoid the "basic web app" look and aim for a high-end Stripe or Vercel dashboard aesthetic.

### Typography
* **Primary Font:** *Inter* or *Plus Jakarta Sans* (Clean, highly legible, modern geometric sans-serif).
* **Weights:** Regular (400) for body, Medium (500) for buttons/tabs, Semi-Bold (600) for headers.
* **Tracking:** Slightly tighter tracking (-0.01em) on large headings to feel premium.

### Color Palette (Business Pro)
* **Background:** Light off-white (`#F9FAFB` - Tailwind `gray-50`) to make cards pop.
* **Surface/Cards:** Pure White (`#FFFFFF`) with varying opacity in dark mode.
* **Primary Accent (Brand):** Indigo-Teal gradient or deep royal blue (`#4F46E5` to `#2563EB`) – conveys trust and wealth.
* **Text (Primary):** Almost black (`#111827` - Tailwind `gray-900`).
* **Text (Secondary):** Subtle gray (`#6B7280` - Tailwind `gray-500`).
* **Success (Amounts in):** Emerald Green (`#10B981`) – used for money/collection totals.
* **Danger/Delete:** Rose Red (`#F43F5E`).

### Component Styles
* **Cards:** Generous padding (`p-6` or `p-8`), rounded corners (`rounded-xl` or `rounded-2xl`), and subtle, soft shadows (`shadow-sm` extending to `shadow-md` on hover).
* **Inputs:** Light gray background (`#F3F4F6`), no border until focused, transitioning to a primary colored border and subtle ring on focus. Rounded corners (`rounded-lg`).
* **Buttons:** 
  * *Primary:* Solid brand color or subtle gradient, slightly rounded (`rounded-lg`), bold text, subtle lift/shadow on hover (`hover:-translate-y-0.5`).
  * *Secondary:* Light gray background, dark text, no border.
  * *Outline:* For destructive or secondary tertiary actions.
* **Icons:** *Lucide React* icons with a consistent stroke width of `1.5` or `2` for a sharp, refined look.

---

## 2. Layout & Global Navigation

### Responsive Strategy
* **Desktop (1024px+):** Fixed left sidebar, main content area taking the rest of the space.
* **Tablet (768px - 1024px):** Collapsed left sidebar (icons only). Main content expands.
* **Mobile (<768px):** Sidebar converts into a sticky bottom navigation bar.

### Sidebar (Left)
* **Top:** Brand Logo (Happy Pocket) and Business Name.
* **Links:** Dashboard, Current Event (active if event exists), Database, History, Settings.
* **Design:** Clean white background, items have a light primary-colored background when active, simple icon + label.

### Header (Top)
* **Left:** Breadcrumbs (e.g., `Events / Wedding of John & Jane / Overview`).
* **Right:** Current Date & Time (Live updating), Quick Theme Toggle (Light/Dark).

---

## 3. Screen Specifications

### A. Dashboard
* **Layout:** Grid Layout.
* **Top Section:** 4 Statistical Cards (Total Events, Total Entries, Total Collection, Today's Collection). Each card features a top-right icon, large bold numbers, and a subtle trend indicator (e.g., "+$5,000 today").
* **Middle Section (CTA):** A prominent, full-width or large central banner/button: `+ Create New Event`. Styled with a premium gradient and a plus icon.
* **Bottom Section:** "Recent Events" List or Table viewing the last 3-5 events with quick "Open" buttons.

### B. Create Event Page
* **Layout:** Centered, narrowed card (max-width `2xl`) to maintain focus.
* **Form Layout:** 
  * Row 1: Event Name (Full width)
  * Row 2: Bride Name (1/2), Groom Name (1/2)
  * Row 3: Venue (2/3), Date (1/3)
  * Row 4: Notes (Textarea, Full width)
  * Row 5: Submit Button (Primary, stretch full width).
* **Interactions:** Input fields highlight on focus. "Generate Unique ID" runs silently in the background on submit.

### C. Event Details Page (The Main Hub)
* **Layout:** Asymmetric Split (Left: Entry Form, Right: Live Table & Stats).
* **Hero Banner (Top):** A sleek header displaying the Event Name, Bride/Groom, Venue, and two massive, highly visible counters: **Total Amount (Green)** and **Total Entries (Gray)**.
* **Left Column (Sticky Form):** 
  * The Entry Form is pinned to the left so it's always available.
  * Rapid data entry optimized (Tab key moves smoothly through fields).
  * Auto-filled Date/Time. Payment method is a stylized group of toggle buttons (Cash, UPI, Card), NOT a standard dropdown, to save clicks.
* **Right Column (Live Table):** 
  * Instant-updating table showing the most recent entries at the top.
  * Table rows highlight briefly (flash green) when a newly added entry appears.

### D. Database Page
* **Layout:** Full-width Data Grid.
* **Controls (Top):** Search bar (left), Filters (Payment Method dropdown, Date range), and Export buttons (CSV, PDF) aligned right.
* **Table:** Standardized data table with sticky headers.
* **Footer:** Pagination controls.
* **Actions:** Hovering over a row reveals inline "Edit" (pencil) and "Delete" (trash) icons.

### E. Event History
* **Layout:** Masonry or Grid of Cards (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
* **Card Design:** Each card represents an event. Shows Event Name, Date, and a mini-summary (Collections, Entries).
* **Hover State:** Card lifts slightly. Action buttons fade in: `Open`, `Print Summary`, `Duplicate`, `Delete`.

### F. Settings Page
* **Layout:** Vertical tabs or a single scrolling page with distinct sections separated by dividers.
* **Sections:**
  1. **Business Info:** Name, Logo upload, Currency Symbol selection.
  2. **Receipt Config:** Receipt Prefix input, Thermal Paper Width toggle (58mm / 80mm).
  3. **Theme:** System/Light/Dark mode selectors with visual previews.
  4. **Data Management:** Backup Database (JSON export), Restore Database (JSON import).

---

## 4. State Management (UI)

* **Loading States:** NO spinning loaders for data fetches. Use **Skeleton Screens** (shimmering gray boxes) that match the shape of the content (e.g., skeleton table rows or skeleton stats cards) to make the app feel instantly responsive.
* **Empty States:** When a table has no data, show a high-quality, subtle illustration (e.g., an empty box or clipboard), a clear header ("No entries yet"), and a CTA button ("Add your first entry").
* **Error States:** For form validations (e.g., missing name or negative amount), use inline red text directly beneath the input field with a small alert icon. Prevent the layout from jumping when the error appears. Add a subtle shake animation to the input field on failed submit.
* **Success States:** Toast notifications (bottom-right) that slide in when an entry is successfully added or an event is created.

---

## 5. Thermal Print Preview Specification
* **Constraint:** Strictly monochromatic (Black & White). High contrast. No gray shades if possible to accommodate cheap thermal printers.
* **Layout Structure:**
  * **Header:** Centered. Business Name (Large, Bold), "Wedding Moi Service" (Smaller, below). Dashed dividing line (`-----------------`).
  * **Body:** Two-column alignment (Key on left, Value right-aligned).
    * Receipt No: #001
    * Name: John Doe
    * Amount: ₹5,000 (Bold)
    * Method: UPI
    * Date/Time: below entries
  * **Footer:** Dashed dividing line. "Thank You".
* **Technical execution:** CSS `@media print` will entirely hide the sidebar, header, and padding, rendering *only* the specific receipt `<div>` set to `width: 58mm` or `80mm` based on settings.
