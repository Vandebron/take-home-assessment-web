# React Example - Energy Consumption Calculator

A production-ready React application for calculating household energy consumption based on house type, number of residents, and energy product selection.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- Yarn 4.x (Corepack enabled)

### Installation
```bash
yarn install
```

### Development
```bash
yarn dev
```
Visit http://localhost:5173

### Testing
```bash
yarn test              # Run tests with coverage
yarn test:watch        # Run tests in watch mode
```

### Building
```bash
yarn build             # Production build
yarn preview           # Preview production build
```

### Code Quality
```bash
yarn lint              # Run ESLint
yarn lint:fix          # Fix linting issues
yarn format            # Format code with Prettier
yarn format:check      # Check formatting
yarn typecheck         # TypeScript type checking
yarn analyze           # Analyze bundle size
```

## Production-Ready Features

### Error Handling
- **ErrorBoundary** - Catches React errors and displays fallback UI
- **Loading component** - Reusable loading states (small/medium/large, inline/fullscreen)
- **404 Page** - Custom 404 error page with navigation

### Security
- **Security Headers** - CSP, X-Frame-Options, X-Content-Type-Options, etc. (via `_headers`)
- **Dependency Scanning** - Trivy and npm audit in CI/CD
- **Secret Scanning** - GitGuardian and Gitleaks prevent accidental key commits
- **Error Boundary** - Prevents full app crashes from unhandled errors
- **.gitignore** - Proper exclusion of sensitive files and build artifacts

### SEO & Discoverability
- **Meta Tags** - Title, description, keywords, Open Graph tags
- **Structured Data** - JSON-LD for WebApplication, HowTo, and BreadcrumbList
- **robots.txt** - Search engine crawler configuration
- **Semantic HTML** - Proper HTML5 elements throughout

### Performance
- **Bundle Analysis** - `yarn analyze` to visualize bundle size
- **Lazy Loading** - Ready for code-splitting with React.lazy
- **Asset Optimization** - Vite optimization for production builds

### Monitoring & Analytics Ready
- **Environment Variables** - `.env.example` with API/analytics placeholder
- **Error Tracking Ready** - ErrorBoundary prepared for Sentry/similar services

## Bug Fixes

### Fixed Bugs
1. **Infinite render loop in HouseTypeSelector** - Added missing dependency array to `useEffect` hook
2. **Incorrect residents selection** - Fixed off-by-one error where `value === index` should be `value === index + 1`
3. **Initial residents value incorrect** - Changed default value from 8 to 2 to match the goal app
4. **Unused state variables** - Removed unused `consumption` and `setConsumption` state
5. **Unused imports** - Removed unused `X` import from `lucide-react`

### Implemented Features
1. **ProductSelector component** - Implemented product selection with electricity and electricity+gas options
2. **Inline value display** - Added selected values display inline with labels (e.g., "Type woning: Appartement")
3. **Visual feedback** - Added opacity to unselected options (0.4) for better UX
4. **Solar panel icon** - Added solar panel icon to checkbox label
5. **Consumption calculation** - Implemented realistic energy consumption calculation based on:
   - House type (apartment: 0.8x, townhouse: 1.0x, corner: 1.15x, semi-detached: 1.25x, detached: 1.4x)
   - Number of residents (600 kWh/person/year for electricity, 500 m³/person/year for gas)
   - Solar panels (30% reduction in electricity consumption)
   - Product type (electricity only or electricity + gas)
6. **Semantic HTML & Accessibility**:
   - Changed div structure to semantic `<section>`, `<header>`, `<form>`, `<fieldset>`, `<legend>`, `<footer>`
   - Added `role="group"` and `aria-label` to selector containers
   - Added `aria-pressed` to toggle buttons
   - Added `type="button"` to prevent form submission
   - Added `tabIndex={0}` for keyboard navigation
   - Added `:focus-visible` styles for keyboard users
   - Added proper TypeScript types to event handlers
   - Added `aria-describedby` for checkbox info icon
7. **Production ready** - Removed all console.log statements for production builds

### Code Quality Improvements
1. **No magic numbers** - All hardcoded values extracted to named constants with clear explanations
2. **Explicit typing** - All functions, parameters, and variables have explicit TypeScript types
3. **Comprehensive documentation** - JSDoc comments added to all functions, components, and complex logic
4. **Type safety** - Removed all implicit `any` types and type casting where possible
5. **Error handling** - Added null checks (e.g., root element validation in main.tsx)
6. **Folder-based components** - Clean component structure with co-located tests, styles, and services
7. **Separated concerns** - Constants and services extracted to dedicated files for reusability

### Test Coverage
- **37 test cases** covering all components and services
- **71.57% code coverage** (statements)
- **86.79% branch coverage**
- Tests for calculation logic, component rendering, user interactions, and accessibility

### Development Environment
1. **Yarn PnP TypeScript SDK** - Configured TypeScript SDK for proper type resolution in IDE with Yarn PnP
2. **Prettier** - Code formatting configured with consistent style rules
3. **ESLint** - Linting rules for React and TypeScript
4. **GitHub Actions** - CI/CD pipeline that runs on PR creation:
   - ESLint checks
   - Prettier format validation
   - TypeScript type checking
   - Unit tests with coverage
   - Production build verification
   - Dependency vulnerability scanning (Trivy)
   - Secret scanning (GitGuardian, Gitleaks)
5. **GitHub Templates** - PR template, issue templates, contributing guidelines, and code owners
6. **Git Configuration** - .gitignore for proper file exclusion, .gitleaks.toml for secret scanning rules