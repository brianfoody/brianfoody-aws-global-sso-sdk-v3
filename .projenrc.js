const { typescript } = require("projen");

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "brianfoody-aws-global-sso-sdk-v3",
  releaseToNpm: true,
  majorVersion: 1,
  tsconfig: {
    compilerOptions: {
      strictPropertyInitialization: false,
      noUnusedLocals: false,
      lib: ["es2019", "dom"],
    },
  },
  eslintOptions: {
    prettier: true,
  },
  prettierOptions: {},
  jestOptions: {
    jestConfig: {},
  },
  scripts: {
    integration: "npx jest -c jest.integration.js --runInBand",
  },
  devDeps: ["open"],
  deps: ["@aws-sdk/client-sso", "aws-sdk", "brianfoody-aws-sso-sdk-v3", "yaml"],
});

project.synth();
