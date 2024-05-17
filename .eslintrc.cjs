module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
    "prettier/react",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["sort-keys", "sort-destructure-keys", "import", "react-refresh"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-no-target-blank": "off",
    "eslint no-const-assign": "error",
    "sort-keys/sort-keys-fix": 1,
    "sort-destructure-keys/sort-destructure-keys": 2,
    "react/jsx-fragments": 0, // Разрешает использовать JSX фрагменты вместо `<div>`
    "sort-keys/sort-keys-fix": 1, // Сортировка свойств объектов в алфавитном порядке (asc)
    "sort-destructure-keys/sort-destructure-keys": 2, // Сортировка параметров деструктуризации в алфавитном порядке (asc)
    "react/jsx-props-no-spreading": 0, // Разрешает передавать пропсы в JSX без spread оператора
    "react/button-has-type": 0, // Разрешает `<button>` без указания типа (button или submit)
    "react-refresh/only-export-components": "warn", // Предупреждать, если компонент не экспортирован в корневом модуле,
    pathGroupsExcludedImportTypes: ["react"], // Разделение импортов по группам
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/order": [
      1,
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        pathGroupsExcludedImportTypes: ["react"],
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",

        pathGroups: [
          {
            group: "external",
            pattern: "react",
            position: "before",
          },
          {
            group: "internal",
            pattern: "assets/**",
            position: "after",
          },
          {
            group: "internal",
            pattern: "components/**",
            position: "after",
          },
          {
            group: "internal",
            pattern: "store",
            position: "after",
          },
          {
            group: "internal",
            pattern: "store/**",
            position: "after",
          },
          {
            group: "internal",
            pattern: "ui/**",
            position: "after",
          },
        ],
      },
    ],
  },
};
