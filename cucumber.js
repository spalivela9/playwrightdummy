module.exports = {
  default: {
    require: ["step-definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "html:cucumber-report.html"],
    formatOptions: {
      snippetInterface: "async-await"
    },
    parallel: 1
  }
};
