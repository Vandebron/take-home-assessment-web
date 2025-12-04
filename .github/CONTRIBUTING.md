# Contributing to React Example

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- Yarn 4.x (Corepack enabled)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-example.git
   cd react-example
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the App

```bash
cd web/react-example
yarn dev
```

The app will be available at http://localhost:5173

### Running Tests

```bash
# Run tests once
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test
```

### Code Quality

Before committing, ensure your code passes all checks:

```bash
# Format code
yarn format

# Check formatting
yarn format:check

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Type check
yarn typecheck

# Build
yarn build
```

## Coding Standards

### TypeScript

- Use explicit types for all function parameters and return values
- Avoid using `any` types
- Use `const` for immutable values
- Use meaningful variable and function names

### Components

- Use folder-based component structure:
  ```
  ComponentName/
  ├── ComponentName.tsx
  ├── ComponentName.module.css
  ├── ComponentName.test.tsx
  ├── ComponentName.service.ts (if needed)
  └── index.ts
  ```
- Write JSDoc comments for complex logic
- Add `aria-*` attributes for accessibility
- Use semantic HTML elements

### Testing

- Write tests for all new features and bug fixes
- Aim for >70% code coverage
- Test user interactions, not implementation details
- Use meaningful test descriptions

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Maintenance tasks

Examples:
```
feat: add solar panel consumption calculator
fix: correct residents selector off-by-one error
docs: update README with new component structure
```

## Pull Request Process

1. **Create a PR** using the provided template
2. **Fill in all sections** of the PR template
3. **Ensure all checks pass**:
   - ESLint
   - Prettier
   - TypeScript
   - Tests
   - Build
4. **Request review** from maintainers
5. **Address feedback** and make necessary changes
6. **Squash commits** if needed before merging

### PR Guidelines

- Keep PRs focused and small when possible
- Include tests for new features
- Update documentation if needed
- Add screenshots for UI changes
- Reference related issues

## Code Review

### For Contributors

- Be open to feedback
- Respond to comments promptly
- Make requested changes or explain why you disagree
- Keep discussions professional and constructive

### For Reviewers

- Be respectful and constructive
- Explain the reasoning behind suggestions
- Approve when changes meet standards
- Check for:
  - Code correctness
  - Test coverage
  - Documentation
  - Performance implications
  - Security considerations

## Project Structure

```
react-example/
├── .github/
│   ├── workflows/
│   │   └── pr-checks.yml
│   ├── pull_request_template.md
│   └── CONTRIBUTING.md
├── web/
│   └── react-example/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ComponentName/
│       │   │   │   ├── ComponentName.tsx
│       │   │   │   ├── ComponentName.test.tsx
│       │   │   │   ├── ComponentName.module.css
│       │   │   │   └── index.ts
│       │   │   └── constants.ts
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── package.json
│       ├── vite.config.ts
│       └── vitest.config.ts
└── README.md
```

## Questions?

If you have questions, please:
1. Check existing issues and PRs
2. Review the documentation
3. Ask in PR comments
4. Open a new issue if needed

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉

