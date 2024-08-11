module.exports = {
  // Other Jest configurations...
  moduleNameMapper: {
    "^@(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
