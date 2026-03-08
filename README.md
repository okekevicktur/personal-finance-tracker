# Personal Finance Tracker App

A premium, fintech-inspired personal finance management app built with React, TypeScript, and TailwindCSS. Track expenses, set budgets, and gain actionable insights—all with a clean, trustworthy design inspired by PiggyVest's aesthetic.

## Inspiration

This project design was inspired by **PiggyVest**, a Nigerian fintech app known for its:

- **Clean, modern aesthetic** - Minimal design without unnecessary clutter
- **Trustworthy feel** - Color-coded insights and clear financial status
- **Premium experience** - Smooth animations, thoughtful interactions, soft shadows
- **Accessibility** - Easy to understand financial data at a glance

The goal was to create a similar premium experience for personal finance tracking with a focus on Nigerian users (NGN currency).

---

## What You Built & Design Choices

### Core Features Implemented

1. **Transaction Management**
   - Add, view, and delete transactions with category, amount, description, and date
   - Filter transactions by type (All/Income/Expense)
   - Transactions persist to localStorage automatically

2. **Budget Tracking**
   - Set monthly budget limits per category (Housing, Food & Dining, Transport, Entertainment)
   - Real-time progress bars showing spending vs. budget
   - Color-coded status: Blue (normal) → Yellow (80%+) → Red (exceeded)
   - Click-to-edit inline budget limits

3. **Smart Insights**
   - Auto-generated insights based on spending patterns:
     - Savings rate calculation
     - Month-over-month category comparisons
     - Budget proximity warnings
   - Insights update in real-time as transactions change

4. **Dashboard Analytics**
   - Total balance with CountUp animation
   - Monthly income and expense summaries
   - Donut chart showing spending distribution by category
   - Legend with category icons, amounts, and percentages

5. **Data Persistence**
   - All data saved to localStorage (no backend needed)
   - Automatic seed data on first load (8 realistic transactions)
   - Instant syncing—every action updates storage

### Design & Technical Choices

| Choice                                | Reasoning                                                           |
| ------------------------------------- | ------------------------------------------------------------------- |
| **React + TypeScript**                | Strict typing prevents bugs, improves maintainability               |
| **TailwindCSS**                       | Rapid styling, custom color palette, responsive utilities           |
| **Recharts**                          | Lightweight charting library, smooth animations, easy customization |
| **Lucide Icons**                      | Clean SVG icons, no emojis, accessible and professional             |
| **Custom Hooks**                      | Separation of concerns (useTransactions, useBudget, useInsights)    |
| **localStorage**                      | No backend complexity, instant persistence, works offline           |
| **Mobile-first**                      | Single column on mobile, 2-column grid on desktop (md+)             |
| **Nigerian Naira (₦)**                | Localized for Nigerian users with realistic amounts                 |
| **Soft shadows & 16px border-radius** | Premium, approachable feel (not flat, not skeuomorphic)             |
| **Blue gradient cards**               | Trustworthy, professional, consistent with fintech design language  |

### Architecture Highlights

```
src/
├── components/        # 15 reusable, single-responsibility components
├── hooks/            # Custom state management (useTransactions, useBudget, useInsights)
├── utils/            # Pure functions (14 financial calculations + helpers)
├── types/            # Strict TypeScript definitions
└── styles/           # Global styles + animations
```

**Key principle**: Data flows down, callbacks flow up. No prop drilling beyond 2 levels.

---

## What You'd Improve With More Time

### 1. **Backend & Authentication**

- Node.js/Express backend with Firebase or PostgreSQL
- User authentication (Google OAuth, email/password)
- Cloud sync across devices
- Transaction history spanning multiple years

### 2. **Advanced Analytics**

- Recurring transactions detection
- Predictive spending forecasts (ML)
- Custom date range filtering
- Export to CSV/PDF reports
- Year-over-year comparisons

### 3. **Budget Features**

- Multiple budget profiles (weekly/monthly/quarterly)
- Budget templates (common spending patterns)
- Alerts for budget overruns (email/push notifications)
- Savings goals with progress tracking

### 4. **UX Enhancements**

- Account settings (currency, language, themes)
- Dark mode toggle
- Undo/redo for transactions
- Search and advanced filtering
- Drag-and-drop category reordering

### 5. **Mobile App**

- React Native version for iOS/Android
- Receipt scanning with OCR
- Biometric authentication (Face ID/Touch ID)
- Offline-first sync

### 6. **Testing**

- Unit tests (Jest)
- Component tests (React Testing Library)


### 7. **Performance**

- Code splitting and lazy loading
- Service worker for PWA capabilities
- Virtual scrolling for large transaction lists
- Memoization optimization

### 8. **Features for Scale**

- Multi-currency support
- Shared budgets (family/roommates)
- Integration with bank APIs
- Bill reminders and subscriptions tracking

---

## Challenges Faced

### 1. **Type Safety with Lucide Icons**

**Challenge**: Lucide React icons don't accept `style` or `color` props in the type definition.

**Solution**: Wrapped icons in a `<div>` with inline color styles:

```tsx
<div style={{ color: categoryColor }}>
  <IconComponent size={20} />
</div>
```

This maintains type safety while allowing dynamic coloring.

### 2. **Date Handling Across Months**

**Challenge**: Calculating month-over-month insights required comparing transactions across two different months while handling date edge cases.

**Solution**: Used `date-fns` library's `getMonth()` and `getYear()` to reliably parse ISO dates and compare periods.

### 3. **Real-time Calculations**

**Challenge**: Every transaction action (add/delete/edit) triggers recalculation of balance, budgets, and insights—performance needed optimization.

**Solution**: Used `useMemo` in components to memoize expensive calculations. Kept calculation functions pure and leverage React's dependency tracking.

### 4. **Modal Positioning on Mobile**

**Challenge**: Transaction form modal needed different behavior on mobile (slide from bottom) vs desktop (center overlay).

**Solution**: Used Tailwind's responsive prefixes (sm:) to position modal at bottom on mobile, centered on desktop with proper z-indexing.

### 5. **localStorage with Complex State**

**Challenge**: Managing concurrent updates to localStorage without race conditions or data loss.

**Solution**: Every state update in hooks immediately saves to localStorage. Used callback pattern to ensure atomicity.

### 6. **Empty States & UX**

**Challenge**: Deciding when to show empty states vs. seed data to avoid confusing new users.

**Solution**: Check localStorage on mount—if empty, load seed data automatically. Provides immediate "aha" moment without blank screens.

---

## Time Spent (Approximately)

| Phase                             | Time     | Details                                                                                  |
| --------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| **Planning & Architecture**       | 2 hours   | Created comprehensive implementation plan with component hierarchy                       |
| **Setup & Configuration**         | 30 min   | Vite, TypeScript, TailwindCSS, PostCSS, tsconfig                                         |
| **Types & Constants**             | 50 min   | Type definitions, color palette, seed data                                               |
| **Utility Functions**             | 60 min   | 14 financial calculation functions, localStorage helpers                                 |
| **Custom Hooks**                  | 1.5 hours   | useTransactions, useBudget, useInsights                                                  |
| **Reusable Components**           | 2 hours   | ProgressBar, CategoryBadge, EmptyState, Toast                                            |
| **Dashboard Components**          | 4 hours   | DashboardCards, SpendingChart, BudgetCard, BudgetSection, InsightsStrip, TransactionList |
| **Modal & Forms**                 | 1 hour   | TransactionForm with validation, animations                                              |
| **Main Layout & Integration**     | 40 min   | Dashboard.tsx, Navbar, component composition                                             |
| **Bug Fixes & TypeScript Errors** | 5 hours   | Icon styling, unused imports, type compatibility                                         |
| **Testing & Build Verification**  | 30 min   | npm build, resolved bundling issues                                                      |
| **Documentation (README)**        | 1 hour   | This file                                                                                |
|                                   |          |                                                                                          |
| **TOTAL**                         | ~24 hours | Complete project from empty directory to production-ready build                          |

---

## Key Metrics

- **Components**: 15 (1 main layout, 7 section components, 4 reusable, 2 modals, 1 root)
- **Custom Hooks**: 3
- **Utility Functions**: 14
- **TypeScript Strictness**: ✅ 100% (no `any` types)
- **Bundle Size**: 905 KB minified (252 KB gzip)
- **Responsive Breakpoints**: Mobile, Tablet (md), Desktop (lg)
- **Animations**: 6 (CountUp, SlideUp, FadeIn, ProgressBar, etc.)

---

## Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Type check
npm run lint
```

### First-Time Experience

1. App loads with 8 seed transactions (₦500,000 salary, various expenses)
2. Dashboard shows:
   - **Total Balance**: ₦458,000 (income - expenses)
   - **Monthly Income**: ₦500,000
   - **Monthly Expenses**: ₦297,200
   - Spending donut chart with legend
   - Budget tracker with progress bars
   - Smart insights on spending patterns
   - Recent transaction list

3. Click **"Add Transaction"** to open the form modal
4. All data persists to localStorage automatically

---

## Features at a Glance

- ✅ Add/delete transactions
- ✅ Filter by type (All/Income/Expense)
- ✅ Set and edit budget limits
- ✅ Real-time budget progress tracking
- ✅ Auto-generated spending insights
- ✅ Beautiful donut chart with legend
- ✅ CountUp animations
- ✅ Toast notifications
- ✅ Responsive design (mobile → desktop)
- ✅ Full localStorage persistence

---

## Design System

### Colors

- **Primary Blue**: `#0066F5` (trust, action)
- **Light Blue**: `#E8F0FE` (backgrounds, hover)
- **Success Green**: `#00C48C` (income, positive)
- **Warning Yellow**: `#F5A623` (budget alerts)
- **Danger Red**: `#FF4D4F` (expenses, exceeded)
- **Dark Text**: `#0A1929` (readability)
- **Muted Text**: `#6B7A99` (secondary info)

### Spacing & Sizing

- **Border Radius**: 16px (cards), 12px (inputs/buttons)
- **Shadows**: `0 2px 20px rgba(0, 102, 245, 0.08)` (subtle, premium)
- **Grid**: 12-column responsive layout

---

## Acknowledgments

- Inspired by **PiggyVest** - Nigeria's leading fintech
- Built with **React 18**, **TypeScript 5**, **TailwindCSS 3**
- Icons from **Lucide React**
- Charts from **Recharts**
- Dates handled with **date-fns**

---

## 📄 License

MIT - Feel free to use this project as a template or learning resource.

---

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your needs!

**Suggested improvements**:

- Add unit tests
- Implement dark mode
- Add more transaction categories
- Create a backend API
- Deploy to Vercel/Netlify

---

**Built with ❤️ as an assessment for personal finance management.**
