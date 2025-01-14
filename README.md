# Cocktail Assistant

Build a tiny app that helps you gather a shopping list for multiple cocktails.

## UI Mockup

This is only a mockup, feel free to change layout and colors.

```
           ┌───────────────────────────────────────────────────────────────┬──────┐
           │ Margarita                                                     │Search│
           └───────────────────────────────────────────────────────────────┴──────┘

┌─────────────────────────────────────────────────────────────┐ ┌──────────────────────────────┐
│                                                             │ │                              │
│ ┌────────────┐  ────────────────────────────────────        │ │ Shopping List                │
│ │            │                                              │ │ ──────────────────────────── │
│ │            │  ───────────────                             │ │                              │
│ │            │                                              │ │  ─────────────────           │
│ │            │  ───────────────                             │ │                              │
│ │            │                                        ┌───┐ │ │  ─────────────────           │
│ │            │  ───────────────                       │ + │ │ │                              │
│ └────────────┘                                        └───┘ │ │  ─────────────────           │
│                                                             │ │                              │
└─────────────────────────────────────────────────────────────┘ │                              │
                                                                │                              │
                                                                │                              │
┌─────────────────────────────────────────────────────────────┐ │                              │
│                                                             │ │                              │
│ ┌────────────┐  ────────────────────────────────────        │ │                              │
│ │            │                                              │ │                              │
│ │            │  ───────────────                             │ │                              │
│ │            │                                              │ │                              │
│ │            │  ───────────────                             │ │                              │
│ │            │                                        ┌───┐ │ │                              │
│ │            │  ───────────────                       │ + │ │ │                              │
│ └────────────┘                                        └───┘ │ │                              │
│                                                             │ │                              │
└─────────────────────────────────────────────────────────────┘ └──────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                                                             │
│ ┌────────────┐  ────────────────────────────────────        │
│ │            │                                              │
│ │            │  ───────────────                             │
│ │            │                                              │
│ │            │  ───────────────                             │
│ │            │                                        ┌───┐ │      ┌─────────────────────────┐
│ │            │  ───────────────                       │ + │ │      │        Searching...     │
│ └────────────┘                                        └───┘ │      │                         │
│                                                             │      └─────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

## Features

- _search input_ with query submit button
- _query results listing_ with thumbnail, name, instructions and "add to
  shopping list" button for each
- _shopping list_ that collects all of the ingredients for the cocktails
  that the user adds
- _toaster_ that displays various messages: "Searching...", "Here are the
  results.", "No results found.", "Ingredients added to shopping list.",
  "Ingredient removed from shopping list."

NOTE: the shopping list deduplicates the items (if two cocktails contain
Tequila, you only need to buy a single bottle of Tequila)

## Requirements

- cocktails are fetched using TheCocktailDB`s open API:
  https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
- fetch queries are made using the native fetch api:
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- you have to use the haunted hooks library:
  https://github.com/matthewp/haunted
- the only UI libraries allowed are haunted and lit-html
- the code should be written in JavaScript or Typescript
- the app can be started locally by running these commands:
  `npm install` and `npm start`

### About haunted

Haunted is a library inspired by [React hooks](https://reactjs.org/docs/hooks-intro.html).
It enables you to create native web components using hooks and lit-html.
At Neovici we use it extensively, so familiarity with it is very important.

## submitting

Submit the whole project (without node_modules) as a zipped folder.
