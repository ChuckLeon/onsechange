# Agents

## Basic info

This project uses a basic React development workflow.
Below are some baseline agent-like tips, conventions, and roles for React developers contributing to this codebase.

## Responsibilities

- Write clean, simple React components using function components and hooks.
- Maintain a clear component structure and avoid deeply nested JSX.
- Use prop-types or TypeScript for type safety.
- Separate logic, style, and markup for better maintainability.
- Use descriptive variable and function names.
- Keep code DRY (Don't Repeat Yourself).
- Try to avoid `useEffect` as much as possible
- Comment when it is absolutely necessary, otherwise, don't

## React Guidelines

### Component Structure

- Use function components and React hooks.
- Use `.tsx` extensions for React components.
- Keep each component in its own file when practical.
- Avoid unnecessary dependencies.
- Ensure UI and logic is accessible and responsive.

### Code Style

- Use ES6+ syntax (const/let, arrow functions, destructuring, etc).
- Always lint and format your code (Prettier, ESLint).
- Always prioritize wrapping functions and variables in components with `useCallback` or `useMemo`
- Don't use "React." directly - import the component needed

## SCSS Guidelines

### Styling Standards

- Don't use comments in SCSS files
- Follow BEM (Block Element Modifier) standards
- Use helper classes and CSS variables from helpers.scss, colors.scss, spacing.scss
- Use HEX values for colors
- **Do not use Tailwind CSS** - use SCSS instead

### File Organization

- Keep component styles in separate `.scss` files alongside components
- Use the existing styling system and variables

## Example Agent Task

- Build a Button component that accepts children, `onClick`, and `variant` props, with simple styling. Provide an example usage in a story or demo component.

## Onboarding

- Install dependencies using `npm install`.
- Use `npm run dev`, or equivalent to run the development environment.
- Review existing components in the `/components` directory.
- Ask in the team channel if unsure about patterns or need a review.
