import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin';
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    globalIgnores(["**/node_modules/**", "**/.next/**"]),
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
        plugins: {
            '@stylistic': stylistic,
            js,
            import: importPlugin,
            "jsx-a11y": jsxA11y,
            "@tanstack/query": tanstackQuery,
            "@next/next": nextPlugin,
        },

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            "@stylistic/camelcase": "off",
            "no-unused-vars": "off",
            "import/prefer-default-export": "off",
            "react/jsx-filename-extension": "off",
            "react/jsx-props-no-spreading": "off",
            "react/no-unused-prop-types": "off",
            "react/no-unescaped-entities": "off",
            "react/require-default-props": "off",
            "@tanstack/query/exhaustive-deps": "off",
            "@stylistic/ban-ts-comment": "off",
            "@stylistic/explicit-function-return-type": "off",
            "@stylistic/explicit-module-boundary-types": "off",
            "no-use-before-define": "warn",
            "@stylistic/no-explicit-any": "off",
            "@stylistic/no-var-requires": "off",
            "@stylistic/no-namespace": "off",
            "no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^_",
                },
            ],
            "@stylistic/quotes": [
                "error",
                "backtick",
                {
                    avoidEscape: true,
                },
            ],
            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    ts: "never",
                    tsx: "never",
                    js: "never",
                    jsx: "never",
                },
            ],
            "jsx-a11y/anchor-is-valid": [
                "error",
                {
                    components: ["Link"],
                    specialLink: ["hrefLeft", "hrefRight"],
                    aspects: ["invalidHref", "preferButton"],
                },
            ],
            "jsx-a11y/media-has-caption": "off",
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling"],
                        "object",
                        "type",
                        "index",
                    ],
                    pathGroups: [
                        {
                            pattern: "{react,react-dom/**}",
                            group: "external",
                            position: "before",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["react"],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
    eslintConfigPrettier
]);
