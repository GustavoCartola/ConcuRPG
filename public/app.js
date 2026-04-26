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
let activePanelView = 'registro';
let activeAttributeByCampaign = CAMPAIGNS.reduce((accumulator, campaign) => {
  accumulator[campaign.id] = campaign.attributes[0];
  return accumulator;
}, {});

function createEmptyDailyStats() {
  return { easy: 0, hard: 0, wrong: 0 };
}

function normalizeDailyStatsEntry(value) {
  if (typeof value === 'number') {
    return { easy: Math.max(0, Math.trunc(value)), hard: 0, wrong: 0 };
  }

  if (!value || typeof value !== 'object') {
    return createEmptyDailyStats();
  }

  return {
    easy: Math.max(0, Math.trunc(Number(value.easy) || 0)),
    hard: Math.max(0, Math.trunc(Number(value.hard) || 0)),
    wrong: Math.max(0, Math.trunc(Number(value.wrong) || 0))
  };
}

function ensureActiveAttribute(campaign) {
  const current = activeAttributeByCampaign[campaign.id];
  if (campaign.attributes.includes(current)) {
    return current;
  }

  activeAttributeByCampaign[campaign.id] = campaign.attributes[0];
  return activeAttributeByCampaign[campaign.id];
}

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
  activeAttributeByCampaign = CAMPAIGNS.reduce((accumulator, campaign) => {
    accumulator[campaign.id] = campaign.attributes[0];
    return accumulator;
  }, {});

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
    dailyStatsByDate: {},
    savedDays: {},
    currentWinStreak: 0,
    bestWinStreak: 0,
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
    const rawDailyStats =
      parsed.dailyStatsByDate && typeof parsed.dailyStatsByDate === 'object'
        ? parsed.dailyStatsByDate
        : parsed.dailyCorrectByDate && typeof parsed.dailyCorrectByDate === 'object'
          ? parsed.dailyCorrectByDate
          : {};

    merged.dailyStatsByDate = Object.entries(rawDailyStats).reduce((accumulator, [dateKey, value]) => {
      const normalized = normalizeDailyStatsEntry(value);
      if (normalized.easy + normalized.hard + normalized.wrong > 0) {
        accumulator[dateKey] = normalized;
      }
      return accumulator;
    }, {});

    merged.savedDays =
      parsed.savedDays && typeof parsed.savedDays === 'object'
        ? Object.entries(parsed.savedDays).reduce((accumulator, [dateKey, value]) => {
            if (!value || typeof value !== 'object') {
              return accumulator;
            }

            const correct = Math.max(0, Math.trunc(Number(value.correct) || 0));
            const wrong = Math.max(0, Math.trunc(Number(value.wrong) || 0));
            const attempts = correct + wrong;
            accumulator[dateKey] = {
              correct,
              wrong,
              attempts,
              accuracy: attempts === 0 ? 0 : (correct / attempts) * 100,
              savedAt: typeof value.savedAt === 'string' ? value.savedAt : `${dateKey}T23:59:00.000Z`
            };
            return accumulator;
          }, {})
        : {};
    merged.currentWinStreak = Math.max(0, Math.trunc(Number(parsed.currentWinStreak) || 0));
    merged.bestWinStreak = Math.max(merged.currentWinStreak, Math.trunc(Number(parsed.bestWinStreak) || 0));

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

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  return getLocalDateKey(new Date());
}

function formatDateLabel(dateKey) {
  const [year, month, day] = dateKey.split('-');
  return `${day}/${month}/${year}`;
}

function markStudyDay() {
  const today = getTodayKey();
  if (!state.activityDates.includes(today)) {
    state.activityDates.push(today);
    state.activityDates.sort();
  }
}

function updateDailyStats(resultType, delta) {
  if (!['easy', 'hard', 'wrong'].includes(resultType)) {
    return;
  }

  const today = getTodayKey();
  const current = normalizeDailyStatsEntry(state.dailyStatsByDate[today]);
  const nextValue = Math.max(0, current[resultType] + delta);
  current[resultType] = nextValue;

  if (current.easy + current.hard + current.wrong === 0) {
    delete state.dailyStatsByDate[today];
    return;
  }

  state.dailyStatsByDate[today] = current;
}

function updateWinStreak(resultType, effectiveDelta) {
  if (effectiveDelta <= 0) {
    return;
  }

  if (resultType === 'easy' || resultType === 'hard') {
    state.currentWinStreak += effectiveDelta;
    state.bestWinStreak = Math.max(state.bestWinStreak, state.currentWinStreak);
    return;
  }

  if (resultType === 'wrong') {
    state.currentWinStreak = 0;
  }
}

function getTodayStats() {
  const today = getTodayKey();
  const stats = normalizeDailyStatsEntry(state.dailyStatsByDate[today]);
  return {
    ...stats,
    correct: stats.easy + stats.hard,
    attempts: stats.easy + stats.hard + stats.wrong
  };
}

function saveTodaySummary() {
  const today = getTodayKey();
  const todayStats = getTodayStats();
  const attempts = todayStats.attempts;

  state.savedDays[today] = {
    correct: todayStats.correct,
    wrong: todayStats.wrong,
    attempts,
    accuracy: attempts === 0 ? 0 : (todayStats.correct / attempts) * 100,
    savedAt: new Date().toISOString()
  };

  void saveState();
  render();
}

function getSavedDaysList() {
  return Object.entries(state.savedDays)
    .map(([dateKey, day]) => ({
      dateKey,
      ...day
    }))
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey));
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
    attempts,
    percentageValue: percentage,
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

function getStudyDayStreakInfo() {
  const sortedDates = [...new Set(state.activityDates)].sort();
  if (sortedDates.length === 0) {
    return { current: 0, best: 0 };
  }

  const dateSet = new Set(sortedDates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const todayKey = getLocalDateKey(today);
  const yesterdayKey = getLocalDateKey(yesterday);

  let current = 0;
  if (dateSet.has(todayKey) || dateSet.has(yesterdayKey)) {
    let cursor = dateSet.has(todayKey) ? today : yesterday;
    while (dateSet.has(cursor.toISOString().slice(0, 10))) {
      current += 1;
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() - 1);
    }
  }

  let best = 0;
  let running = 0;
  let previousDayNumber = null;

  for (const dateKey of sortedDates) {
    const [year, month, day] = dateKey.split('-').map(Number);
    const currentDayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86400000);

    if (previousDayNumber === null) {
      running = 1;
    } else {
      const dayDiff = currentDayNumber - previousDayNumber;
      running = dayDiff === 1 ? running + 1 : 1;
    }

    best = Math.max(best, running);
    previousDayNumber = currentDayNumber;
  }

  return { current, best };
}

function updateCounter(campaignId, attribute, resultType, delta) {
  const current = state.campaigns[campaignId][attribute][resultType];
  const nextValue = Math.max(0, current + delta);
  const effectiveDelta = nextValue - current;

  if (effectiveDelta === 0) {
    return;
  }

  state.campaigns[campaignId][attribute][resultType] = nextValue;
  updateDailyStats(resultType, effectiveDelta);
  updateWinStreak(resultType, effectiveDelta);

  if (effectiveDelta > 0) {
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
  const studyDayStreak = getStudyDayStreakInfo();
  const globalAccuracy = formatAccuracy(totals.correct, totals.wrong);

  document.getElementById('levelValue').textContent = String(levelInfo.level);
  document.getElementById('xpValue').textContent = String(totals.xp);
  document.getElementById('winStreakNow').textContent = String(state.currentWinStreak);
  document.getElementById('winStreakBest').textContent = `Recorde ${state.bestWinStreak}`;
  document.getElementById('studyStreakNow').textContent = String(studyDayStreak.current);
  document.getElementById('studyStreakBest').textContent = `Recorde ${studyDayStreak.best}`;
  document.getElementById('goldValue').textContent = String(totals.gold);
  document.getElementById('correctValue').textContent = globalAccuracy.percentage;
  document.getElementById('correctPercentValue').textContent = globalAccuracy.ratio;

  const levelRing = document.querySelector('.level-ring');
  levelRing.style.background = `
    radial-gradient(circle, rgba(15, 23, 42, 0.75) 52%, transparent 54%),
    conic-gradient(from 180deg, var(--accent) ${levelInfo.progress}%, rgba(15, 23, 42, 0.65) ${levelInfo.progress}% 100%)
  `;

  const attributeList = document.getElementById('attributeList');
  attributeList.innerHTML = '';

  const visibleAttributes = ATTRIBUTES.filter((attribute) => attributeTotals[attribute] > 0);

  if (visibleAttributes.length === 0) {
    attributeList.innerHTML = '<p class="attribute-empty">Sem atributos pontuados ainda.</p>';
  }

  visibleAttributes.forEach((attribute) => {
    const row = document.createElement('div');
    row.className = 'attribute-bar';
    const value = attributeTotals[attribute];
    const accuracy = formatAccuracy(attributeAccuracy[attribute].correct, attributeAccuracy[attribute].wrong);
    const percentage = Math.round(accuracy.percentageValue);
    row.innerHTML = `
      <strong>${attribute}</strong>
      <div class="bar-track"><div class="bar-fill" style="width:${percentage}%"><span class="bar-fill-label">${percentage}%</span></div></div>
      <div class="attribute-metrics">
        <span>${value.toFixed(1)}</span>
        <small>${accuracy.attempts}</small>
      </div>
    `;
    attributeList.appendChild(row);
  });

  const todayStats = getTodayStats();
  const todayAccuracy = formatAccuracy(todayStats.correct, todayStats.wrong);
  const todayBarWidth = Math.round(todayAccuracy.percentageValue);
  const todaySavedLabel = document.getElementById('todaySavedLabel');
  const isTodaySaved = Boolean(state.savedDays[getTodayKey()]);

  document.getElementById('todayCorrectValue').textContent = String(todayStats.correct);
  document.getElementById('todayWrongValue').textContent = String(todayStats.wrong);
  document.getElementById('todayAttemptsValue').textContent = String(todayStats.attempts);
  document.getElementById('todayAccuracyValue').textContent = todayAccuracy.percentage;
  document.getElementById('todayAccuracyBar').style.width = `${todayBarWidth}%`;
  document.getElementById('todayAccuracyBarLabel').textContent = todayAccuracy.percentage;
  todaySavedLabel.textContent = isTodaySaved ? 'Dia de hoje salvo no historico' : 'Dia de hoje ainda nao salvo';
  todaySavedLabel.className = `today-saved-label${isTodaySaved ? ' saved' : ''}`;

  const gifSlot = document.getElementById('gifSlot');
  gifSlot.innerHTML = state.gifUrl ? `<img src="${state.gifUrl}" alt="GIF do personagem" />` : '<span>Seu GIF vai aparecer aqui</span>';
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
      renderMainPanelContent();
    });
    tabs.appendChild(button);
  });
}

function renderPanelTabs() {
  const panelTabs = document.getElementById('panelTabs');
  panelTabs.innerHTML = `
    <button type="button" class="panel-tab${activePanelView === 'registro' ? ' active' : ''}" data-view="registro">Registro</button>
    <button type="button" class="panel-tab${activePanelView === 'historico' ? ' active' : ''}" data-view="historico">Historico</button>
  `;

  panelTabs.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      activePanelView = button.getAttribute('data-view');
      renderPanelTabs();
      renderMainPanelContent();
    });
  });
}

function renderHistoryContent() {
  const content = document.getElementById('campaignContent');
  const days = getSavedDaysList();

  if (days.length === 0) {
    content.innerHTML = `
      <section class="history-sheet">
        <h3>Historico de dias</h3>
        <p class="history-empty">Nenhum dia salvo ainda. Use o botao "Salvar dia de hoje" na area de evolucao diaria.</p>
      </section>
    `;
    return;
  }

  content.innerHTML = `
    <section class="history-sheet">
      <h3>Historico de dias</h3>
      <div class="history-list">
        ${days
          .map(
            (day) => `
            <article class="history-item">
              <div>
                <strong>${formatDateLabel(day.dateKey)}</strong>
                <small>Salvo em ${new Date(day.savedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
              <div class="history-actions">
                <div class="history-metrics">
                  <span>${day.correct} acertos</span>
                  <span>${day.wrong} erros</span>
                  <span>${day.attempts} respostas</span>
                  <span>${day.accuracy.toFixed(1)}%</span>
                </div>
                <button class="history-delete-button" type="button" data-delete-date="${day.dateKey}">Excluir</button>
              </div>
            </article>
          `
          )
          .join('')}
      </div>
    </section>
  `;

  content.querySelectorAll('[data-delete-date]').forEach((button) => {
    button.addEventListener('click', () => {
      const dateKey = button.getAttribute('data-delete-date');
      if (!dateKey) {
        return;
      }

      const confirmed = window.confirm(`Excluir registro salvo de ${formatDateLabel(dateKey)}?`);
      if (!confirmed) {
        return;
      }

      delete state.savedDays[dateKey];
      void saveState();
      render();
    });
  });
}

function renderMainPanelContent() {
  const campaignTabs = document.getElementById('campaignTabs');

  if (activePanelView === 'historico') {
    campaignTabs.style.display = 'none';
    renderHistoryContent();
    return;
  }

  campaignTabs.style.display = 'flex';
  renderCampaignTabs();
  renderCampaignContent();
}

function renderCampaignContent() {
  const campaign = CAMPAIGNS.find((item) => item.id === activeCampaignId);
  const totals = getCampaignTotals(campaign.id);
  const content = document.getElementById('campaignContent');
  const template = document.getElementById('campaignTemplate');
  const fragment = template.content.cloneNode(true);
  const activeAttribute = ensureActiveAttribute(campaign);
  const stats = state.campaigns[campaign.id][activeAttribute];
  const accuracy = formatAccuracy(stats.easy + stats.hard, stats.wrong);

  fragment.querySelector('.campaign-badge').textContent = campaign.badge;
  fragment.querySelector('.campaign-title').textContent = campaign.title;
  fragment.querySelector('.campaign-totals').innerHTML = `
    <span class="totals-pill">${totals.xp} XP</span>
    <span class="totals-pill">${totals.gold} ouro</span>
    <span class="totals-pill">${totals.correct} acertos</span>
    <span class="totals-pill">${totals.wrong} erros</span>
  `;

  const attributesRoot = fragment.querySelector('.campaign-attributes');
  attributesRoot.innerHTML = `
    <div class="subject-selector" role="tablist" aria-label="Materias da campanha">
      ${campaign.attributes
        .map(
          (attribute) =>
            `<button class="subject-button${attribute === activeAttribute ? ' active' : ''}" type="button" data-attribute="${attribute}">${attribute}</button>`
        )
        .join('')}
    </div>
    <article class="subject-panel">
      <header class="subject-panel-header">
        <div class="subject-title-wrap">
          <h4>${activeAttribute}</h4>
          <small>Registro rapido da materia</small>
        </div>
        <div class="subject-head-metrics">
          <span class="subject-metric-pill">${accuracy.percentage}</span>
          <span class="subject-metric-pill ghost">${accuracy.ratio}</span>
        </div>
      </header>
      <div class="subject-actions">
        <article class="subject-action easy">
          <span class="subject-action-label">${UI_LABELS.easy}</span>
          <div class="subject-action-controls">
            <button class="subject-stepper subtract" type="button" data-result-type="easy" data-delta="-1">-</button>
            <strong class="subject-action-value">${stats.easy}</strong>
            <button class="subject-stepper add" type="button" data-result-type="easy" data-delta="1">+</button>
          </div>
        </article>
        <article class="subject-action hard">
          <span class="subject-action-label">${UI_LABELS.hard}</span>
          <div class="subject-action-controls">
            <button class="subject-stepper subtract" type="button" data-result-type="hard" data-delta="-1">-</button>
            <strong class="subject-action-value">${stats.hard}</strong>
            <button class="subject-stepper add" type="button" data-result-type="hard" data-delta="1">+</button>
          </div>
        </article>
        <article class="subject-action wrong">
          <span class="subject-action-label">${UI_LABELS.wrong}</span>
          <div class="subject-action-controls">
            <button class="subject-stepper subtract" type="button" data-result-type="wrong" data-delta="-1">-</button>
            <strong class="subject-action-value">${stats.wrong}</strong>
            <button class="subject-stepper add" type="button" data-result-type="wrong" data-delta="1">+</button>
          </div>
        </article>
      </div>
    </article>
  `;

  attributesRoot.querySelectorAll('[data-attribute]').forEach((button) => {
    button.addEventListener('click', () => {
      activeAttributeByCampaign[campaign.id] = button.getAttribute('data-attribute');
      renderCampaignContent();
    });
  });

  attributesRoot.querySelectorAll('[data-result-type]').forEach((button) => {
    button.addEventListener('click', () => {
      const resultType = button.getAttribute('data-result-type');
      const delta = Number(button.getAttribute('data-delta')) || 1;
      updateCounter(campaign.id, activeAttribute, resultType, delta);
    });
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

  document.getElementById('saveTodayButton').addEventListener('click', () => {
    saveTodaySummary();
  });
}

function render() {
  renderDashboard();
  renderPanelTabs();
  renderMainPanelContent();
}

async function initialize() {
  await loadCatalog();
  state = await loadState();
  wireEvents();
  render();
}

void initialize();