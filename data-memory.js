const memories = [
  { id: 1, name: 'Assembly Instructions', rarity: 'Uncommon', stats: [
    { name: 'Discipline', value: 2 }, { name: 'Logic', value: 8 }
  ] },
  { id: 2, name: 'Basketball', rarity: 'Poor', stats: [
    { name: 'Patience', value: 1 }] },
  { id: 3, name: 'Biology Notes', rarity: 'Uncommon', stats: [{ name: 'Wisdom', value: 10 }
    
  ] },
  { id: 4, name: 'Blueprints', rarity: 'Rare', stats: [
    { name: 'Adaptability', value: 10 }, { name: 'Logic', value: 5 }
  ] },
  { id: 25, name: 'Bowling Ball', rarity: 'Poor', stats: [{ name: 'Patience', value: 1 }] },
  { id: 5, name: 'Bowling Pin', rarity: 'Poor', stats: [{ name: 'Patience', value: 1 }] },
  { id: 26, name: 'Camera', rarity: 'Uncommon', stats: [{ name: 'Communication', value: 5 }, { name: 'Creativity', value: 5 }] },
  { id: 6, name: 'Cards', rarity: 'Uncommon', stats: [{ name: 'Communication', value: 5 }, { name: 'Empathy', value: 5 }] },
  { id: 7, name: 'Cognitive Cards', rarity: 'Rare', stats: [{ name: 'Adaptability', value: 7 }, { name: 'Logic', value: 5 }, { name: 'Wisdom', value: 3 }] },
  { id: 27, name: "Commander's Log", rarity: 'Rare', stats: [{ name: 'Discipline', value: 7 }, { name: 'Leadership', value: 8 }] },
  { id: 8, name: 'Compass', rarity: 'Rare', stats: [{ name: 'Adaptability', value: 6 }, { name: 'Focus', value: 3 }, { name: 'Leadership', value: 3 }] },
  { id: 28, name: 'Crayon', rarity: 'Common', stats: [{ name: 'Creativity', value: 5 }, { name: 'Focus', value: 2 }] },
  { id: 29, name: 'Encyclopedia', rarity: 'Rare', stats: [{ name: 'Logic', value: 5 }, { name: 'Wisdom', value: 10 }] },
  { id: 30, name: 'First Aid', rarity: 'Uncommon', stats: [{ name: 'Adaptability', value: 10 }] },
  { id: 31, name: 'Guitar', rarity: 'Common', stats: [{ name: 'Communication', value: 3 }, { name: 'Creativity', value: 3 }, { name: 'Focus', value: 3 }] },
  { id: 9, name: 'Love Letters', rarity: 'Uncommon', stats: [{ name: 'Wisdom', value: 10 }] },
  { id: 10, name: 'Maps', rarity: 'Rare', stats: [{ name: 'Leadership', value: 5 }, { name: 'Wisdom', value: 10 }] },
  { id: 11, name: 'Meditation', rarity: 'Common', stats: [{ name: 'Focus', value: 5 }] },
  { id: 12, name: 'Mirror', rarity: 'Common', stats: [{ name: 'Empathy', value: 5 }] },
  { id: 32, name: 'Music Notes', rarity: 'Uncommon', stats: [{ name: 'Communication', value: 4 }, { name: 'Creativity', value: 6 }] },
  { id: 13, name: 'Mystery Box', rarity: 'Common', stats: [{ name: 'Patience', value: 5 }] },
  { id: 14, name: 'Plans', rarity: 'Rare', stats: [{ name: 'Communication', value: 8 }, { name: 'Discipline', value: 7 }] },
  { id: 15, name: 'Programming Manual', rarity: 'Uncommon', stats: [{ name: 'Logic', value: 10 }] },
  { id: 16, name: 'Small Human Art', rarity: 'Common', stats: [{ name: 'Empathy', value: 5 }] },
  { id: 17, name: 'Small Tree', rarity: 'Uncommon', stats: [{ name: 'Discipline', value: 5 }, { name: 'Patience', value: 5 }] },
  { id: 18, name: 'Stopwatch', rarity: 'Common', stats: [{ name: 'Patience', value: 5 }] },
  { id: 19, name: 'Sudoku Book', rarity: 'Uncommon', stats: [{ name: 'Logic', value: 10 }] },
  { id: 20, name: 'Survival Diagrams', rarity: 'Rare', stats: [{ name: 'Adaptability', value: 10 }, { name: 'Leadership', value: 5 }] },
  { id: 21, name: 'Teddy Bear', rarity: 'Common', stats: [{ name: 'Empathy', value: 3 }] },
  { id: 22, name: 'The Art of War', rarity: 'Rare', stats: [{ name: 'Communication', value: 5 }, { name: 'Leadership', value: 10 }] },
  { id: 33, name: 'Tommy', rarity: 'Common', stats: [{ name: 'Empathy', value: 3 }] },
  { id: 23, name: 'Travel Journal', rarity: 'Uncommon', stats: [{ name: 'Adaptability', value: 10 }] },
  { id: 24, name: "Where's Tommy", rarity: 'Uncommon', stats: [{ name: 'Focus', value: 5 }, { name: 'Patience', value: 5 }] }
];

const memoryStatOptions = [
  'Adaptability',
  'Communication',
  'Creativity',
  'Discipline',
  'Empathy',
  'Focus',
  'Leadership',
  'Logic',
  'Patience',
  'Wisdom'
];
