module.exports = {
  default: {
    import: ["./tests/steps/**/*.js", "./tests/support/**/*.js"],
    paths: ["./features/**/*.feature"],
    publishQuiet: true,
    format: ["progress", "html:reports/cucumber.html"],
    parallel: 1,
    worldParameters: {
      baseURL: process.env.BASE_URL || "http://localhost:5173"
    }
  }
};
