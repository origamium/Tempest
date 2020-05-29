module.exports = {
    preset: "jest-puppeteer",
    rootDir: "../../",
    roots: ["<rootDir>/src"],
    testRegex: "./*\\.(test|spec).visual\\.tsx?$",
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/jest/fileMock.js",
        "\\.(css|less)$": "<rootDir>/jest/styleMock.js"
    },
    setupFilesAfterEnv: ["./jest/integration/setupTests.js"],
    moduleFileExtensions: ["js", "ts", "tsx", "json"]
};
