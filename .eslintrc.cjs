module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: [
    "prettier",
    "sort-keys",
    "sort-destructure-keys",
    "import",
    "react-refresh",
  ],
  rules: {
    "react/jsx-no-target-blank": "off",
    "newlines-between": "always",
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
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
    pathGroups: [
      {
        group: "external", // импорты сторонних библиотек (React и т.д.)
        pattern: "react",
        position: "before",
      },
      {
        group: "internal", // импорты из API (api/**)
        pattern: "api/**",
        position: "after",
      },
      {
        group: "internal", // импорты из доступных через public/assets (assets/**)
        pattern: "assets/**",
        position: "after",
      },
      {
        group: "internal", // импорты компонентов (components/**)
        pattern: "components/**",
        position: "after",
      },
      {
        group: "internal", // импорты вспомогательных функций (helpers/**)
        pattern: "helpers/**",
        position: "after",
      },
      {
        group: "internal", // импорт хранилища Redux (store)
        pattern: "store",
        position: "after",
      },
      {
        group: "internal", // импорт контекстов хранилища Redux (store/**)
        pattern: "store/**",
        position: "after",
      },
      {
        group: "internal", // импорт компонентов ui (ui/**)
        pattern: "ui/**",
        position: "after",
      },
    ],
  },
};
