const state = {
  searchText: '',
  minStats: { height: '', weight: '', strength: '', intellect: '', life: '' },
  sortKey: 'name',
  sortDir: 'asc'
};

const searchInput = document.getElementById('searchInput');
const tableHeadRow = document.getElementById('tableHeadRow');
const tableBody = document.getElementById('tableBody');
const resultsInfo = document.getElementById('resultsInfo');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
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

function getRarityRank(rarity) {
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

function applyFilters(data) {
  const search = state.searchText.trim().toLowerCase();

  return data.filter(item => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search);
    if (!matchesSearch) return false;

    for (const stat of statOptions) {
      const minValue = state.minStats[stat];
      if (minValue === '') continue;
      if (getStatValue(item, stat) < Number(minValue)) return false;
    }

    return true;
  });
}

function applySorting(data) {
  const column = columns.find(col => col.key === state.sortKey);
  const dir = state.sortDir === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    const result = compareValues(a, b, column);
    if (result !== 0) return result * dir;
    return a.name.localeCompare(b.name);
  });
}

function getProcessedFoods() {
  return applySorting(applyFilters(foods));
}

function openImageModal(item) {
  imageModalImg.src = `img/food_${item.id}.png`;
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
    li.textContent = `${entry.quantity}x ${getFoodMaterialName(entry.materialId)}`;
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

function createStatHeaderInput(stat) {
  const input = document.createElement('input');
  input.id = `stat-${stat}`;
  input.className = 'stat-input header-stat-input';
  input.type = 'number';
  input.min = '0';
  input.step = '1';
  input.placeholder = 'min';
  input.value = state.minStats[stat];
  input.setAttribute('aria-label', `Minimum ${stat}`);
  input.addEventListener('click', event => event.stopPropagation());
  input.addEventListener('keydown', event => event.stopPropagation());
  input.addEventListener('input', () => {
    state.minStats[stat] = input.value;
    renderTableOnly();
  });

  return input;
}

function renderHeader() {
  tableHeadRow.innerHTML = '';

  for (const column of columns) {
    const th = document.createElement('th');
    if (column.key === state.sortKey) th.classList.add('sorted-column');

    const stat = statOptions.find(option => option === column.key);
    const headerContent = document.createElement('div');
    headerContent.className = 'header-cell-content';

    const label = document.createElement('span');
    label.textContent = column.label;
    headerContent.appendChild(label);

    if (stat) headerContent.appendChild(createStatHeaderInput(stat));

    th.appendChild(headerContent);

    if (column.sortable) {
      th.classList.add('sortable');

      const indicator = document.createElement('span');
      indicator.className = 'sort-indicator';
      indicator.textContent = state.sortKey === column.key ? (state.sortDir === 'asc' ? '↑' : '↓') : '';
      label.appendChild(indicator);

      th.addEventListener('click', () => {
        if (state.sortKey === column.key) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        else {
          state.sortKey = column.key;
          state.sortDir = 'asc';
        }
        renderTableOnly();
        renderHeader();
      });
    }

    tableHeadRow.appendChild(th);
  }
}

function renderBody(rows) {
  tableBody.innerHTML = '';

  if (!rows.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = columns.length;
    td.className = 'empty';
    td.textContent = 'No matching foods';
    tr.appendChild(td);
    tableBody.appendChild(tr);
    return;
  }

  for (const item of rows) {
    const tr = document.createElement('tr');

    for (const column of columns) {
      const td = document.createElement('td');
      if (column.key === state.sortKey) td.classList.add('sorted-column');

      if (column.key === 'picture') {
        td.classList.add('picture-cell');

        const img = document.createElement('img');
        img.className = 'food-img';
        img.src = `img/food_${item.id}.png`;
        img.alt = item.name;
        img.loading = 'lazy';
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Open larger image of ${item.name}`);
        img.addEventListener('click', () => openImageModal(item));
        img.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openImageModal(item);
          }
        });
        td.appendChild(img);
      }
      else if (column.key === 'rarity') td.innerHTML = `<span class="rarity-badge ${getRarityClass(item.rarity)}">${item.rarity}</span>`;
      else if (column.key === 'recipe') {
        td.classList.add('recipe-cell');

        const button = document.createElement('button');
        button.className = 'recipe-btn';
        button.type = 'button';
        button.textContent = 'Recipe';
        button.addEventListener('click', () => openRecipeModal(item));
        td.appendChild(button);
      }
      else td.textContent = getColumnValue(item, column);

      if (column.type === 'number') td.classList.add('num');
      tr.appendChild(td);
    }

    tableBody.appendChild(tr);
  }
}

function renderSummary(rows) {
  resultsInfo.textContent = `${rows.length} item${rows.length === 1 ? '' : 's'}`;
}

function renderTableOnly() {
  const rows = getProcessedFoods();
  renderBody(rows);
  renderSummary(rows);
}

function clearFilters() {
  state.searchText = '';
  state.minStats = { height: '', weight: '', strength: '', intellect: '', life: '' };
  searchInput.value = '';

  for (const stat of statOptions) {
    const input = document.getElementById(`stat-${stat}`);
    if (input) input.value = '';
  }

  renderTableOnly();
}

function init() {
  renderHeader();
  renderTableOnly();

  searchInput.addEventListener('input', e => {
    state.searchText = e.target.value;
    renderTableOnly();
  });

  clearFiltersBtn.addEventListener('click', clearFilters);
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
