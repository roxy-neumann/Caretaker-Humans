const imageModal = document.getElementById('imageModal');
const imageModalImg = document.getElementById('imageModalImg');
const imageModalTitle = document.getElementById('imageModalTitle');
const imageModalClose = document.getElementById('imageModalClose');
const recipeModal = document.getElementById('recipeModal');
const recipeModalTitle = document.getElementById('recipeModalTitle');
const recipeModalList = document.getElementById('recipeModalList');
const recipeModalClose = document.getElementById('recipeModalClose');
const materialsModal = document.getElementById('materialsModal');
const materialsModalList = document.getElementById('materialsModalList');
const materialsModalClose = document.getElementById('materialsModalClose');
const materialsByMaterialBtn = document.getElementById('materialsByMaterialBtn');
const materialsByOrganicBtn = document.getElementById('materialsByOrganicBtn');
let materialsView = 'material';

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

function getInitialRequiredStats(statOptions) {
  return Object.fromEntries(statOptions.map(stat => [stat, false]));
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
  const material = foodMaterialById.get(materialId);
  return material ? material.name : materialId;
}

function getOrganicForMaterial(materialId) {
  return organicByMaterialId.get(materialId);
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
  recipeModalList.appendChild(renderMaterialHeader('Quantity'));

  for (const entry of item.recipe) {
    recipeModalList.appendChild(renderMaterialListItem(
      entry.materialId,
      getFoodMaterialName(entry.materialId),
      `${entry.quantity}x`,
      getOrganicForMaterial(entry.materialId),
      true
    ));
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

function getFoodMaterialTotals() {
  const totals = new Map(foodMaterials.map(material => [material.id, { material, quantity: 0 }]));

  for (const food of foods) {
    for (const entry of food.recipe) {
      totals.get(entry.materialId).quantity += entry.quantity;
    }
  }

  return [...totals.values()].sort((a, b) => b.quantity - a.quantity || a.material.name.localeCompare(b.material.name));
}

function getFoodMaterialTotalsById() {
  return new Map(getFoodMaterialTotals().map(entry => [entry.material.id, entry.quantity]));
}

function getOrganicTotals() {
  const materialTotals = getFoodMaterialTotalsById();

  return organics
    .map(organic => {
      const materials = organic.materials.map(materialId => ({
        id: materialId,
        name: getFoodMaterialName(materialId),
        quantity: materialTotals.get(materialId) || 0
      }));

      return {
        organic,
        quantity: Math.max(...materials.map(material => material.quantity)),
        materials
      };
    })
    .sort((a, b) => b.quantity - a.quantity || a.organic.name.localeCompare(b.organic.name));
}

function renderMaterialListItem(materialId, nameText, quantityText, organic, showOrganicColumn = false) {
  const li = document.createElement('li');
  if (showOrganicColumn) li.classList.add('materials-info-row');

  const img = document.createElement('img');
  img.className = 'recipe-material-img';
  img.src = `img/material_${materialId}.png`;
  img.alt = '';
  img.loading = 'lazy';
  li.appendChild(img);

  const name = document.createElement('span');
  name.className = 'recipe-material-name';
  name.textContent = nameText;
  li.appendChild(name);

  const quantity = document.createElement('span');
  quantity.className = 'recipe-material-quantity';
  quantity.textContent = quantityText;
  li.appendChild(quantity);

  if (showOrganicColumn) {
    const organicSource = document.createElement('span');
    organicSource.className = 'organic-source';

    if (organic) {
      const organicImg = document.createElement('img');
      organicImg.className = 'organic-source-img';
      organicImg.src = `img/small/organic_${organic.id}.png`;
      organicImg.alt = '';
      organicImg.loading = 'lazy';
      organicSource.appendChild(organicImg);

      const organicName = document.createElement('span');
      organicName.textContent = organic.name;
      organicSource.appendChild(organicName);
    }
    else {
      organicSource.textContent = 'Unknown';
    }

    li.appendChild(organicSource);
  }

  return li;
}

function renderInfoHeader(labels) {
  const li = document.createElement('li');
  li.className = 'materials-info-header';

  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  li.appendChild(icon);

  for (const labelText of labels) {
    const label = document.createElement('span');
    label.textContent = labelText;
    li.appendChild(label);
  }

  return li;
}

function renderMaterialHeader(quantityLabel) {
  return renderInfoHeader(['Material', quantityLabel, 'Organic']);
}

function renderOrganicHeader() {
  return renderInfoHeader(['Organic', 'Needed', 'Based On']);
}

function renderOrganicListItem(entry) {
  const li = document.createElement('li');
  li.className = 'materials-info-row';

  const img = document.createElement('img');
  img.className = 'recipe-material-img';
  img.src = `img/small/organic_${entry.organic.id}.png`;
  img.alt = '';
  img.loading = 'lazy';
  li.appendChild(img);

  const name = document.createElement('span');
  name.className = 'recipe-material-name';
  name.textContent = entry.organic.name;
  li.appendChild(name);

  const quantity = document.createElement('span');
  quantity.className = 'recipe-material-quantity';
  quantity.textContent = entry.quantity;
  li.appendChild(quantity);

  const basedOn = document.createElement('span');
  basedOn.className = 'materials-based-on';

  for (const material of entry.materials) {
    const materialItem = document.createElement('span');
    materialItem.className = 'materials-based-on-item';

    const materialImg = document.createElement('img');
    materialImg.className = 'materials-based-on-img';
    materialImg.src = `img/material_${material.id}.png`;
    materialImg.alt = '';
    materialImg.loading = 'lazy';
    materialItem.appendChild(materialImg);

    const materialText = document.createElement('span');
    materialText.textContent = `${material.name} — ${material.quantity}`;
    materialItem.appendChild(materialText);

    basedOn.appendChild(materialItem);
  }

  li.appendChild(basedOn);

  return li;
}

function renderMaterialsByMaterial() {
  materialsModalList.innerHTML = '';
  materialsModalList.appendChild(renderMaterialHeader('Total'));

  for (const entry of getFoodMaterialTotals()) {
    materialsModalList.appendChild(renderMaterialListItem(
      entry.material.id,
      entry.material.name,
      entry.quantity,
      getOrganicForMaterial(entry.material.id),
      true
    ));
  }
}

function renderMaterialsByOrganic() {
  materialsModalList.innerHTML = '';
  materialsModalList.appendChild(renderOrganicHeader());

  for (const entry of getOrganicTotals()) {
    materialsModalList.appendChild(renderOrganicListItem(entry));
  }
}

function renderMaterialsView() {
  materialsByMaterialBtn.classList.toggle('is-active', materialsView === 'material');
  materialsByOrganicBtn.classList.toggle('is-active', materialsView === 'organic');

  if (materialsView === 'organic') renderMaterialsByOrganic();
  else renderMaterialsByMaterial();
}

function openMaterialsModal() {
  materialsView = 'material';
  renderMaterialsView();

  materialsModal.classList.add('is-open');
  materialsModal.setAttribute('aria-hidden', 'false');
  materialsModalClose.focus();
}

function closeMaterialsModal() {
  materialsModal.classList.remove('is-open');
  materialsModal.setAttribute('aria-hidden', 'true');
  materialsModalList.innerHTML = '';
}

function createStatHeaderInput(table, stat) {
  const controls = document.createElement('div');
  controls.className = 'stat-header-controls';

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
  controls.appendChild(input);

  if (table.hasRequiredStatFilters) {
    const requiredLabel = document.createElement('label');
    requiredLabel.className = 'stat-required-label';
    requiredLabel.title = `Require ${stat}`;
    requiredLabel.addEventListener('click', event => event.stopPropagation());
    requiredLabel.addEventListener('keydown', event => event.stopPropagation());

    const checkbox = document.createElement('input');
    checkbox.id = `${table.id}-required-${stat}`;
    checkbox.className = 'stat-required-checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = table.state.requiredStats[stat];
    checkbox.setAttribute('aria-label', `Require ${stat}`);
    checkbox.addEventListener('click', event => event.stopPropagation());
    checkbox.addEventListener('change', event => {
      event.stopPropagation();
      table.state.requiredStats[stat] = checkbox.checked;
      renderTableOnly(table);
    });

    requiredLabel.appendChild(checkbox);
    controls.appendChild(requiredLabel);
  }

  return controls;
}

function applyFilters(table) {
  const search = table.state.searchText.trim().toLowerCase();

  return table.items.filter(item => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search);
    if (!matchesSearch) return false;

    for (const stat of table.statOptions) {
      if (table.state.requiredStats[stat] && !hasStatValue(item, stat)) return false;

      const minValue = table.state.minStats[stat];
      if (minValue === '') continue;
      if (getStatValue(item, stat) < Number(minValue)) return false;
    }

    return true;
  });
}

function applySorting(table, data) {
  const sortColumns = table.state.sorts
    .map(sort => ({ ...sort, column: table.columnByKey.get(sort.key) }))
    .filter(sort => sort.column);

  if (!sortColumns.length) return [...data];

  return [...data].sort((a, b) => {
    for (const sort of sortColumns) {
      const dir = sort.dir === 'asc' ? 1 : -1;
      const result = compareValues(a, b, sort.column);
      if (result !== 0) return result * dir;
    }

    return a.name.localeCompare(b.name);
  });
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
    if (!(table.id === 'food' && column.key === 'recipe')) headerContent.appendChild(label);

    if (stat) headerContent.appendChild(createStatHeaderInput(table, stat));
    if (table.id === 'food' && column.key === 'recipe') headerContent.appendChild(createFoodMaterialsInfoButton());

    th.appendChild(headerContent);

    if (column.sortable) {
      th.classList.add('sortable');
      th.title = table.hasMultiSort
        ? 'Click to sort descending, ascending, then off. Shift+Click adds columns to combined sorting. Maximum 3 columns.'
        : 'Click to sort descending, ascending, then off.';

      const indicator = document.createElement('span');
      indicator.className = 'sort-indicator';
      indicator.textContent = sort
        ? `${sort.dir === 'asc' ? '↑' : '↓'}${table.hasMultiSort && table.state.sorts.length > 1 ? sortIndex + 1 : ''}`
        : '';
      label.appendChild(indicator);

      th.addEventListener('click', event => {
        updateSort(table, column.key, table.hasMultiSort && event.shiftKey);
        renderTableOnly(table);
        renderHeader(table);
      });
    }

    table.elements.headRow.appendChild(th);
  }
}

function createFoodMaterialsInfoButton() {
  const button = document.createElement('button');
  button.className = 'recipe-btn recipe-header-btn';
  button.type = 'button';
  button.textContent = 'Recipe';
  button.title = 'Food Materials Info';
  button.addEventListener('click', event => {
    event.stopPropagation();
    openMaterialsModal();
  });
  return button;
}

function updateSort(table, key, isMultiSort) {
  const index = table.state.sorts.findIndex(sort => sort.key === key);

  if (!isMultiSort) {
    if (index === 0 && table.state.sorts.length === 1) {
      if (table.state.sorts[0].dir === 'desc') table.state.sorts[0].dir = 'asc';
      else table.state.sorts = [];
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
            td.textContent = value;
          }
        }
        else td.textContent = value;
      }
      else td.textContent = getColumnValue(item, column);

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
  table.state.requiredStats = getInitialRequiredStats(table.statOptions);
  table.state.sorts = [];
  table.elements.searchInput.value = '';

  for (const stat of table.statOptions) {
    const input = document.getElementById(`${table.id}-stat-${stat}`);
    if (input) input.value = '';

    const checkbox = document.getElementById(`${table.id}-required-${stat}`);
    if (checkbox) checkbox.checked = false;
  }

  renderTableOnly(table);
  renderHeader(table);
}

function initTable(table) {
  table.columnByKey = new Map(table.columns.map(column => [column.key, column]));
  renderHeader(table);
  renderTableOnly(table);

  table.elements.searchInput.addEventListener('input', event => {
    table.state.searchText = event.target.value;
    renderTableOnly(table);
  });

  table.elements.clearBtn.addEventListener('click', () => clearFilters(table));
}

const foodMaterialById = new Map(foodMaterials.map(material => [material.id, material]));
const organicByMaterialId = new Map();

for (const organic of organics) {
  for (const materialId of organic.materials) {
    organicByMaterialId.set(materialId, organic);
  }
}

const tables = [
  {
    id: 'food',
    itemLabel: 'food',
    itemLabelPlural: 'foods',
    items: foods,
    columns,
    statOptions,
    hasRequiredStatFilters: false,
    hasMultiSort: true,
    getThumbSrc: item => `img/small/food_${item.id}.png`,
    getImageSrc: item => `img/food_${item.id}.png`,
    state: {
      searchText: '',
      minStats: getInitialMinStats(statOptions),
      requiredStats: getInitialRequiredStats(statOptions),
      sorts: []
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
    columns: getMemoryColumns(memoryStatOptions),
    statOptions: memoryStatOptions,
    statCellMode: 'matrix',
    hasRequiredStatFilters: true,
    hasMultiSort: false,
    getThumbSrc: item => `img/small/memory_${item.id}.png`,
    getImageSrc: item => `img/memory_${item.id}.png`,
    state: {
      searchText: '',
      minStats: getInitialMinStats(memoryStatOptions),
      requiredStats: getInitialRequiredStats(memoryStatOptions),
      sorts: []
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

  materialsByMaterialBtn.addEventListener('click', () => {
    materialsView = 'material';
    renderMaterialsView();
  });
  materialsByOrganicBtn.addEventListener('click', () => {
    materialsView = 'organic';
    renderMaterialsView();
  });
  imageModalClose.addEventListener('click', closeImageModal);
  recipeModalClose.addEventListener('click', closeRecipeModal);
  materialsModalClose.addEventListener('click', closeMaterialsModal);
  imageModal.addEventListener('click', event => {
    if (event.target === imageModal) closeImageModal();
  });
  recipeModal.addEventListener('click', event => {
    if (event.target === recipeModal) closeRecipeModal();
  });
  materialsModal.addEventListener('click', event => {
    if (event.target === materialsModal) closeMaterialsModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && imageModal.classList.contains('is-open')) closeImageModal();
    if (event.key === 'Escape' && recipeModal.classList.contains('is-open')) closeRecipeModal();
    if (event.key === 'Escape' && materialsModal.classList.contains('is-open')) closeMaterialsModal();
  });
}

init();
