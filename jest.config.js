module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
    testEnvironment: "jsdom",
    testRegex: "./*\\.(test|spec)\\.tsx?$",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/jest/fileMock.js",
        "\\.(css|less)$": "<rootDir>/jest/styleMock.js",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleFileExtensions: ["js", "ts", "tsx", "json"],
};
