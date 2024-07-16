import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/jest.mock.css.ts'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Collect coverage from all TypeScript files in the src directory
    '!src/**/*.d.ts', // Exclude type definition files
    '!src/**/index.ts', // Exclude index files if needed
    '!src/**/*.stories.tsx', // Exclude storybook files if any
    '!src/**/__tests__/**', // Exclude test files
    '!src/**/tests/**', // Exclude test-related directories
  ],
  testEnvironment: 'jsdom',
};

export default config;
