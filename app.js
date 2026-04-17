const imageModal = document.getElementById('imageModal');
const imageModalImg = document.getElementById('imageModalImg');
const imageModalTitle = document.getElementById('imageModalTitle');
const imageModalClose = document.getElementById('imageModalClose');
const recipeModal = document.getElementById('recipeModal');
const recipeModalTitle = document.getElementById('recipeModalTitle');
const recipeModalList = document.getElementById('recipeModalList');
const recipeModalClose = document.getElementById('recipeModalClose');

function getStatValue(item, key) {
  const stat = item.stats.find(entry => entry.name === key);
  return stat ? stat.value : 0;
}

function getColumnValue(item, column) {
  if (column.type === 'number') return getStatValue(item, column.key);
  return item[column.key];
}

function hasStatValue(item, key) {
  return item.stats.some(entry => entry.name === key);
}

function hasSortValue(item, column) {
  if (column.type === 'number') return hasStatValue(item, column.key);
  const value = getColumnValue(item, column);
  return value !== undefined && value !== null && value !== '';
}

function getStatOptions(items) {
  const seen = new Set();
  const options = [];

  for (const item of items) {
    for (const stat of item.stats) {
      if (seen.has(stat.name)) continue;
      seen.add(stat.name);
      options.push(stat.name);
    }
  }

  return options;
}

function getMemoryColumns(statOptions) {
  return [
    { key: 'picture', label: '', type: 'image', sortable: false },
    { key: 'name', label: 'Name', type: 'string', sortable: true },
    { key: 'rarity', label: 'Rarity', type: 'rarity', sortable: true },
    ...statOptions.map(stat => ({ key: stat, label: stat, type: 'number', sortable: true }))
  ];
}

function getInitialMinStats(statOptions) {
  return Object.fromEntries(statOptions.map(stat => [stat, '']));
}

function getRarityRank(rarity) {
  if (rarity === 'Poor') return 0;
  if (rarity === 'Common') return 1;
  if (rarity === 'Uncommon') return 2;
  if (rarity === 'Rare') return 3;
  return 999;
}

function getRarityClass(rarity) {
  return `rarity-${rarity.toLowerCase()}`;
}

function getFoodMaterialName(materialId) {
  const material = foodMaterials.find(item => item.id === materialId);
  return material ? material.name : materialId;
}

function compareValues(a, b, column) {
  const valueA = getColumnValue(a, column);
  const valueB = getColumnValue(b, column);

  if (column.type === 'number') return valueA - valueB;
  if (column.type === 'rarity') return getRarityRank(valueA) - getRarityRank(valueB);
  return String(valueA).localeCompare(String(valueB));
}

function openImageModal(item, imageSrc) {
  imageModalImg.src = imageSrc;
  imageModalImg.alt = item.name;
  imageModalTitle.textContent = item.name;
  imageModal.classList.add('is-open');
  imageModal.setAttribute('aria-hidden', 'false');
  imageModalClose.focus();
}

function closeImageModal() {
  imageModal.classList.remove('is-open');
  imageModal.setAttribute('aria-hidden', 'true');
  imageModalImg.src = '';
  imageModalImg.alt = '';
  imageModalTitle.textContent = '';
}

function openRecipeModal(item) {
  recipeModalTitle.textContent = `${item.name} Recipe`;
  recipeModalList.innerHTML = '';

  for (const entry of item.recipe) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.className = 'recipe-material-img';
    img.src = `img/material_${entry.materialId}.png`;
    img.alt = '';
    img.loading = 'lazy';
    li.appendChild(img);

    const name = document.createElement('span');
    name.className = 'recipe-material-name';
    name.textContent = getFoodMaterialName(entry.materialId);
    li.appendChild(name);

    const quantity = document.createElement('span');
    quantity.className = 'recipe-material-quantity';
    quantity.textContent = `${entry.quantity}x`;
    li.appendChild(quantity);

    recipeModalList.appendChild(li);
  }

  recipeModal.classList.add('is-open');
  recipeModal.setAttribute('aria-hidden', 'false');
  recipeModalClose.focus();
}

function closeRecipeModal() {
  recipeModal.classList.remove('is-open');
  recipeModal.setAttribute('aria-hidden', 'true');
  recipeModalTitle.textContent = '';
  recipeModalList.innerHTML = '';
}

function createStatHeaderInput(table, stat) {
  const input = document.createElement('input');
  input.id = `${table.id}-stat-${stat}`;
  input.className = 'stat-input header-stat-input';
  input.type = 'number';
  input.min = '0';
  input.step = '1';
  input.placeholder = 'min';
  input.value = table.state.minStats[stat];
  input.setAttribute('aria-label', `Minimum ${stat}`);
  input.addEventListener('click', event => event.stopPropagation());
  input.addEventListener('keydown', event => event.stopPropagation());
  input.addEventListener('input', () => {
    table.state.minStats[stat] = input.value;
    renderTableOnly(table);
  });

  return input;
}

function applyFilters(table) {
  const search = table.state.searchText.trim().toLowerCase();

  return table.items.filter(item => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search);
    if (!matchesSearch) return false;

    for (const stat of table.statOptions) {
      const minValue = table.state.minStats[stat];
      if (minValue === '') continue;
      if (getStatValue(item, stat) < Number(minValue)) return false;
    }

    return true;
  });
}

function applySorting(table, data) {
  return [...data].sort((a, b) => {
    if (table.state.sorts.length > 1) {
      const presenceA = getSortPresenceCount(table, a);
      const presenceB = getSortPresenceCount(table, b);
      if (presenceA !== presenceB) return presenceB - presenceA;
    }

    for (const sort of table.state.sorts) {
      const column = table.columns.find(col => col.key === sort.key);
      if (!column) continue;

      const dir = sort.dir === 'asc' ? 1 : -1;
      const result = compareValues(a, b, column);
      if (result !== 0) return result * dir;
    }

    return a.name.localeCompare(b.name);
  });
}

function getSortPresenceCount(table, item) {
  return table.state.sorts.reduce((count, sort) => {
    const column = table.columns.find(col => col.key === sort.key);
    return column && hasSortValue(item, column) ? count + 1 : count;
  }, 0);
}

function getProcessedItems(table) {
  return applySorting(table, applyFilters(table));
}

function renderHeader(table) {
  table.elements.headRow.innerHTML = '';

  for (const column of table.columns) {
    const th = document.createElement('th');
    const sortIndex = table.state.sorts.findIndex(sort => sort.key === column.key);
    const sort = sortIndex >= 0 ? table.state.sorts[sortIndex] : null;
    if (sort) th.classList.add('sorted-column');

    const stat = table.statOptions.find(option => option === column.key);
    const headerContent = document.createElement('div');
    headerContent.className = 'header-cell-content';

    const label = document.createElement('span');
    label.textContent = column.label;
    headerContent.appendChild(label);

    if (stat) headerContent.appendChild(createStatHeaderInput(table, stat));

    th.appendChild(headerContent);

    if (column.sortable) {
      th.classList.add('sortable');
      th.title = 'Click to sort. Shift+Click to add, flip, or remove this column from combined sorting. Maximum 3 columns.';

      const indicator = document.createElement('span');
      indicator.className = 'sort-indicator';
      indicator.textContent = sort ? `${sort.dir === 'asc' ? '↑' : '↓'}${sortIndex + 1}` : '';
      label.appendChild(indicator);

      th.addEventListener('click', event => {
        updateSort(table, column.key, event.shiftKey);
        renderTableOnly(table);
        renderHeader(table);
      });
    }

    table.elements.headRow.appendChild(th);
  }
}

function updateSort(table, key, isMultiSort) {
  const index = table.state.sorts.findIndex(sort => sort.key === key);

  if (!isMultiSort) {
    if (index === 0 && table.state.sorts.length === 1) {
      table.state.sorts[0].dir = table.state.sorts[0].dir === 'asc' ? 'desc' : 'asc';
    }
    else table.state.sorts = [{ key, dir: 'desc' }];
    return;
  }

  if (index === -1) {
    if (table.state.sorts.length >= 3) return;
    table.state.sorts.push({ key, dir: 'desc' });
    return;
  }

  const sort = table.state.sorts[index];
  if (sort.dir === 'desc') sort.dir = 'asc';
  else table.state.sorts.splice(index, 1);

  if (!table.state.sorts.length) table.state.sorts = [{ key: 'name', dir: 'asc' }];
}

function renderPictureCell(table, item, td) {
  td.classList.add('picture-cell');

  const img = document.createElement('img');
  img.className = 'item-img';
  img.src = table.getThumbSrc(item);
  img.alt = item.name;
  img.loading = 'lazy';
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', `Open larger image of ${item.name}`);
  img.addEventListener('error', () => {
    img.style.visibility = 'hidden';
    img.removeAttribute('role');
    img.removeAttribute('tabindex');
  });
  img.addEventListener('click', () => openImageModal(item, table.getImageSrc(item)));
  img.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openImageModal(item, table.getImageSrc(item));
    }
  });
  td.appendChild(img);
}

function renderRecipeCell(item, td) {
  td.classList.add('recipe-cell');

  const button = document.createElement('button');
  button.className = 'recipe-btn';
  button.type = 'button';
  button.textContent = 'Recipe';
  button.addEventListener('click', () => openRecipeModal(item));
  td.appendChild(button);
}

function renderBody(table, rows) {
  table.elements.body.innerHTML = '';

  if (!rows.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = table.columns.length;
    td.className = 'empty';
    td.textContent = `No matching ${table.itemLabelPlural}`;
    tr.appendChild(td);
    table.elements.body.appendChild(tr);
    return;
  }

  for (const item of rows) {
    const tr = document.createElement('tr');

    for (const column of table.columns) {
      const td = document.createElement('td');
      if (table.state.sorts.some(sort => sort.key === column.key)) td.classList.add('sorted-column');

      if (column.key === 'picture') renderPictureCell(table, item, td);
      else if (column.key === 'rarity') td.innerHTML = `<span class="rarity-badge ${getRarityClass(item.rarity)}">${item.rarity}</span>`;
      else if (column.key === 'recipe') renderRecipeCell(item, td);
      else if (column.type === 'number') {
        const value = getColumnValue(item, column);
        td.classList.add('num');

        if (table.statCellMode === 'matrix') {
          td.classList.add('memory-stat-cell');
          if (hasStatValue(item, column.key)) {
            td.classList.add('has-stat');
            td.style.setProperty('--stat-intensity', Math.max(0.2, Math.min(value / 10, 1)));
            td.textContent = value;
          }
        }
        else td.textContent = value;
      }
      else td.textContent = getColumnValue(item, column);

      if (column.type === 'number') td.classList.add('num');
      tr.appendChild(td);
    }

    table.elements.body.appendChild(tr);
  }
}

function renderSummary(table, rows) {
  table.elements.resultsInfo.textContent = `${rows.length} ${rows.length === 1 ? table.itemLabel : table.itemLabelPlural}`;
}

function renderTableOnly(table) {
  const rows = getProcessedItems(table);
  renderBody(table, rows);
  renderSummary(table, rows);
}

function clearFilters(table) {
  table.state.searchText = '';
  table.state.minStats = getInitialMinStats(table.statOptions);
  table.state.sorts = [{ key: 'name', dir: 'asc' }];
  table.elements.searchInput.value = '';

  for (const stat of table.statOptions) {
    const input = document.getElementById(`${table.id}-stat-${stat}`);
    if (input) input.value = '';
  }

  renderTableOnly(table);
  renderHeader(table);
}

function initTable(table) {
  renderHeader(table);
  renderTableOnly(table);

  table.elements.searchInput.addEventListener('input', event => {
    table.state.searchText = event.target.value;
    renderTableOnly(table);
  });

  table.elements.clearBtn.addEventListener('click', () => clearFilters(table));
}

const resolvedMemoryStatOptions = typeof memoryStatOptions !== 'undefined' ? memoryStatOptions : getStatOptions(memories);

const tables = [
  {
    id: 'food',
    itemLabel: 'food',
    itemLabelPlural: 'foods',
    items: foods,
    columns,
    statOptions,
    getThumbSrc: item => `img/small/food_${item.id}.png`,
    getImageSrc: item => `img/food_${item.id}.png`,
    state: {
      searchText: '',
      minStats: getInitialMinStats(statOptions),
      sorts: [{ key: 'name', dir: 'asc' }]
    },
    elements: {
      searchInput: document.getElementById('foodSearchInput'),
      clearBtn: document.getElementById('foodClearFiltersBtn'),
      resultsInfo: document.getElementById('foodResultsInfo'),
      headRow: document.getElementById('foodTableHeadRow'),
      body: document.getElementById('foodTableBody')
    }
  },
  {
    id: 'memory',
    itemLabel: 'memory',
    itemLabelPlural: 'memories',
    items: memories,
    columns: getMemoryColumns(resolvedMemoryStatOptions),
    statOptions: resolvedMemoryStatOptions,
    statCellMode: 'matrix',
    getThumbSrc: item => `img/memory_${item.id}.png`,
    getImageSrc: item => `img/memory_${item.id}.png`,
    state: {
      searchText: '',
      minStats: getInitialMinStats(resolvedMemoryStatOptions),
      sorts: [{ key: 'name', dir: 'asc' }]
    },
    elements: {
      searchInput: document.getElementById('memorySearchInput'),
      clearBtn: document.getElementById('memoryClearFiltersBtn'),
      resultsInfo: document.getElementById('memoryResultsInfo'),
      headRow: document.getElementById('memoryTableHeadRow'),
      body: document.getElementById('memoryTableBody')
    }
  }
];

function init() {
  for (const table of tables) initTable(table);

  imageModalClose.addEventListener('click', closeImageModal);
  recipeModalClose.addEventListener('click', closeRecipeModal);
  imageModal.addEventListener('click', event => {
    if (event.target === imageModal) closeImageModal();
  });
  recipeModal.addEventListener('click', event => {
    if (event.target === recipeModal) closeRecipeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && imageModal.classList.contains('is-open')) closeImageModal();
    if (event.key === 'Escape' && recipeModal.classList.contains('is-open')) closeRecipeModal();
  });
}

init();
