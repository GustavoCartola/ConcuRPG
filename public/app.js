const STORAGE_KEY = 'concurpg-state-v1';
const CATALOG_URL = '/catalog.json';

const FALLBACK_CAMPAIGNS = [
  {
    id: 'unilab',
    title: 'Unilab',
    badge: 'Trilha academica e juridica',
    attributes: ['INFRA TI REDES', 'PORTUGUES', 'LOGICA', 'DIREITO']
  },
  {
    id: 'tjce',
    title: 'TJCE',
    badge: 'Trilha de tribunal',
    attributes: ['TI', 'DEV', 'PORTUGUES', 'DIREITO']
  },
  {
    id: 'dataprev',
    title: 'Dataprev',
    badge: 'Trilha tecnica',
    attributes: ['INFRA TI REDES', 'TI', 'DEV', 'LOGICA']
  }
];

const FALLBACK_UI_LABELS = {
  easy: 'Acerto facil',
  hard: 'Acerto dificil',
  wrong: 'Erro',
  points: 'ponto(s)'
};

let CAMPAIGNS = FALLBACK_CAMPAIGNS;
let ATTRIBUTES = [...new Set(CAMPAIGNS.flatMap((campaign) => campaign.attributes))];
let UI_LABELS = FALLBACK_UI_LABELS;

const REWARDS = {
  easy: { attributePoints: 1, xp: 10, gold: 12 },
  hard: { attributePoints: 0.5, xp: 18, gold: 20 },
  wrong: { attributePoints: 0, xp: 0, gold: 0 }
};

let activeCampaignId = CAMPAIGNS[0].id;

function isValidCampaign(campaign) {
  return (
    campaign &&
    typeof campaign.id === 'string' &&
    campaign.id.trim() &&
    typeof campaign.title === 'string' &&
    campaign.title.trim() &&
    typeof campaign.badge === 'string' &&
    Array.isArray(campaign.attributes) &&
    campaign.attributes.length > 0 &&
    campaign.attributes.every((attribute) => typeof attribute === 'string' && attribute.trim())
  );
}

function applyCatalog(campaigns, uiLabels) {
  CAMPAIGNS = campaigns;
  ATTRIBUTES = [...new Set(CAMPAIGNS.flatMap((campaign) => campaign.attributes))];
  UI_LABELS = { ...FALLBACK_UI_LABELS, ...uiLabels };

  if (!CAMPAIGNS.some((campaign) => campaign.id === activeCampaignId)) {
    activeCampaignId = CAMPAIGNS[0].id;
  }
}

function normalizeCatalog(rawCatalog) {
  if (!rawCatalog || typeof rawCatalog !== 'object') {
    return null;
  }

  const campaigns = Array.isArray(rawCatalog.campaigns)
    ? rawCatalog.campaigns.filter(isValidCampaign).map((campaign) => ({
        id: campaign.id.trim(),
        title: campaign.title.trim(),
        badge: campaign.badge.trim(),
        attributes: campaign.attributes.map((attribute) => attribute.trim())
      }))
    : [];

  if (campaigns.length === 0) {
    return null;
  }

  const uiLabels = rawCatalog.uiLabels && typeof rawCatalog.uiLabels === 'object' ? rawCatalog.uiLabels : {};

  return { campaigns, uiLabels };
}

async function loadCatalog() {
  try {
    const response = await fetch(CATALOG_URL, { cache: 'no-store' });
    if (!response.ok) {
      return;
    }

    const rawCatalog = await response.json();
    const normalized = normalizeCatalog(rawCatalog);
    if (!normalized) {
      return;
    }

    applyCatalog(normalized.campaigns, normalized.uiLabels);
  } catch {
    // Em erro de rede ou parse, usa os fallbacks em memoria.
  }
}

function createEmptyStats(attributes) {
  return attributes.reduce((accumulator, attribute) => {
    accumulator[attribute] = { easy: 0, hard: 0, wrong: 0 };
    return accumulator;
  }, {});
}

function createInitialState() {
  return {
    gifUrl: 'download.gif',
    activityDates: [],
    campaigns: CAMPAIGNS.reduce((accumulator, campaign) => {
      accumulator[campaign.id] = createEmptyStats(campaign.attributes);
      return accumulator;
    }, {})
  };
}

function normalizeAttributeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

function sumStats(statList) {
  return statList.reduce(
    (accumulator, current) => ({
      easy: accumulator.easy + (Number(current?.easy) || 0),
      hard: accumulator.hard + (Number(current?.hard) || 0),
      wrong: accumulator.wrong + (Number(current?.wrong) || 0)
    }),
    { easy: 0, hard: 0, wrong: 0 }
  );
}

function getSavedStats(savedCampaign, attribute) {
  if (savedCampaign[attribute]) {
    return savedCampaign[attribute];
  }

  // Mantem compatibilidade com nomes antigos de materia.
  if (attribute === 'INFRA TI REDES') {
    const aliases = ['INFRA TI', 'INFRATI', 'INFRA/REDES', 'INFRA'];
    const aliasStats = aliases.map((alias) => savedCampaign[alias]).filter(Boolean);
    if (aliasStats.length > 0) {
      return sumStats(aliasStats);
    }
  }

  if (attribute === 'DEV') {
    if (savedCampaign.DEV) {
      return savedCampaign.DEV;
    }
    if (savedCampaign.REDES) {
      return savedCampaign.REDES;
    }
  }

  const targetKey = normalizeAttributeName(attribute);
  const fallbackKey = Object.keys(savedCampaign).find((savedKey) => normalizeAttributeName(savedKey) === targetKey);
  if (fallbackKey) {
    return savedCampaign[fallbackKey];
  }

  if (attribute.includes('/')) {
    const parts = attribute
      .split('/')
      .map((part) => part.trim())
      .filter(Boolean);
    const partStats = parts
      .map((part) => savedCampaign[part])
      .filter(Boolean);

    if (partStats.length > 0) {
      return sumStats(partStats);
    }
  }

  return {};
}

function sanitizeState(parsed) {
  if (!parsed || typeof parsed !== 'object') {
    return createInitialState();
  }

  try {
    const merged = createInitialState();
    merged.gifUrl = parsed.gifUrl || '';
    merged.activityDates = Array.isArray(parsed.activityDates) ? parsed.activityDates : [];

    for (const campaign of CAMPAIGNS) {
      const savedCampaign = parsed.campaigns?.[campaign.id] || {};
      for (const attribute of campaign.attributes) {
        const current = getSavedStats(savedCampaign, attribute);
        merged.campaigns[campaign.id][attribute] = {
          easy: Number(current.easy) || 0,
          hard: Number(current.hard) || 0,
          wrong: Number(current.wrong) || 0
        };
      }
    }

    return merged;
  } catch {
    return createInitialState();
  }
}

function hasProgress(currentState) {
  if (currentState.activityDates.length > 0) {
    return true;
  }

  return CAMPAIGNS.some((campaign) =>
    campaign.attributes.some((attribute) => {
      const stats = currentState.campaigns[campaign.id][attribute];
      return stats.easy > 0 || stats.hard > 0 || stats.wrong > 0;
    })
  );
}

async function loadState() {
  let localState = createInitialState();
  const savedLocal = localStorage.getItem(STORAGE_KEY);
  if (savedLocal) {
    try {
      localState = sanitizeState(JSON.parse(savedLocal));
    } catch {
      localState = createInitialState();
    }
  }

  try {
    const response = await fetch('/api/state', { cache: 'no-store' });
    if (!response.ok) {
      return localState;
    }

    const remoteRaw = await response.json();
    const remoteState = sanitizeState(remoteRaw);

    if (!hasProgress(remoteState) && hasProgress(localState)) {
      await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localState)
      });
      return localState;
    }

    return remoteState;
  } catch {
    return localState;
  }
}

let state = createInitialState();

async function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
  } catch {
    // Se a API falhar, o localStorage ainda mantém um backup local.
  }
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function markStudyDay() {
  const today = getTodayKey();
  if (!state.activityDates.includes(today)) {
    state.activityDates.push(today);
    state.activityDates.sort();
  }
}

function getCampaignTotals(campaignId) {
  const campaign = state.campaigns[campaignId];
  let xp = 0;
  let gold = 0;
  let correct = 0;
  let wrong = 0;

  Object.values(campaign).forEach((stats) => {
    xp += stats.easy * REWARDS.easy.xp + stats.hard * REWARDS.hard.xp;
    gold += stats.easy * REWARDS.easy.gold + stats.hard * REWARDS.hard.gold;
    correct += stats.easy + stats.hard;
    wrong += stats.wrong;
  });

  return { xp, gold, correct, wrong };
}

function getAttributeTotals() {
  const totals = ATTRIBUTES.reduce((accumulator, attribute) => {
    accumulator[attribute] = 0;
    return accumulator;
  }, {});

  for (const campaign of CAMPAIGNS) {
    for (const attribute of campaign.attributes) {
      const stats = state.campaigns[campaign.id][attribute];
      totals[attribute] += stats.easy * REWARDS.easy.attributePoints + stats.hard * REWARDS.hard.attributePoints;
    }
  }

  return totals;
}

function getGlobalAttributeAccuracy() {
  const totals = ATTRIBUTES.reduce((accumulator, attribute) => {
    accumulator[attribute] = { correct: 0, wrong: 0 };
    return accumulator;
  }, {});

  for (const campaign of CAMPAIGNS) {
    for (const attribute of campaign.attributes) {
      const stats = state.campaigns[campaign.id][attribute];
      totals[attribute].correct += stats.easy + stats.hard;
      totals[attribute].wrong += stats.wrong;
    }
  }

  return totals;
}

function formatAccuracy(correct, wrong) {
  const safeCorrect = Number(correct) || 0;
  const safeWrong = Number(wrong) || 0;
  const attempts = safeCorrect + safeWrong;
  const percentage = attempts === 0 ? 0 : (safeCorrect / attempts) * 100;

  return {
    ratio: `${safeCorrect}/${attempts}`,
    percentage: `${percentage.toFixed(1)}%`
  };
}

function getGlobalTotals() {
  let xp = 0;
  let gold = 0;
  let correct = 0;
  let wrong = 0;

  for (const campaign of CAMPAIGNS) {
    const totals = getCampaignTotals(campaign.id);
    xp += totals.xp;
    gold += totals.gold;
    correct += totals.correct;
    wrong += totals.wrong;
  }

  return { xp, gold, correct, wrong };
}

function getLevelInfo(totalXp) {
  const level = Math.floor(totalXp / 100) + 1;
  const levelFloor = (level - 1) * 100;
  const nextLevel = level * 100;
  const progress = Math.max(0, Math.min(100, ((totalXp - levelFloor) / 100) * 100));
  return { level, progress, remaining: Math.max(0, nextLevel - totalXp), current: totalXp - levelFloor };
}

function getStreak() {
  const uniqueDates = [...new Set(state.activityDates)].sort();
  if (uniqueDates.length === 0) {
    return 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateSet = new Set(uniqueDates);
  const todayKey = today.toISOString().slice(0, 10);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  if (!dateSet.has(todayKey) && !dateSet.has(yesterdayKey)) {
    return 0;
  }

  let streak = 0;
  let cursor = dateSet.has(todayKey) ? today : yesterday;

  while (dateSet.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function updateCounter(campaignId, attribute, resultType, delta) {
  const current = state.campaigns[campaignId][attribute][resultType];
  const nextValue = Math.max(0, current + delta);
  state.campaigns[campaignId][attribute][resultType] = nextValue;

  if (delta > 0) {
    markStudyDay();
  }

  void saveState();
  render();
}

function renderDashboard() {
  const totals = getGlobalTotals();
  const levelInfo = getLevelInfo(totals.xp);
  const attributeTotals = getAttributeTotals();
  const attributeAccuracy = getGlobalAttributeAccuracy();
  const maxValue = Math.max(1, ...Object.values(attributeTotals));
  const streak = getStreak();
  const globalAccuracy = formatAccuracy(totals.correct, totals.wrong);

  document.getElementById('levelValue').textContent = String(levelInfo.level);
  document.getElementById('xpValue').textContent = String(totals.xp);
  document.getElementById('xpProgressLabel').textContent = `${levelInfo.current} / 100 para o proximo nivel`;
  document.getElementById('streakValue').textContent = String(streak);
  document.getElementById('goldValue').textContent = String(totals.gold);
  document.getElementById('correctValue').textContent = globalAccuracy.ratio;
  document.getElementById('correctPercentValue').textContent = globalAccuracy.percentage;

  const levelRing = document.querySelector('.level-ring');
  levelRing.style.background = `
    radial-gradient(circle, rgba(15, 23, 42, 0.75) 52%, transparent 54%),
    conic-gradient(from 180deg, var(--accent) ${levelInfo.progress}%, rgba(15, 23, 42, 0.65) ${levelInfo.progress}% 100%)
  `;

  const attributeList = document.getElementById('attributeList');
  attributeList.innerHTML = '';

  ATTRIBUTES.forEach((attribute) => {
    const row = document.createElement('div');
    row.className = 'attribute-bar';
    const value = attributeTotals[attribute];
    const percentage = Math.round((value / maxValue) * 100);
    const accuracy = formatAccuracy(attributeAccuracy[attribute].correct, attributeAccuracy[attribute].wrong);
    row.innerHTML = `
      <strong>${attribute}</strong>
      <div class="bar-track"><div class="bar-fill" style="width:${percentage}%"></div></div>
      <div class="attribute-metrics">
        <span>${value.toFixed(1)}</span>
        <small>${accuracy.ratio} (${accuracy.percentage})</small>
      </div>
    `;
    attributeList.appendChild(row);
  });

  const gifSlot = document.getElementById('gifSlot');
  gifSlot.innerHTML = state.gifUrl ? `<img src="${state.gifUrl}" alt="GIF do personagem" />` : '<span>Seu GIF vai aparecer aqui</span>';
}

function createCounterChip(campaignId, attribute, resultType, label, value) {
  const chip = document.createElement('div');
  chip.className = 'counter-chip';
  chip.innerHTML = `
    <label>${label}</label>
    <button data-action="subtract" type="button">-</button>
    <strong>${value}</strong>
    <button data-action="add" type="button">+</button>
  `;

  const [subtractButton, , addButton] = chip.querySelectorAll('button, strong');
  subtractButton.addEventListener('click', () => updateCounter(campaignId, attribute, resultType, -1));
  addButton.addEventListener('click', () => updateCounter(campaignId, attribute, resultType, 1));
  return chip;
}

function renderCampaignTabs() {
  const tabs = document.getElementById('campaignTabs');
  tabs.innerHTML = '';

  CAMPAIGNS.forEach((campaign) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `campaign-tab${campaign.id === activeCampaignId ? ' active' : ''}`;
    button.textContent = campaign.title;
    button.addEventListener('click', () => {
      activeCampaignId = campaign.id;
      renderCampaignTabs();
      renderCampaignContent();
    });
    tabs.appendChild(button);
  });
}

function renderCampaignContent() {
  const campaign = CAMPAIGNS.find((item) => item.id === activeCampaignId);
  const totals = getCampaignTotals(campaign.id);
  const content = document.getElementById('campaignContent');
  const template = document.getElementById('campaignTemplate');
  const attributeTemplate = document.getElementById('attributeTemplate');
  const fragment = template.content.cloneNode(true);

  fragment.querySelector('.campaign-badge').textContent = campaign.badge;
  fragment.querySelector('.campaign-title').textContent = campaign.title;
  fragment.querySelector('.campaign-totals').innerHTML = `
    <span class="totals-pill">${totals.xp} XP</span>
    <span class="totals-pill">${totals.gold} ouro</span>
    <span class="totals-pill">${totals.correct} acertos</span>
    <span class="totals-pill">${totals.wrong} erros</span>
  `;

  const attributesRoot = fragment.querySelector('.campaign-attributes');
  campaign.attributes.forEach((attribute) => {
    const stats = state.campaigns[campaign.id][attribute];
    const points = stats.easy * REWARDS.easy.attributePoints + stats.hard * REWARDS.hard.attributePoints;
    const accuracy = formatAccuracy(stats.easy + stats.hard, stats.wrong);
    const cardFragment = attributeTemplate.content.cloneNode(true);
    cardFragment.querySelector('h4').textContent = attribute;
    cardFragment.querySelector('.attribute-points').textContent = `${points.toFixed(1)} ${UI_LABELS.points}`;
    cardFragment.querySelector('.attribute-accuracy').textContent = `${accuracy.ratio} (${accuracy.percentage})`;

    const counterGrid = cardFragment.querySelector('.counter-grid');
    counterGrid.appendChild(createCounterChip(campaign.id, attribute, 'easy', UI_LABELS.easy, stats.easy));
    counterGrid.appendChild(createCounterChip(campaign.id, attribute, 'hard', UI_LABELS.hard, stats.hard));
    counterGrid.appendChild(createCounterChip(campaign.id, attribute, 'wrong', UI_LABELS.wrong, stats.wrong));
    attributesRoot.appendChild(cardFragment);
  });

  content.innerHTML = '';
  content.appendChild(fragment);
}

function exportState() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'concurpg-backup.json';
  link.click();
  URL.revokeObjectURL(url);
}

function resetState() {
  state = createInitialState();
  void saveState();
  render();
}

function wireEvents() {
  document.getElementById('resetButton').addEventListener('click', () => {
    const confirmed = window.confirm('Isso vai apagar o progresso salvo neste navegador. Deseja continuar?');
    if (confirmed) {
      resetState();
    }
  });
}

function render() {
  renderDashboard();
  renderCampaignTabs();
  renderCampaignContent();
}

async function initialize() {
  await loadCatalog();
  state = await loadState();
  wireEvents();
  render();
}

void initialize();