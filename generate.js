// generate.js

require("v8").setFlagsFromString("--stack-trace-limit=1000");
const { generate } = require("@graphql-codegen/cli");

async function run() {
  try {
    await generate(
      {
        schema: "http://localhost:3000/graphql",
        documents: "src/**/*.graphql",
        generates: {
          "src/generated/graphqlTypes.ts": {
            plugins: [
              "typescript",
              "typescript-operations",
              "typescript-apollo-angular",
            ],
          },
        },
      },
      true
    );
  } catch (e) {
    console.error("Error during code generation:", e);
    process.exit(1);
  }
}

run();
