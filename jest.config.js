module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
      resetMocks: true
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest'
  },
  testMatch: [
    '**/*.spec.(ts|js)'
  ],
  testEnvironment: 'node',
  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}'
  ],
   setupFiles: ['<rootDir>/jest.setup.ts'],
};
