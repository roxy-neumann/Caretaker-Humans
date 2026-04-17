# Caretaker Items Helper

A small static helper site for item planning in **The Last Caretaker**. The app presents searchable, sortable reference tables for human-related food and memory items, including stats, rarity, item images, food recipes, and aggregate food material requirements.

The project is intentionally simple: it uses plain HTML, CSS, and JavaScript with local image assets. There is no build step, package manager, framework, database, or backend service.

## Features

- Food table with item image, name, rarity, stat values, and recipe access.
- Memory table with item image, name, rarity, and memory stat matrix.
- Text search for food and memory names.
- Per-stat minimum filters directly in table headers.
- Required-stat filters for memories, so you can show only memories that actually provide a selected stat.
- Clickable sortable columns.
- Multi-column sorting for food with `Shift` + click, up to three columns.
- Image preview modal for item artwork.
- Recipe modal for each food item.
- Food materials summary modal showing:
  - total materials needed to craft one of every food type,
  - the organic source associated with each material,
  - an organic-focused view grouped by organic item.
- Fully local static files, suitable for opening directly in a browser or hosting on any static file server.

No Node.js, npm install, bundling, or server setup is required for normal use.

## How To Use The App

### Searching

Use the search box in the **Food** or **Memories** section to filter by item name.

Examples:

- Type `boost` to find food items with "boost" in the name.
- Type `map` to find memory items such as "Maps".

The result count updates automatically.

### Clearing Filters

Click **Clear Filters** in a section to reset:

- search text,
- minimum stat filters,
- required stat checkboxes,
- active sorting.

Each section clears independently.

### Sorting

Click a sortable column header to cycle through:

1. descending sort,
2. ascending sort,
3. no sort.

Sortable columns include names, rarities, and numeric stat columns.

Food supports multi-column sorting:

- Click a column to sort by that column.
- `Shift` + click another column to add it to the combined sort.
- Up to three food columns can be sorted together.
- Sort order numbers appear in the header when multiple food sorts are active.

Memories use single-column sorting.

### Minimum Stat Filters

Each stat header has a small `min` input.

Entering a number filters the table to only items with that stat value or higher.

Examples:

- In Food, enter `10` under `Strength` to show foods with at least 10 strength.
- In Memories, enter `5` under `Logic` to show memories with at least 5 logic.

### Required Memory Stats

Memory stat headers include a checkbox next to the minimum input.

Check the box to require that stat to exist on the memory item. This is useful because missing stats are treated as zero for numeric comparisons, but the checkbox lets you distinguish "has this stat" from "does not have this stat."

### Image Preview

Click an item image to open a larger preview.

Close the image modal by:

- clicking `x`,
- clicking outside the preview,
- pressing `Escape`.

### Food Recipes

Click the **Recipe** button on a food row to view the materials required for that food.

The recipe modal lists:

- material image,
- material name,
- required quantity,
- associated organic source.

### Food Materials Summary

Click the **Recipe** button in the food table header to open the food materials summary.

The summary has two views:

- **By Material**: total amount of each material needed to craft one of every food type.
- **By Organic**: organic items and the material totals associated with each organic source.

## Data Model

The app uses global constants from the data files. Because the scripts are loaded directly in the browser, the load order in `index.html` matters:

```html
<script src="data-food.js"></script>
<script src="data-memory.js"></script>
<script src="data-organic.js"></script>
<script src="app.js"></script>
```

`app.js` expects the data constants from the first three files to already exist.

### Food Data

Food data lives in `data-food.js`.

Main constants:

- `foodMaterials`: material IDs and names.
- `foods`: food item records.
- `statOptions`: food stats used for filters.
- `columns`: food table columns.

Food item shape:

```js
{
  id: 1,
  name: "Bone-Fortify",
  rarity: "Uncommon",
  stats: [
    { name: "height", value: 8 },
    { name: "weight", value: 2 },
    { name: "strength", value: 14 },
    { name: "intellect", value: 2 },
    { name: "life", value: 2 }
  ],
  recipe: [
    { materialId: 5, quantity: 3 },
    { materialId: 4, quantity: 10 },
    { materialId: 6, quantity: 2 }
  ]
}
```

### Memory Data

Memory data lives in `data-memory.js`.

Main constants:

- `memories`: memory item records.
- `memoryStatOptions`: memory stats used to generate stat columns.

Memory item shape:

```js
{
  id: 1,
  name: "Assembly Instructions",
  rarity: "Uncommon",
  stats: [
    { name: "Discipline", value: 2 },
    { name: "Logic", value: 8 }
  ]
}
```

### Organic Data

Organic data lives in `data-organic.js`.

Main constants:

- `organics`: organic source records.
- `organicColumns`: available column definition for organic data.

Organic item shape:

```js
{
  id: 1,
  name: "Bio Seaweed",
  weight: 0.1,
  materials: [3, 2],
  sources: ["The Boat's Net", "Cocoon"]
}
```

The `materials` array links organic items to food material IDs from `foodMaterials`.
