module.exports = {
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
  };
  