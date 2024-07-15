# Beartracks App

Beartracks App is a comprehensive React application designed to showcase various features and integrations for a 
fictional web application. Built with React, Redux and Tailwind CSS, the goal of this project is to demonstrate 
how to create a dynamic web application using modern serverless cloud technologies. It is inspired by the [United States
National Parks](https://nps.gov/index.htm)

View the **[Swagger API docs](https://www.nps.gov/subjects/developer/api-documentation.htm)** here.

This application covers a number of techniques including:
- Functional component design
- Usage of React hooks
- Custom hooks
- Performance optimizations including :
    - throttling techniques, 
    - useCallback and useMemo.
    - lazy loading with Suspense
- Redux integration
- Redux Toolkit using `createSlice` and `createApi`
- Custom Contexts
- Utility first CSS

## Installing the project
```bash
# Clone the project
$ git clone https://github.com/GreggSetzer/beartracks-app.git

# Install dependencies
$ npm install

# Test project
$ npm test

# Build project
$ npm build
```

### Tools and Technologies

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces, ensuring efficient updates and rendering of components.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development, allowing for a highly customizable and responsive design.
- **[TypeScript](https://www.typescriptlang.org/)**: A statically typed superset of JavaScript, providing type safety and better development tooling.
- **[Jest](https://jestjs.io/)**: A delightful JavaScript testing framework with a focus on simplicity, used here for unit testing the components.
- **[Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: A set of utilities for testing React components, promoting best practices by testing the components from the user's perspective.
- **[ESLint](https://eslint.org/)**: A tool for identifying and fixing problems in JavaScript code, integrated with TypeScript support to maintain code quality.
- **[Prettier](https://prettier.io/)**: An opinionated code formatter, ensuring a consistent code style across the project.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: The official, opinionated, batteries-included toolset for efficient Redux development

### Project Structure

The project is organized as follows:

- **src/app**: Contains the Redux specific logic.
- **src/common/**: Contains common components, contexts, hooks, and types.
- **src/features**: Contains the page components organized by feature.
