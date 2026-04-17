const foodMaterials = [
  { id: 1, name: "Fat" },
  { id: 2, name: "Protein" },
  { id: 3, name: "Carbohydrate" },
  { id: 4, name: "Calcium" },
  { id: 5, name: "Vitamin D" },
  { id: 6, name: "Omega-3" },
  { id: 7, name: "Nanite Nutrient" },
  { id: 8, name: "Mitochondrial Amplifier" },
  { id: 9, name: "Bioregulator" }
];

const foods = [
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
  },
  {
    id: 2,
    name: "Endura-Growth",
    rarity: "Uncommon",
    stats: [
      { name: "height", value: 2 },
      { name: "weight", value: 2 },
      { name: "strength", value: 2 },
      { name: "intellect", value: 12 },
      { name: "life", value: 8 }
    ],
    recipe: [
      { materialId: 5, quantity: 4 },
      { materialId: 4, quantity: 3 },
      { materialId: 6, quantity: 4 }
    ]
  },
  {
    id: 3,
    name: "High-Fat",
    rarity: "Common",
    stats: [
      { name: "height", value: 1 },
      { name: "weight", value: 8 },
      { name: "strength", value: 1 },
      { name: "intellect", value: 1 },
      { name: "life", value: 1 }
    ],
    recipe: [
      { materialId: 1, quantity: 8 },
      { materialId: 2, quantity: 5 },
      { materialId: 3, quantity: 5 }
    ]
  },
  {
    id: 4,
    name: "Hyper-Evolution",
    rarity: "Rare",
    stats: [
      { name: "height", value: 30 },
      { name: "weight", value: 3 },
      { name: "strength", value: 3 },
      { name: "intellect", value: 20 },
      { name: "life", value: 5 }
    ],
    recipe: [
      { materialId: 9, quantity: 1 },
      { materialId: 7, quantity: 3 },
      { materialId: 8, quantity: 1 }
    ]
  },
  {
    id: 5,
    name: "Immune Boost",
    rarity: "Uncommon",
    stats: [
      { name: "height", value: 6 },
      { name: "weight", value: 6 },
      { name: "strength", value: 6 },
      { name: "intellect", value: 6 },
      { name: "life", value: 6 }
    ],
    recipe: [
      { materialId: 1, quantity: 1 },
      { materialId: 5, quantity: 3 },
      { materialId: 2, quantity: 2 },
      { materialId: 4, quantity: 3 },
      { materialId: 3, quantity: 3 },
      { materialId: 6, quantity: 3 }
    ]
  },
  {
    id: 6,
    name: "Mind Surge",
    rarity: "Common",
    stats: [
      { name: "height", value: 1 },
      { name: "weight", value: 1 },
      { name: "strength", value: 1 },
      { name: "intellect", value: 6 },
      { name: "life", value: 6 }
    ],
    recipe: [
      { materialId: 1, quantity: 2 },
      { materialId: 2, quantity: 10 },
      { materialId: 3, quantity: 1 }
    ]
  },
  {
    id: 7,
    name: "Mitochondrial Surge",
    rarity: "Rare",
    stats: [
      { name: "height", value: 20 },
      { name: "weight", value: 3 },
      { name: "strength", value: 28 },
      { name: "intellect", value: 3 },
      { name: "life", value: 12 }
    ],
    recipe: [
      { materialId: 7, quantity: 2 },
      { materialId: 8, quantity: 2 },
      { materialId: 9, quantity: 2 }
    ]
  },
  {
    id: 8,
    name: "Muscle Fortification",
    rarity: "Uncommon",
    stats: [
      { name: "height", value: 2 },
      { name: "weight", value: 8 },
      { name: "strength", value: 15 },
      { name: "intellect", value: 2 },
      { name: "life", value: 2 }
    ],
    recipe: [
      { materialId: 4, quantity: 1 },
      { materialId: 5, quantity: 12 },
      { materialId: 6, quantity: 2 }
    ]
  },
  {
    id: 9,
    name: "Nanite Infusion",
    rarity: "Rare",
    stats: [
      { name: "height", value: 25 },
      { name: "weight", value: 3 },
      { name: "strength", value: 3 },
      { name: "intellect", value: 25 },
      { name: "life", value: 6 }
    ],
    recipe: [
      { materialId: 1, quantity: 1 },
      { materialId: 4, quantity: 1 },
      { materialId: 7, quantity: 4 }
    ]
  },
  {
    id: 10,
    name: "Neuro-Boost",
    rarity: "Uncommon",
    stats: [
      { name: "height", value: 2 },
      { name: "weight", value: 2 },
      { name: "strength", value: 2 },
      { name: "intellect", value: 15 },
      { name: "life", value: 10 }
    ],
    recipe: [
      { materialId: 4, quantity: 3 },
      { materialId: 5, quantity: 3 },
      { materialId: 6, quantity: 10 }
    ]
  },
  {
    id: 11,
    name: "Nutri-Core",
    rarity: "Common",
    stats: [
      { name: "height", value: 3 },
      { name: "weight", value: 3 },
      { name: "strength", value: 3 },
      { name: "intellect", value: 3 },
      { name: "life", value: 3 }
    ],
    recipe: [
      { materialId: 1, quantity: 3 },
      { materialId: 2, quantity: 3 },
      { materialId: 3, quantity: 3 }
    ]
  },
  {
    id: 12,
    name: "Physique Fuel",
    rarity: "Common",
    stats: [
      { name: "height", value: 5 },
      { name: "weight", value: 1 },
      { name: "strength", value: 5 },
      { name: "intellect", value: 1 },
      { name: "life", value: 1 }
    ],
    recipe: [
      { materialId: 1, quantity: 2 },
      { materialId: 2, quantity: 4 },
      { materialId: 3, quantity: 2 }
    ]
  },
  {
    id: 13,
    name: "Ultimate Genesis",
    rarity: "Rare",
    stats: [
      { name: "height", value: 50 },
      { name: "weight", value: 10 },
      { name: "strength", value: 10 },
      { name: "intellect", value: 50 },
      { name: "life", value: 40 }
    ],
    recipe: [
      { materialId: 9, quantity: 1 },
      { materialId: 7, quantity: 1 },
      { materialId: 8, quantity: 5 }
    ]
  }
];

const statOptions = [
  "height",
  "weight",
  "strength",
  "intellect",
  "life"
];

const columns = [
  { key: "picture", label: "", type: "image", sortable: false },
  { key: "name", label: "Name", type: "string", sortable: true },
  { key: "rarity", label: "Rarity", type: "rarity", sortable: true },
  { key: "height", label: "Height", type: "number", sortable: true },
  { key: "weight", label: "Weight", type: "number", sortable: true },
  { key: "strength", label: "Strength", type: "number", sortable: true },
  { key: "intellect", label: "Intellect", type: "number", sortable: true },
  { key: "life", label: "Life", type: "number", sortable: true },
  { key: "recipe", label: "Recipe", type: "recipe", sortable: false }
];
