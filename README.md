# A Chau - Vietnamese Restaurant Website

A modern, responsive website for "A Chau" Vietnamese restaurant built with Angular 20 and featuring Vietnamese-inspired cuisine tailored for local tastes.

## 🍜 About

A Chau showcases Vietnamese-inspired cuisine with a modern web experience. The website features:

- **Unique Menu Display**: Interactive menu with Vietnamese-inspired dishes and descriptions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Architecture**: Built with Angular 20 standalone components and signals
- **Smooth Navigation**: Clean header with hamburger menu for mobile devices
- **Performance Focused**: Optimized for speed and user experience

## 🚀 Technologies

- **Angular 20** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe development
- **SCSS** - Modern CSS preprocessing
- **Angular Signals** - Reactive state management
- **Angular Router** - Client-side navigation
- **ESLint** - Code quality and linting
- **Karma + Jasmine** - Unit testing framework
- **Husky** - Git hooks for code quality

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/DamianStachowicz/a-chau.git
cd a-chau
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm start
```

The application will be available at `http://localhost:4200/`

## 🛠️ Development Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm start`             | Start development server       |
| `npm run build`         | Build for production           |
| `npm test`              | Run unit tests                 |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint`          | Run ESLint code analysis       |
| `npm run format`        | Format code with Prettier      |

## 🧪 Testing

The project includes comprehensive unit tests with 80% coverage requirement:

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Open coverage report
npm run coverage:open
```

**Coverage Requirements:**

- Statements: ≥80%
- Branches: ≥80%
- Functions: ≥80%
- Lines: ≥80%

## 🏗️ Project Structure

```text
src/
├── app/                    # Main application module
├── components/             # Feature components
│   ├── header/            # Navigation header
│   ├── home/              # Landing page
│   ├── menu/              # Menu display
│   └── footer/            # Site footer
├── services/              # Angular services
├── ui/                    # Reusable UI components
└── assets/                # Static assets
```

## 🔧 Code Quality

The project enforces high code quality standards:

- **Pre-commit hooks**: Automatic formatting and linting
- **Pre-push hooks**: Test execution and coverage validation
- **ESLint configuration**: Modern TypeScript and Angular rules
- **Prettier integration**: Consistent code formatting

## 🔗 Links

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
