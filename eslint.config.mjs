import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["werkzeuge/**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Kompilierte Anwendung und unveränderte Teile des Original-Quiz-Frontends.
    "public/demos/wartungsportal/**",
    "public/demos/quiz/js/**",
    "public/demos/jobpilot/**",
    ".demo-nachweise/**",
  ]),
]);

export default eslintConfig;
