import globals from "globals";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detects the React version from package.json
      },
    },
  },

  pluginReact.configs.flat.recommended,

  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "error",
      "no-console": ["warn", { allow: ["warn", "error", "log"] }],
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
    },
  },
]);
