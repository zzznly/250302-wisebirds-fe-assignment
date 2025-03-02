# [zzznly] React + TS + Vite Boilerplate

This project is a boilerplate setup using React, TypeScript, and Vite. It includes essential configurations and dependencies to help you get started quickly.

## Project Metadata

- **Name**: zzznly-react-ts-vite
- **Version**: 0.1.0
- **Private**: true
- **Type**: module

## Scripts

- **dev**: Starts the development server using Vite.
- **build**: Compiles TypeScript and builds the project using Vite.
- **lint**: Runs ESLint to check for code quality issues.
- **preview**: Previews the production build using Vite.
- **format**: Formats the code using Prettier.

## Dependencies

- **react**: A core library for building user interfaces.
- **react-dom**: Provides DOM-specific methods for React.
- **react-router-dom**: Enables routing in React applications.

## Development Dependencies

- **@types/react**, **@types/react-dom**: TypeScript type definitions for React.
- **@typescript-eslint/eslint-plugin**, **@typescript-eslint/parser**: ESLint plugin and parser for TypeScript.
- **@vitejs/plugin-react-swc**: Vite plugin for React with SWC support.
- **eslint**: A linter for identifying and fixing code issues.
- **eslint-plugin-react-hooks**, **eslint-plugin-react-refresh**: ESLint plugins for React hooks and refresh.
- **prettier**: A code formatter to ensure consistent style.
- **typescript**: TypeScript language support.
- **vite**: A build tool for modern web projects.
- **vite-tsconfig-paths**: A Vite plugin to support TypeScript path mapping.

## Package Manager

- **yarn@4.7.0**: Manages project dependencies and scripts.

## Install Dependencies & Run

To install the project dependencies, run the following command:

```bash
yarn
```

```bash
yarn dev
```
## Getting Started
### Install Dependencies

Open your terminal in the project directory and run:

```bash
yarn
```

### Run Development Server

Start the development server with:

```bash
yarn dev
```

### Additional Information
- **ESLint & Prettier:**
Configuration files for ESLint (.eslintrc.js) and Prettier (.prettierrc, .prettierignore) are included in the project root.
- **TypeScript Declarations:**
Global type declarations (e.g., for CSS modules) are provided in the appropriate .d.ts files.
- **Yarn Berry:**
This project uses Yarn Berry (v4.7.0) as the package manager. Please ensure Corepack is enabled on your system.