
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // schema: "http://localhost:9009/graphql/v1",
  schema: "src/schema/schema.json",
  documents: "src/schema/**/*.graphql",
  generates: {
    "src/schema/generated.ts": {
      // preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ]
    },
    "src/schema/schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
