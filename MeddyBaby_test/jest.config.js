module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      "^.+\\.(css|less|scss|sass)$": "jest-transform-stub"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub"
    },
    testEnvironment: "jest-environment-jsdom"
  };