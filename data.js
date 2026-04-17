const foodMaterials = [
  { id: 'fat', name: 'Fat' },
  { id: 'protein', name: 'Protein' },
  { id: 'carbohydrate', name: 'Carbohydrate' },
  { id: 'calcium', name: 'Calcium' },
  { id: 'vitaminD', name: 'Vitamin D' },
  { id: 'omega3', name: 'Omega-3' },
  { id: 'naniteNutrient', name: 'Nanite Nutrient' },
  { id: 'mitochondrialAmplifier', name: 'Mitochondrial Amplifier' },
  { id: 'bioregulator', name: 'Bioregulator' }
];

const foods = [
  {
    id: 1,
    name: 'Bone-Fortify',
    rarity: 'Uncommon',
    height: 8,
    weight: 2,
    strength: 14,
    intellect: 2,
    life: 2,
    recipe: [
      { materialId: 'vitaminD', quantity: 3 },
      { materialId: 'calcium', quantity: 10 },
      { materialId: 'omega3', quantity: 2 }
    ]
  },
  {
    id: 2,
    name: 'Endura-Growth',
    rarity: 'Uncommon',
    height: 2,
    weight: 2,
    strength: 2,
    intellect: 12,
    life: 8,
    recipe: [
      { materialId: 'vitaminD', quantity: 4 },
      { materialId: 'calcium', quantity: 3 },
      { materialId: 'omega3', quantity: 4 }
    ]
  },
  {
    id: 3,
    name: 'High-Fat',
    rarity: 'Common',
    height: 1,
    weight: 8,
    strength: 1,
    intellect: 1,
    life: 1,
    recipe: [
      { materialId: 'fat', quantity: 8 },
      { materialId: 'protein', quantity: 5 },
      { materialId: 'carbohydrate', quantity: 5 }
    ]
  },
  {
    id: 4,
    name: 'Hyper-Evolution',
    rarity: 'Rare',
    height: 30,
    weight: 3,
    strength: 3,
    intellect: 20,
    life: 5,
    recipe: [
      { materialId: 'bioregulator', quantity: 1 },
      { materialId: 'naniteNutrient', quantity: 3 },
      { materialId: 'mitochondrialAmplifier', quantity: 1 }
    ]
  },
  {
    id: 5,
    name: 'Immune Boost',
    rarity: 'Uncommon',
    height: 6,
    weight: 6,
    strength: 6,
    intellect: 6,
    life: 6,
    recipe: [
      { materialId: 'fat', quantity: 1 },
      { materialId: 'vitaminD', quantity: 3 },
      { materialId: 'protein', quantity: 2 },
      { materialId: 'calcium', quantity: 3 },
      { materialId: 'carbohydrate', quantity: 3 },
      { materialId: 'omega3', quantity: 3 }
    ]
  },
  {
    id: 6,
    name: 'Mind Surge',
    rarity: 'Common',
    height: 1,
    weight: 1,
    strength: 1,
    intellect: 6,
    life: 6,
    recipe: [
      { materialId: 'fat', quantity: 2 },
      { materialId: 'protein', quantity: 10 },
      { materialId: 'carbohydrate', quantity: 1 }
    ]
  },
  {
    id: 7,
    name: 'Mitochondrial Surge',
    rarity: 'Rare',
    height: 20,
    weight: 3,
    strength: 28,
    intellect: 3,
    life: 12,
    recipe: [
      { materialId: 'naniteNutrient', quantity: 2 },
      { materialId: 'mitochondrialAmplifier', quantity: 2 },
      { materialId: 'bioregulator', quantity: 2 }
    ]
  },
  {
    id: 8,
    name: 'Muscle Fortification',
    rarity: 'Uncommon',
    height: 2,
    weight: 8,
    strength: 15,
    intellect: 2,
    life: 2,
    recipe: [
      { materialId: 'calcium', quantity: 1 },
      { materialId: 'vitaminD', quantity: 12 },
      { materialId: 'omega3', quantity: 2 }
    ]
  },
  {
    id: 9,
    name: 'Nanite Infusion',
    rarity: 'Rare',
    height: 25,
    weight: 3,
    strength: 3,
    intellect: 25,
    life: 6,
    recipe: [
      { materialId: 'fat', quantity: 1 },
      { materialId: 'calcium', quantity: 1 },
      { materialId: 'naniteNutrient', quantity: 4 }
    ]
  },
  {
    id: 10,
    name: 'Neuro-Boost',
    rarity: 'Uncommon',
    height: 2,
    weight: 2,
    strength: 2,
    intellect: 15,
    life: 10,
    recipe: [
      { materialId: 'calcium', quantity: 3 },
      { materialId: 'vitaminD', quantity: 3 },
      { materialId: 'omega3', quantity: 10 }
    ]
  },
  {
    id: 11,
    name: 'Nutri-Core',
    rarity: 'Common',
    height: 3,
    weight: 3,
    strength: 3,
    intellect: 3,
    life: 3,
    recipe: [
      { materialId: 'fat', quantity: 3 },
      { materialId: 'protein', quantity: 3 },
      { materialId: 'carbohydrate', quantity: 3 }
    ]
  },
  {
    id: 12,
    name: 'Physique Fuel',
    rarity: 'Common',
    height: 5,
    weight: 1,
    strength: 5,
    intellect: 1,
    life: 1,
    recipe: [
      { materialId: 'fat', quantity: 2 },
      { materialId: 'protein', quantity: 4 },
      { materialId: 'carbohydrate', quantity: 2 }
    ]
  },
  {
    id: 13,
    name: 'Ultimate Genesis',
    rarity: 'Rare',
    height: 50,
    weight: 10,
    strength: 10,
    intellect: 50,
    life: 40,
    recipe: [
      { materialId: 'bioregulator', quantity: 1 },
      { materialId: 'naniteNutrient', quantity: 1 },
      { materialId: 'mitochondrialAmplifier', quantity: 5 }
    ]
  }
];

const statOptions = [
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
  { key: 'strength', label: 'Strength' },
  { key: 'intellect', label: 'Intellect' },
  { key: 'life', label: 'Life' }
];

const columns = [
  { key: 'picture', label: '', type: 'image', sortable: false },
  { key: 'name', label: 'Name', type: 'string', sortable: true },
  { key: 'rarity', label: 'Rarity', type: 'rarity', sortable: true },
  { key: 'height', label: 'Height', type: 'number', sortable: true },
  { key: 'weight', label: 'Weight', type: 'number', sortable: true },
  { key: 'strength', label: 'Strength', type: 'number', sortable: true },
  { key: 'intellect', label: 'Intellect', type: 'number', sortable: true },
  { key: 'life', label: 'Life', type: 'number', sortable: true },
  { key: 'recipe', label: '', type: 'recipe', sortable: false }
];
