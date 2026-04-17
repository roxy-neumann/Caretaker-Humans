const organics = [
  {
    id: 1,
    name: 'Bio Seaweed',
    weight: 0.1,
    materials: [3, 2],
    sources: ["The Boat's Net", 'Cocoon']
  },
  {
    id: 2,
    name: 'Bio Waste',
    weight: 0.1,
    materials: [1],
    sources: ['Cocoon', 'Night Crawler', 'Green Crawler', 'Lazarus Rack']
  },
  {
    id: 3,
    name: 'Bio Organic',
    weight: 0.1,
    materials: [6],
    sources: ['Cocoon', 'Night Crawler', 'Green Crawler']
  },
  {
    id: 4,
    name: 'Bio Light',
    weight: 0.1,
    materials: [5],
    sources: ['Pink Slime']
  },
  {
    id: 5,
    name: 'Bio Dark',
    weight: 0.1,
    materials: [4],
    sources: ['Red Slime']
  },
  {
    id: 6,
    name: 'Bio Flesh',
    weight: 0.2,
    materials: [9, 8, 7],
    sources: ['Talon Shark', 'Angel']
  }
];

const organicColumns = [
  { key: 'picture', label: '', type: 'image', sortable: false },
  { key: 'name', label: 'Name', type: 'string', sortable: true },
  { key: 'weight', label: 'Weight kg', type: 'number', sortable: true },
  { key: 'materials', label: 'Soilforge Outcome', type: 'materials', sortable: false },
  { key: 'sources', label: 'Source', type: 'list', sortable: false }
];
