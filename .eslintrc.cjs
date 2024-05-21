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
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["sort-keys", "sort-destructure-keys", "import", "react-refresh"],
  rules: {
    "import/prefer-default-export": 0, // отключить предпочтение импорта не по дефолту если в файле один экспорт
    "import/extensions": 0, // отключить проверку расширений импорта ( без расширения файлов)
    "react/function-component-definition": 0, //
    "react/prop-types": "off", // отключить проверку пропсов в функциональных компонентах
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn", // правило предупреждения о неправильных зависимостях в хуках
    "react/jsx-no-target-blank": "off", // отключить проверку наличия target="_blank" в ссылках
    "eslint no-const-assign": "off",
    "sort-keys/sort-keys-fix": 1, // Сортировка свойств объектов в алфавитном порядке (asc)
    "sort-destructure-keys/sort-destructure-keys": 2, // Сортировка параметров деструктуризации в алфавитном порядке (asc)
    "react/jsx-fragments": 0, // Разрешает использовать JSX фрагменты вместо `<div>`
    "sort-keys/sort-keys-fix": 1, // Сортировка свойств объектов в алфавитном порядке (asc)
    "sort-destructure-keys/sort-destructure-keys": 2, // Сортировка параметров деструктуризации в алфавитном порядке (asc)
    "react/jsx-props-no-spreading": 0, // Разрешает передавать пропсы в JSX без spread оператора
    "react/button-has-type": 0, // Разрешает `<button>` без указания типа (button или submit)
    "react-refresh/only-export-components": "warn", // Предупреждать, если компонент не экспортирован в корневом модуле,
    //  " pathGroupsExcludedImportTypes": ["error","react"], // Разделение импортов по группам  важно было обавить "error"
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "import/no-unresolved": 0, // Разрешает неопределенные импорты( пример: "import { foo } from 'foo'")
    "import/order": [
      // Порядок импортов
      1, //
      {
        alphabetize: {
          // Сортировка импортов в алфавитном порядке
          caseInsensitive: true, // Игнорировать регистр
          order: "asc", // Сортировка в алфавитном порядке
        },
        pathGroupsExcludedImportTypes: ["error", "react"],
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always", // Новые строки между импортами
        pathGroups: [
          // Группировка импортов
          {
            group: "external",
            pattern: "react",
            position: "before",
          },
          {
            group: "external",
            pattern: "react-dom",
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
