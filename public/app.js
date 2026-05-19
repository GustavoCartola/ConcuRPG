const STORAGE_KEY = 'concurpg-state-v1';
const CATALOG_URL = '/catalog.json';

const FALLBACK_CAMPAIGNS = [
  {
    id: 'ifce',
    title: 'E05',
    badge: 'Analista Judiciario - Area TI - Infraestrutura',
    attributes: [
      'SEGURANCA DA INFORMACAO',
      'REDES E INFRAESTRUTURA',
      'NUVEM, VIRTUALIZACAO E CONTAINERS',
      'SISTEMAS OPERACIONAIS E DIRETORIO',
      'WEB, CORREIO E INTRANET',
      'BANCO DE DADOS',
      'AUTOMACAO, SCRIPTS E LOGS',
      'BACKUP, CONTINUIDADE E DRP',
      'GOVERNANCA E GESTAO DE TI',
      'PDPJ-BR E ARQUITETURA JAVA',
      'PORTUGUES',
      'RACIOCINIO LOGICO-MATEMATICO',
      'LEGISLACAO E PCD',
      'INGLES TECNICO'
    ]
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

const DAILY_CAMPAIGN_TARGETS = {
  ifce: {
    'SEGURANCA DA INFORMACAO': 20,
    'REDES E INFRAESTRUTURA': 20,
    'NUVEM, VIRTUALIZACAO E CONTAINERS': 15,
    'SISTEMAS OPERACIONAIS E DIRETORIO': 15,
    'WEB, CORREIO E INTRANET': 12,
    'BANCO DE DADOS': 12,
    'AUTOMACAO, SCRIPTS E LOGS': 12,
    'BACKUP, CONTINUIDADE E DRP': 15,
    'GOVERNANCA E GESTAO DE TI': 10,
    'PDPJ-BR E ARQUITETURA JAVA': 10,
    PORTUGUES: 12,
    'RACIOCINIO LOGICO-MATEMATICO': 10,
    'LEGISLACAO E PCD': 10,
    'INGLES TECNICO': 8
  }
};

function getStudyWeekPlans() {
  return [
    { title: 'Semana 1 - Redes', topic: 'Redes', phaseKey: 'base', goal: 'Aprender os fundamentos do edital, iniciar caderno de erros e desenvolver redacao desde cedo.', emphasis: 'OSI, TCP/IP, encapsulamento e subnetting' },
    { title: 'Semana 2 - Seguranca', topic: 'Seguranca da informacao', phaseKey: 'base', goal: 'Fixar CIA, firewall, criptografia, backup, RPO/RTO e LGPD.', emphasis: 'defesa e continuidade' },
    { title: 'Semana 3 - Massa de questoes', topic: 'Revisao dirigida', phaseKey: 'base', goal: 'Fechar a fase de base com simulados parciais e revisao dos erros.', emphasis: 'ritmo, retomada e consolidacao' },
    { title: 'Semana 4 - Linux e Windows', topic: 'Linux e Windows', phaseKey: 'massa', goal: 'Subir volume de questoes e reforcar AD, GPO, LDAP e permissões.', emphasis: 'sistemas operacionais e infraestrutura' },
    { title: 'Semana 5 - Cloud e virtualizacao', topic: 'Cloud e virtualizacao', phaseKey: 'massa', goal: 'Aumentar questoes e consolidar AWS, Azure, Docker e Kubernetes.', emphasis: 'nuvem, conteineres e orquestracao' },
    { title: 'Semana 6 - ITIL e backup', topic: 'ITIL e backup', phaseKey: 'massa', goal: 'Treinar incidentes, mudancas, RPO/RTO e continuidade.', emphasis: 'processos, suporte e recuperacao' },
    { title: 'Semana 7 - Portugues e redacao', topic: 'Portugues e redacao', phaseKey: 'massa', goal: 'Elevar o nivel em interpretacao, regencia, crase e escrita de forma objetiva.', emphasis: 'clareza, objetividade e progressao logica' },
    { title: 'Semana 8 - Legislacao e RL', topic: 'Legislacao e RL', phaseKey: 'massa', goal: 'Amarrar estatuto, organizacao do TJ, logica e leitura seca.', emphasis: 'normas, conectivos e raciocinio' },
    { title: 'Semana 9 - Revisao forte', topic: 'Revisao forte', phaseKey: 'reta', goal: 'Misturar os assuntos mais cobrados e corrigir o que mais erra.', emphasis: 'erros, velocidade e memoria ativa' },
    { title: 'Semana 10 - Simulados', topic: 'Simulados', phaseKey: 'reta', goal: 'Treinar a prova inteira, com redacao e resistencia de 4h.', emphasis: 'tempo, simulacao e controle emocional' },
    { title: 'Semana 11 - Reta final', topic: 'Reta final', phaseKey: 'reta', goal: 'Redacao toda semana, revisao pesada e memorizacao dirigida do edital.', emphasis: 'refino, repeticao e lapidacao' },
    { title: 'Semana 12 - Fechamento', topic: 'Fechamento', phaseKey: 'reta', goal: 'Ultimos ajustes, sem conteudo novo, so consolidacao.', emphasis: 'revisao final e seguranca' }
  ];
}

function buildStudyDayTasks(weekPlan, dayIndex) {
  if (weekPlan.phaseKey === 'base' && weekPlan.title === 'Semana 1 - Redes') {
    const baseWeekOneTasks = {
      1: ['40 questoes: OSI, TCP/IP e encapsulamento', 'Interpretacao textual', 'Redacao: estrutura dissertativa, introducao e conclusao'],
      2: ['40 questoes: IPv4, subnetting e CIDR', 'Português: crase', 'Redacao: escrever 1 introducao'],
      3: ['40 questoes: DNS, DHCP e NAT', 'RL: porcentagem', 'Redacao: tese + argumentacao'],
      4: ['40 questoes: VLAN, STP e switching', 'Português: concordancia', 'Redacao: conectivos argumentativos'],
      5: ['40 questoes: VPN, SSL/TLS e WLAN', 'Legislacao: Estatuto CE', 'Redacao: mini texto de 15 linhas'],
      6: ['Simulado parcial: 20 especificas e 10 gerais', 'Redacao: 20 linhas', 'Treinar tempo de prova'],
      0: ['Revisao total', 'Erros e flashcards', 'Leitura LGPD']
    };

    return baseWeekOneTasks[dayIndex] || baseWeekOneTasks[0];
  }

  if (weekPlan.phaseKey === 'base' && weekPlan.title === 'Semana 2 - Seguranca') {
    const baseWeekTwoTasks = {
      0: ['CIA, ISO 27001 e LGPD', 'Português: pontuacao', 'Redacao: tema tecnologia'],
      1: ['Firewall, IDS/IPS e SIEM', 'RL: logica', 'Redacao: desenvolvimento 1'],
      2: ['Criptografia, hash e PKI', 'Português: regencia', 'Caderno de erros e revisao curta'],
      3: ['Backup, RPO/RTO e DRP', 'Legislacao: organizacao do TJ', 'Redacao: fechamento logico'],
      4: ['IAM, MFA e SSO', 'Português: conectivos', 'Treino de argumentos e justificativas'],
      5: ['Simulado de seguranca', 'Redacao completa', 'Corrigir o texto'],
      6: ['Revisao da semana', 'Flashcards', 'Leitura seca de LGPD']
    };

    return baseWeekTwoTasks[dayIndex] || baseWeekTwoTasks[6];
  }

  if (weekPlan.phaseKey === 'base') {
    return [
      `60 questoes de ${weekPlan.topic}`,
      `Revisar ${weekPlan.emphasis}`,
      'Caderno de erros e redacao curta'
    ];
  }

  if (weekPlan.phaseKey === 'massa') {
    const weeklyRoutine = {
      1: [`Redes: 60 questoes`, 'Português: interpretacao', 'Redacao: introducao + desenvolvimento'],
      2: [`Seguranca: 60 questoes`, 'RL e caderno de erros', 'Redacao: conclusao'],
      3: ['Linux + Windows: AD, GPO e LDAP', 'Português: regencia e crase', 'Redacao completa'],
      4: ['Cloud + virtualizacao: AWS, Azure, Docker e Kubernetes', 'Legislacao', 'Correção de redação'],
      5: ['ITIL + Backup: incidentes, mudancas, RPO/RTO', 'Português', 'Redacao parcial'],
      6: ['Simulado completo objetivo', '4h simuladas', 'Redacao completa'],
      0: ['Revisao de erros', 'Redacoes antigas', 'Legislacao seca']
    };

    return weeklyRoutine[dayIndex] || weeklyRoutine[0];
  }

  const retaFinalRoutine = {
    1: ['Simulado de especificos', 'Revisao dos erros', 'Redacao: introducao e tese'],
    2: ['Seguranca e redes em bloco', 'Português focado em interpretacao', 'Redacao completa'],
    3: ['Revisao de Linux, Windows e AD', 'GPO, LDAP e IAM', 'Caderno de erros'],
    4: ['Cloud, virtualizacao e ITIL', 'Backup, RPO/RTO e DRP', 'Redacao parcial'],
    5: ['Simulado geral', 'Correção pesada', 'Memorizacao dirigida do edital'],
    6: ['Simulado completo 4h', 'Redacao completa', 'Ajustes finais'],
    0: ['Revisao leve', 'Flashcards', 'Descanso ativo']
  };

  return retaFinalRoutine[dayIndex] || retaFinalRoutine[0];
}

function buildDailyFocus(weekPlan, dayIndex, tasks) {
  const firstTask = tasks[0] || '';
  const secondTask = tasks[1] || '';

  if (weekPlan.title === 'Semana 1 - Redes') {
    const focusMap = {
      1: 'Foco do dia: OSI, TCP/IP e encapsulamento.',
      2: 'Foco do dia: IPv4, subnetting e CIDR.',
      3: 'Foco do dia: DNS, DHCP e NAT.',
      4: 'Foco do dia: VLAN, STP e switching.',
      5: 'Foco do dia: VPN, SSL/TLS e WLAN.',
      6: 'Foco do dia: simulado parcial e tempo de prova.',
      0: 'Foco do dia: revisar erros e LGPD.'
    };

    return focusMap[dayIndex] || focusMap[0];
  }

  if (weekPlan.title === 'Semana 2 - Seguranca') {
    const focusMap = {
      0: 'Foco do dia: CIA, ISO 27001 e LGPD.',
      1: 'Foco do dia: firewall, IDS/IPS e SIEM.',
      2: 'Foco do dia: criptografia, hash e PKI.',
      3: 'Foco do dia: backup, RPO/RTO e DRP.',
      4: 'Foco do dia: IAM, MFA e SSO.',
      5: 'Foco do dia: simulado de seguranca.',
      6: 'Foco do dia: revisao da semana.'
    };

    return focusMap[dayIndex] || focusMap[6];
  }

  const trimmedFirstTask = firstTask.replace(/^\d+\s*questoes?:\s*/i, '').replace(/^\s*Redacao:\s*/i, 'Redacao: ');
  const trimmedSecondTask = secondTask ? ` + ${secondTask}` : '';
  return `Foco do dia: ${trimmedFirstTask}${trimmedSecondTask}.`;
}

function buildStudyCalendar() {
  const weekPlans = getStudyWeekPlans();
  const startDate = new Date(2026, 4, 18);
  const endDate = new Date(2026, 7, 8);
  const calendar = [];
  const cursor = new Date(startDate);
  let dayOffset = 0;

  while (cursor <= endDate) {
    const weekIndex = Math.min(Math.floor(dayOffset / 7), weekPlans.length - 1);
    const weekPlan = weekPlans[weekIndex];
    const dayIndex = cursor.getDay();
    const dateLabel = `${String(cursor.getDate()).padStart(2, '0')}/${String(cursor.getMonth() + 1).padStart(2, '0')}`;
    const phaseMap = {
      base: 'base',
      massa: 'massa',
      reta: 'reta'
    };

    const tasks = buildStudyDayTasks(weekPlan, dayIndex);

    calendar.push({
      id: getLocalDateKey(cursor),
      date: dateLabel,
      title: `${weekPlan.topic}`,
      focus: buildDailyFocus(weekPlan, dayIndex, tasks),
      weekTitle: weekPlan.title,
      phaseKey: phaseMap[weekPlan.phaseKey] || 'base',
      weekGoal: weekPlan.goal,
      tasks
    });

    cursor.setDate(cursor.getDate() + 1);
    dayOffset += 1;
  }

  return calendar;
}

const STUDY_STRATEGY = {
  title: 'Estratégia E05 Analista Judiciário TI Infraestrutura',
  summary: [
    'Objetiva: meta de 7,5 a 8,5 em 10.',
    'Redacao: meta de 7 a 9 em 10.',
    'Distribuicao: 55% especificos, 20% portugues, 15% redacao, 10% RL + legislacao.',
    'Prioridade pratica: consolidar seguranca, redes, nuvem, sistemas e rotina de questoes desde cedo.'
  ],
  priorities: [
    { tier: 'Tier S', items: ['Seguranca', 'Redes', 'Portugues', 'Redacao'] },
    { tier: 'Tier A', items: ['Sistemas', 'Cloud', 'Backup', 'Automacao'] },
    { tier: 'Tier B', items: ['Banco de Dados', 'Governanca', 'PDPJ-Br'] }
  ],
  weeklyRoutine: [
    {
      day: 'Segunda a sexta',
      blocks: ['Especificos 2h', 'Correcao + teoria do erro 1h30', 'Portugues 1h', 'Redacao 40min', 'Revisao 20min']
    },
    {
      day: 'Sabado',
      blocks: ['Simulado completo com redacao', 'Treino de tempo e resistencia mental']
    },
    {
      day: 'Domingo',
      blocks: ['Revisao leve', 'Erros', 'Flashcards', 'Leitura seca', 'Redacao leve']
    }
  ],
  phases: [
    {
      title: 'Fase 1 - Construcao de base',
      period: '18/05 a 15/06',
      goal: 'Fixar fundamentos de seguranca, redes, sistemas e legislacao desde cedo.'
    },
    {
      title: 'Fase 2 - Massa de questoes',
      period: '16/06 a 15/07',
      goal: 'Aumentar volume de questoes, consolidar nuvem, automacao e governanca.'
    },
    {
      title: 'Retas finais',
      period: '16/07 a 08/08',
      goal: 'Foco em revisao pesada, simulados completos, redacao e decoreba do edital.'
    }
  ],
  redactionGoals: [
    'Clareza, objetividade e progressao logica.',
    'Introducao com tema e tese.',
    'Dois desenvolvimentos com problema e reflexo/solucao.',
    'Temas provaveis: ciberseguranca, nuvem, LGPD, governanca e transformacao digital.'
  ],
  checkpoints: [
    '7000+ questoes ate a prova.',
    '25 a 40 redacoes.',
    'Ultimos 15 dias sem conteudo novo.',
    'Treino de tempo para as 4h de prova.'
  ],
  calendar: buildStudyCalendar()
};

let activeCampaignId = CAMPAIGNS[0].id;
let activePanelView = 'registro';
let activeStudyCalendarFilter = 'all';
let activeAttributeByCampaign = CAMPAIGNS.reduce((accumulator, campaign) => {
  accumulator[campaign.id] = campaign.attributes[0];
  return accumulator;
}, {});

function ensureNotificationHost() {
  let host = document.getElementById('notificationHost');
  if (host) {
    return host;
  }

  host = document.createElement('div');
  host.id = 'notificationHost';
  host.className = 'notification-host';
  document.body.appendChild(host);
  return host;
}

function pushNotification(title, message) {
  const host = ensureNotificationHost();
  const item = document.createElement('article');
  item.className = 'app-notification';
  item.innerHTML = `
    <strong>${title}</strong>
    <p>${message}</p>
  `;

  host.appendChild(item);
  requestAnimationFrame(() => {
    item.classList.add('visible');
  });

  setTimeout(() => {
    item.classList.remove('visible');
    setTimeout(() => {
      item.remove();
    }, 180);
  }, 2600);
}

function crossedThreshold(previousValue, currentValue, threshold) {
  return previousValue < threshold && currentValue >= threshold;
}

function getAttributeAccuracyValue(attribute) {
  let correct = 0;
  let wrong = 0;

  for (const campaign of CAMPAIGNS) {
    if (!campaign.attributes.includes(attribute)) {
      continue;
    }

    const stats = state.campaigns[campaign.id][attribute];
    correct += stats.easy + stats.hard;
    wrong += stats.wrong;
  }

  return formatAccuracy(correct, wrong).percentageValue;
}

function triggerProgressNotifications(attribute, previousState, currentState) {
  if (currentState.level > previousState.level) {
    pushNotification('Level up', `Voce subiu para o level ${currentState.level}.`);
  }

  if (crossedThreshold(previousState.currentWinStreak, currentState.currentWinStreak, 5)) {
    pushNotification('Win streak', 'Voce atingiu streak de 5 acertos.');
  }

  if (currentState.bestWinStreak > previousState.bestWinStreak) {
    pushNotification('Novo recorde', `Recorde de win streak: ${currentState.bestWinStreak}.`);
  }

  [60, 80].forEach((threshold) => {
    if (crossedThreshold(previousState.attributeAccuracy, currentState.attributeAccuracy, threshold)) {
      pushNotification('Atributo em destaque', `${attribute} chegou a ${threshold}% de acerto.`);
    }

    if (crossedThreshold(previousState.dailyAccuracy, currentState.dailyAccuracy, threshold)) {
      pushNotification('Evolucao diaria', `Voce chegou a ${threshold}% de acerto hoje.`);
    }
  });
}

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
    dailySubjectsByDate: {},
    savedDays: {},
    currentWinStreak: 0,
    bestWinStreak: 0,
    erros: [],
    studyPlanProgress: {},
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
              savedAt: typeof value.savedAt === 'string' ? value.savedAt : `${dateKey}T23:59:00.000Z`,
              subjects: Array.isArray(value.subjects) ? value.subjects : []
            };
            return accumulator;
          }, {})
        : {};
    merged.dailySubjectsByDate =
      parsed.dailySubjectsByDate && typeof parsed.dailySubjectsByDate === 'object'
        ? parsed.dailySubjectsByDate
        : {};

    merged.currentWinStreak = Math.max(0, Math.trunc(Number(parsed.currentWinStreak) || 0));
    merged.bestWinStreak = Math.max(merged.currentWinStreak, Math.trunc(Number(parsed.bestWinStreak) || 0));

    merged.erros = Array.isArray(parsed.erros)
      ? parsed.erros
          .filter((e) => e && typeof e === 'object' && typeof e.assunto === 'string')
          .map((e) => ({
            id: typeof e.id === 'string' ? e.id : String(Date.now() + Math.random()),
            assunto: String(e.assunto || '').trim(),
            motivo: String(e.motivo || '').trim(),
            pegadinha: String(e.pegadinha || '').trim(),
            conceito: String(e.conceito || '').trim(),
            criadoEm: typeof e.criadoEm === 'string' ? e.criadoEm : new Date().toISOString()
          }))
      : [];

    merged.studyPlanProgress = parsed.studyPlanProgress && typeof parsed.studyPlanProgress === 'object'
      ? Object.entries(parsed.studyPlanProgress).reduce((accumulator, [dayKey, value]) => {
          if (!value || typeof value !== 'object') {
            return accumulator;
          }

          accumulator[dayKey] = Object.entries(value).reduce((taskAccumulator, [taskKey, taskValue]) => {
            taskAccumulator[taskKey] = Boolean(taskValue);
            return taskAccumulator;
          }, {});

          return accumulator;
        }, {})
      : {};

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

function updateDailySubjectStats(campaignId, attribute, resultType, delta) {
  if (!['easy', 'hard', 'wrong'].includes(resultType)) {
    return;
  }

  const today = getTodayKey();
  if (!state.dailySubjectsByDate[today]) {
    state.dailySubjectsByDate[today] = {};
  }
  if (!state.dailySubjectsByDate[today][campaignId]) {
    state.dailySubjectsByDate[today][campaignId] = {};
  }
  if (!state.dailySubjectsByDate[today][campaignId][attribute]) {
    state.dailySubjectsByDate[today][campaignId][attribute] = { easy: 0, hard: 0, wrong: 0 };
  }

  const entry = state.dailySubjectsByDate[today][campaignId][attribute];
  entry[resultType] = Math.max(0, entry[resultType] + delta);

  const total = entry.easy + entry.hard + entry.wrong;
  if (total === 0) {
    delete state.dailySubjectsByDate[today][campaignId][attribute];
    if (Object.keys(state.dailySubjectsByDate[today][campaignId]).length === 0) {
      delete state.dailySubjectsByDate[today][campaignId];
    }
    if (Object.keys(state.dailySubjectsByDate[today]).length === 0) {
      delete state.dailySubjectsByDate[today];
    }
  }
}

function updateWinStreak(resultType, effectiveDelta) {
  if (resultType === 'easy' || resultType === 'hard') {
    state.currentWinStreak = Math.max(0, state.currentWinStreak + effectiveDelta);
    if (effectiveDelta > 0) {
      state.bestWinStreak = Math.max(state.bestWinStreak, state.currentWinStreak);
    }
    return;
  }

  if (resultType === 'wrong' && effectiveDelta > 0) {
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

function getDailySubjectEntry(dateKey, campaignId, attribute) {
  const entry = state.dailySubjectsByDate?.[dateKey]?.[campaignId]?.[attribute];
  return normalizeDailyStatsEntry(entry);
}

function buildSubjectsForDate(dateKey) {
  const byDate = state.dailySubjectsByDate[dateKey] || {};
  const subjects = [];

  for (const campaign of CAMPAIGNS) {
    const byCampaign = byDate[campaign.id] || {};
    for (const attribute of campaign.attributes) {
      const entry = byCampaign[attribute];
      if (!entry) {
        continue;
      }

      const correct = entry.easy + entry.hard;
      const attempts = correct + entry.wrong;
      if (attempts === 0) {
        continue;
      }

      subjects.push({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        attribute,
        easy: entry.easy,
        hard: entry.hard,
        wrong: entry.wrong,
        correct,
        attempts,
        accuracy: (correct / attempts) * 100
      });
    }
  }

  return subjects;
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
    savedAt: new Date().toISOString(),
    subjects: buildSubjectsForDate(today)
  };

  void saveState();
  render();
}

function resetTodaySummary() {
  const today = getTodayKey();
  delete state.dailyStatsByDate[today];
  delete state.dailySubjectsByDate[today];
  delete state.savedDays[today];

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
  const previousTotals = getGlobalTotals();
  const previousLevel = getLevelInfo(previousTotals.xp).level;
  const previousCurrentWinStreak = state.currentWinStreak;
  const previousBestWinStreak = state.bestWinStreak;
  const previousAttributeAccuracy = getAttributeAccuracyValue(attribute);
  const previousTodayStats = getTodayStats();
  const previousDailyAccuracy = formatAccuracy(previousTodayStats.correct, previousTodayStats.wrong).percentageValue;

  const current = state.campaigns[campaignId][attribute][resultType];
  const nextValue = Math.max(0, current + delta);
  const effectiveDelta = nextValue - current;

  if (effectiveDelta === 0) {
    return;
  }

  state.campaigns[campaignId][attribute][resultType] = nextValue;
  updateDailyStats(resultType, effectiveDelta);
  updateDailySubjectStats(campaignId, attribute, resultType, effectiveDelta);
  updateWinStreak(resultType, effectiveDelta);

  if (effectiveDelta > 0) {
    markStudyDay();
  }

  const currentTotals = getGlobalTotals();
  const currentLevel = getLevelInfo(currentTotals.xp).level;
  const currentAttributeAccuracy = getAttributeAccuracyValue(attribute);
  const currentTodayStats = getTodayStats();
  const currentDailyAccuracy = formatAccuracy(currentTodayStats.correct, currentTodayStats.wrong).percentageValue;

  triggerProgressNotifications(
    attribute,
    {
      level: previousLevel,
      currentWinStreak: previousCurrentWinStreak,
      bestWinStreak: previousBestWinStreak,
      attributeAccuracy: previousAttributeAccuracy,
      dailyAccuracy: previousDailyAccuracy
    },
    {
      level: currentLevel,
      currentWinStreak: state.currentWinStreak,
      bestWinStreak: state.bestWinStreak,
      attributeAccuracy: currentAttributeAccuracy,
      dailyAccuracy: currentDailyAccuracy
    }
  );

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
    <button type="button" class="panel-tab${activePanelView === 'estrategia' ? ' active' : ''}" data-view="estrategia">Estrategia</button>
    <button type="button" class="panel-tab${activePanelView === 'historico' ? ' active' : ''}" data-view="historico">Historico</button>
    <button type="button" class="panel-tab${activePanelView === 'erros' ? ' active' : ''}" data-view="erros">Caderno de erros</button>
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
          .map((day) => {
            const subjects = Array.isArray(day.subjects) && day.subjects.length > 0 ? day.subjects : buildSubjectsForDate(day.dateKey);

            return `
            <article class="history-item">
              <div class="history-item-date">
                <strong>${formatDateLabel(day.dateKey)}</strong>
                <small>Salvo em ${new Date(day.savedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
              <div class="history-item-body">
                <div class="history-actions">
                  <div class="history-metrics">
                    <span>${day.correct} acertos</span>
                    <span>${day.wrong} erros</span>
                    <span>${day.attempts} respostas</span>
                    <span>${day.accuracy.toFixed(1)}%</span>
                  </div>
                  <button class="history-delete-button" type="button" data-delete-date="${day.dateKey}">Excluir</button>
                </div>
                ${subjects.length > 0
                  ? `<div class="history-subjects">${subjects
                      .map((s) => {
                        const acc = typeof s.accuracy === 'number' ? s.accuracy : (s.attempts > 0 ? ((s.correct ?? s.easy + s.hard) / s.attempts) * 100 : 0);
                        return `<span class="history-subject-tag" title="${s.campaignTitle}">${s.attribute}<em>${s.attempts}q&nbsp;·&nbsp;${acc.toFixed(0)}%</em></span>`;
                      })
                      .join('')}</div>`
                  : '<p class="history-subjects-empty">Materias nao rastreadas neste registro</p>'}
              </div>
            </article>
          `;
          })
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

      showModal(`Excluir registro salvo de ${formatDateLabel(dateKey)}?`, () => {
        delete state.savedDays[dateKey];
        void saveState();
        render();
      });
    });
  });
}

function renderErrosContent() {
  const content = document.getElementById('campaignContent');
  const erros = state.erros || [];

  content.innerHTML = `
    <section class="erros-sheet">
      <div class="erros-form-wrap">
        <h3 class="erros-form-title">Anotar novo erro</h3>
        <form id="errosForm" class="erros-form" novalidate>
          <div class="erros-field">
            <label for="erroAssunto">Assunto</label>
            <input id="erroAssunto" type="text" placeholder="Ex: diferença entre IPS e IDS" autocomplete="off" />
          </div>
          <div class="erros-field">
            <label for="erroMotivo">Motivo do erro</label>
            <textarea id="erroMotivo" rows="2" placeholder="Por que errei?"></textarea>
          </div>
          <div class="erros-field">
            <label for="erroPegadinha">Pegadinha</label>
            <textarea id="erroPegadinha" rows="2" placeholder="Qual foi a pegadinha da questao?"></textarea>
          </div>
          <div class="erros-field">
            <label for="erroConceito">Conceito desconhecido</label>
            <textarea id="erroConceito" rows="2" placeholder="O que eu nao sabia?"></textarea>
          </div>
          <button type="submit" class="erros-submit-button">Salvar erro</button>
        </form>
      </div>

      <div class="erros-list-wrap">
        <div class="erros-list-header">
          <h3>Erros anotados <span class="erros-count">${erros.length}</span></h3>
        </div>
        ${erros.length === 0
          ? '<p class="erros-empty">Nenhum erro anotado ainda.</p>'
          : `<div class="erros-list">
              ${[...erros].reverse().map((erro) => `
                <article class="erro-card" data-id="${erro.id}">
                  <div class="erro-card-header">
                    <strong class="erro-assunto">${escapeHtml(erro.assunto)}</strong>
                    <button type="button" class="erro-delete-button" data-delete-id="${erro.id}" aria-label="Excluir erro">✕</button>
                  </div>
                  ${erro.motivo ? `<div class="erro-field"><span class="erro-field-label">Motivo do erro</span><p>${escapeHtml(erro.motivo)}</p></div>` : ''}
                  ${erro.pegadinha ? `<div class="erro-field"><span class="erro-field-label">Pegadinha</span><p>${escapeHtml(erro.pegadinha)}</p></div>` : ''}
                  ${erro.conceito ? `<div class="erro-field"><span class="erro-field-label">Conceito desconhecido</span><p>${escapeHtml(erro.conceito)}</p></div>` : ''}
                </article>
              `).join('')}
            </div>`
        }
      </div>
    </section>
  `;

  const form = content.querySelector('#errosForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const assunto = content.querySelector('#erroAssunto').value.trim();
    if (!assunto) {
      return;
    }

    const novoErro = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      assunto,
      motivo: content.querySelector('#erroMotivo').value.trim(),
      pegadinha: content.querySelector('#erroPegadinha').value.trim(),
      conceito: content.querySelector('#erroConceito').value.trim(),
      criadoEm: new Date().toISOString()
    };

    state.erros = [...(state.erros || []), novoErro];
    void saveState();
    renderErrosContent();
  });

  content.querySelectorAll('[data-delete-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-delete-id');
      const erro = (state.erros || []).find((e) => e.id === id);
      const label = erro ? `Excluir o erro "${erro.assunto}"?` : 'Excluir este erro?';
      showModal(label, () => {
        state.erros = (state.erros || []).filter((e) => e.id !== id);
        void saveState();
        renderErrosContent();
      });
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getStudyPlanDayProgress(dayId) {
  return state.studyPlanProgress?.[dayId] || {};
}

function getStudyPlanCompletion(dayId, tasks) {
  const progress = getStudyPlanDayProgress(dayId);
  const completed = tasks.filter((_, taskIndex) => Boolean(progress[taskIndex])).length;
  return {
    completed,
    total: tasks.length,
    percent: tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100)
  };
}

function setStudyPlanTaskState(dayId, taskIndex, checked) {
  if (!state.studyPlanProgress[dayId]) {
    state.studyPlanProgress[dayId] = {};
  }

  if (checked) {
    state.studyPlanProgress[dayId][taskIndex] = true;
  } else {
    delete state.studyPlanProgress[dayId][taskIndex];
  }

  if (Object.keys(state.studyPlanProgress[dayId]).length === 0) {
    delete state.studyPlanProgress[dayId];
  }
}

function setStudyPlanDayState(dayId, tasks, checked) {
  if (checked) {
    state.studyPlanProgress[dayId] = tasks.reduce((accumulator, _, taskIndex) => {
      accumulator[taskIndex] = true;
      return accumulator;
    }, {});
    return;
  }

  delete state.studyPlanProgress[dayId];
}

function getCurrentStudyCalendarDayId() {
  const todayKey = getTodayKey();
  const exactDay = STUDY_STRATEGY.calendar.find((day) => day.id === todayKey);
  if (exactDay) {
    return exactDay.id;
  }

  const upcomingDay = STUDY_STRATEGY.calendar.find((day) => day.id >= todayKey);
  return upcomingDay ? upcomingDay.id : STUDY_STRATEGY.calendar[STUDY_STRATEGY.calendar.length - 1]?.id || null;
}

function getStrategyCalendarFilterLabel(filterKey) {
  switch (filterKey) {
    case 'base':
      return 'Fase 1 - base';
    case 'massa':
      return 'Fase 2 - massa';
    case 'reta':
      return 'Reta final';
    default:
      return 'Todas as fases';
  }
}

function getStudyPriorityTier(weekIndex) {
  if (weekIndex <= 2) {
    return 'Tier S';
  }

  if (weekIndex <= 7) {
    return 'Tier A';
  }

  return 'Tier B';
}

function getPhaseSummary() {
  const summary = STUDY_STRATEGY.calendar.reduce(
    (accumulator, day, index) => {
      const phaseLabel = day.phaseKey === 'base' ? 'base' : day.phaseKey === 'massa' ? 'massa' : 'reta';
      accumulator[phaseLabel].days += 1;
      accumulator[phaseLabel].tasks += day.tasks.length;
      accumulator[phaseLabel].done += getStudyPlanCompletion(day.id, day.tasks).completed;
      accumulator.priority[getStudyPriorityTier(Math.floor(index / 7))] += 1;
      return accumulator;
    },
    {
      base: { days: 0, tasks: 0, done: 0 },
      massa: { days: 0, tasks: 0, done: 0 },
      reta: { days: 0, tasks: 0, done: 0 },
      priority: { 'Tier S': 0, 'Tier A': 0, 'Tier B': 0 }
    }
  );

  return summary;
}

function filterStudyCalendarDays(days) {
  if (activeStudyCalendarFilter === 'all') {
    return days;
  }

  return days.filter((day) => day.phaseKey === activeStudyCalendarFilter);
}

function renderStrategyContent() {
  const content = document.getElementById('campaignContent');
  const totalTasks = STUDY_STRATEGY.calendar.reduce((accumulator, day) => accumulator + day.tasks.length, 0);
  const completedTasks = STUDY_STRATEGY.calendar.reduce((accumulator, day) => {
    const progress = getStudyPlanCompletion(day.id, day.tasks);
    return accumulator + progress.completed;
  }, 0);
  const filteredCalendar = filterStudyCalendarDays(STUDY_STRATEGY.calendar);
  const filteredCompletedTasks = filteredCalendar.reduce((accumulator, day) => accumulator + getStudyPlanCompletion(day.id, day.tasks).completed, 0);
  const filteredTotalTasks = filteredCalendar.reduce((accumulator, day) => accumulator + day.tasks.length, 0);
  const currentDayId = getCurrentStudyCalendarDayId();
  const phaseSummary = getPhaseSummary();

  content.innerHTML = `
    <section class="strategy-sheet">
      <header class="strategy-hero">
        <div>
          <p class="strategy-kicker">Plano de prova</p>
          <h3>${escapeHtml(STUDY_STRATEGY.title)}</h3>
          <p class="strategy-lead">Organize o estudo para pontuar alto nas objetivas e nao perder competitividade na redacao.</p>
        </div>
        <div class="strategy-score-card">
          <strong>Meta total</strong>
          <span>20 pontos</span>
          <small>Objetiva 10 + Redacao 10</small>
        </div>
      </header>

      <section class="strategy-section strategy-phase-overview">
        <div class="strategy-section-header">
          <h4>Visao por fase</h4>
          <span>Resumo rapido do plano inteiro</span>
        </div>
        <div class="strategy-overview-grid">
          <article class="strategy-overview-card">
            <strong>Base</strong>
            <span>${phaseSummary.base.days} dias</span>
            <small>${phaseSummary.base.tasks} tarefas</small>
          </article>
          <article class="strategy-overview-card">
            <strong>Massa</strong>
            <span>${phaseSummary.massa.days} dias</span>
            <small>${phaseSummary.massa.tasks} tarefas</small>
          </article>
          <article class="strategy-overview-card">
            <strong>Reta final</strong>
            <span>${phaseSummary.reta.days} dias</span>
            <small>${phaseSummary.reta.tasks} tarefas</small>
          </article>
          <article class="strategy-overview-card highlight">
            <strong>Prioridade</strong>
            <span>${phaseSummary.priority['Tier S']} / ${phaseSummary.priority['Tier A']} / ${phaseSummary.priority['Tier B']}</span>
            <small>S / A / B</small>
          </article>
        </div>
      </section>

      <div class="strategy-toolbar">
        <div class="strategy-filter-group" role="tablist" aria-label="Filtrar calendario por fase">
          <button type="button" class="strategy-filter${activeStudyCalendarFilter === 'all' ? ' active' : ''}" data-strategy-filter="all">Todas</button>
          <button type="button" class="strategy-filter${activeStudyCalendarFilter === 'base' ? ' active' : ''}" data-strategy-filter="base">Base</button>
          <button type="button" class="strategy-filter${activeStudyCalendarFilter === 'massa' ? ' active' : ''}" data-strategy-filter="massa">Massa</button>
          <button type="button" class="strategy-filter${activeStudyCalendarFilter === 'reta' ? ' active' : ''}" data-strategy-filter="reta">Reta final</button>
        </div>
        <button type="button" class="strategy-jump-button" data-strategy-jump-current>Ir para semana atual</button>
      </div>

      <div class="strategy-grid strategy-summary-grid">
        ${STUDY_STRATEGY.summary
          .map((item) => `<article class="strategy-note">${escapeHtml(item)}</article>`)
          .join('')}
      </div>

      <section class="strategy-section">
        <div class="strategy-section-header">
          <h4>Distribuicao real do estudo</h4>
          <span>55% especificos, 20% portugues, 15% redacao, 10% RL + legislacao</span>
        </div>
        <div class="strategy-pill-grid">
          <span class="strategy-pill strong">Especificos 55%</span>
          <span class="strategy-pill">Portugues 20%</span>
          <span class="strategy-pill">Redacao 15%</span>
          <span class="strategy-pill">RL + Leg 10%</span>
        </div>
      </section>

      <section class="strategy-section">
        <div class="strategy-section-header">
          <h4>Rotina semanal fixa</h4>
          <span>Treino com blocos curtos e consistentes</span>
        </div>
        <div class="strategy-schedule">
          ${STUDY_STRATEGY.weeklyRoutine
            .map(
              (item) => `
                <article class="strategy-card">
                  <strong>${escapeHtml(item.day)}</strong>
                  <ul>
                    ${item.blocks.map((block) => `<li>${escapeHtml(block)}</li>`).join('')}
                  </ul>
                </article>
              `
            )
            .join('')}
        </div>
      </section>

      <section class="strategy-section">
        <div class="strategy-section-header">
          <h4>Fases do calendario</h4>
          <span>18/05 a 08/08</span>
        </div>
        <div class="strategy-timeline">
          ${STUDY_STRATEGY.phases
            .map(
              (phase) => `
                <article class="strategy-phase">
                  <strong>${escapeHtml(phase.title)}</strong>
                  <small>${escapeHtml(phase.period)}</small>
                  <p>${escapeHtml(phase.goal)}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </section>

      <section class="strategy-double-grid">
        <article class="strategy-section strategy-priority-panel">
          <div class="strategy-section-header">
            <h4>Prioridade real</h4>
            <span>Foco em classificacao</span>
          </div>
          <div class="strategy-priority-list">
            ${STUDY_STRATEGY.priorities
              .map(
                (tier) => `
                  <div class="strategy-priority-row">
                    <strong>${escapeHtml(tier.tier)}</strong>
                    <div class="strategy-tags">${tier.items
                      .map((item) => `<span class="strategy-tag">${escapeHtml(item)}</span>`)
                      .join('')}</div>
                  </div>
                `
              )
              .join('')}
          </div>
        </article>

        <article class="strategy-section strategy-priority-panel">
          <div class="strategy-section-header">
            <h4>Redacao</h4>
            <span>Treino desde ja</span>
          </div>
          <ul class="strategy-list">
            ${STUDY_STRATEGY.redactionGoals
              .map((goal) => `<li>${escapeHtml(goal)}</li>`)
              .join('')}
          </ul>
        </article>
      </section>

      <section class="strategy-section">
        <div class="strategy-section-header">
          <h4>Metas finais</h4>
          <span>Checar toda semana</span>
        </div>
        <div class="strategy-checklist">
          ${STUDY_STRATEGY.checkpoints
            .map((checkpoint) => `<div class="strategy-checkpoint">${escapeHtml(checkpoint)}</div>`)
            .join('')}
        </div>
      </section>

      <section class="strategy-section">
        <div class="strategy-section-header">
          <h4>Calendario detalhado</h4>
          <span>${filteredCompletedTasks}/${filteredTotalTasks} tarefas concluidas em ${getStrategyCalendarFilterLabel(activeStudyCalendarFilter)}</span>
        </div>
        <div class="strategy-calendar">
          ${filteredCalendar
            .map((day) => {
              const progress = getStudyPlanCompletion(day.id, day.tasks);
              const isComplete = progress.total > 0 && progress.completed === progress.total;

              return `
                <article class="strategy-day${isComplete ? ' complete' : ''}${day.id === currentDayId ? ' current' : ''}" data-study-day="${day.id}">
                  <div class="strategy-day-header">
                    <div>
                      <strong>${escapeHtml(day.date)}</strong>
                      <span>${escapeHtml(day.title)}</span>
                      <small class="strategy-day-week">${escapeHtml(day.weekTitle)}</small>
                    </div>
                    <div class="strategy-day-meta">
                      <span class="strategy-priority-badge ${getStudyPriorityTier(Math.floor(STUDY_STRATEGY.calendar.findIndex((item) => item.id === day.id) / 7)).toLowerCase().replace(/\s+/g, '-')}">${getStudyPriorityTier(Math.floor(STUDY_STRATEGY.calendar.findIndex((item) => item.id === day.id) / 7))}</span>
                      <button type="button" class="strategy-day-toggle" data-day-toggle="${day.id}">${isComplete ? 'Limpar' : 'Concluir dia'}</button>
                    </div>
                  </div>
                  <small class="strategy-day-focus">${escapeHtml(day.focus)}</small>
                  <small class="strategy-day-goal">Semana: ${escapeHtml(day.weekGoal)}</small>
                  <div class="strategy-day-progress">
                    <div class="strategy-day-track"><div class="strategy-day-fill" style="width:${progress.percent}%"></div></div>
                    <span>${progress.completed}/${progress.total}</span>
                  </div>
                  <div class="strategy-task-list">
                    ${day.tasks
                      .map((task, taskIndex) => {
                        const checked = Boolean(getStudyPlanDayProgress(day.id)[taskIndex]);
                        return `
                          <label class="strategy-task${checked ? ' done' : ''}">
                            <input type="checkbox" data-study-task="${day.id}" data-task-index="${taskIndex}" ${checked ? 'checked' : ''} />
                            <span>${escapeHtml(task)}</span>
                          </label>
                        `;
                      })
                      .join('')}
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      </section>
    </section>
  `;

  content.querySelectorAll('[data-study-task]').forEach((input) => {
    input.addEventListener('change', () => {
      const dayId = input.getAttribute('data-study-task');
      const taskIndex = Number(input.getAttribute('data-task-index'));
      if (!dayId || Number.isNaN(taskIndex)) {
        return;
      }

      setStudyPlanTaskState(dayId, taskIndex, input.checked);
      void saveState();
      renderStrategyContent();
    });
  });

  content.querySelectorAll('[data-day-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const dayId = button.getAttribute('data-day-toggle');
      const day = STUDY_STRATEGY.calendar.find((item) => item.id === dayId);
      if (!day) {
        return;
      }

      const progress = getStudyPlanCompletion(day.id, day.tasks);
      const shouldComplete = progress.completed !== progress.total;
      setStudyPlanDayState(day.id, day.tasks, shouldComplete);
      void saveState();
      renderStrategyContent();
    });
  });

  content.querySelectorAll('[data-strategy-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextFilter = button.getAttribute('data-strategy-filter') || 'all';
      activeStudyCalendarFilter = nextFilter;
      renderStrategyContent();
    });
  });

  const jumpButton = content.querySelector('[data-strategy-jump-current]');
  if (jumpButton && currentDayId) {
    jumpButton.addEventListener('click', () => {
      const target = content.querySelector(`[data-study-day="${currentDayId}"]`);
      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('pulse-focus');
      window.setTimeout(() => target.classList.remove('pulse-focus'), 1200);
    });
  }
}

function renderMainPanelContent() {
  const campaignTabs = document.getElementById('campaignTabs');

  if (activePanelView === 'historico') {
    campaignTabs.style.display = 'none';
    renderHistoryContent();
    return;
  }

  if (activePanelView === 'estrategia') {
    campaignTabs.style.display = 'none';
    renderStrategyContent();
    return;
  }

  if (activePanelView === 'erros') {
    campaignTabs.style.display = 'none';
    renderErrosContent();
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
  const todayKey = getTodayKey();
  const campaignTargets = DAILY_CAMPAIGN_TARGETS[campaign.id] || null;
  const activeTarget = campaignTargets?.[activeAttribute] || 0;
  const activeTodayEntry = getDailySubjectEntry(todayKey, campaign.id, activeAttribute);
  const activeTodayAttempts = activeTodayEntry.easy + activeTodayEntry.hard + activeTodayEntry.wrong;
  const activeTargetProgress = activeTarget > 0 ? Math.min(100, Math.round((activeTodayAttempts / activeTarget) * 100)) : 0;

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
        .map((attribute) => {
          const target = campaignTargets?.[attribute] || 0;
          const todayEntry = getDailySubjectEntry(todayKey, campaign.id, attribute);
          const todayAttempts = todayEntry.easy + todayEntry.hard + todayEntry.wrong;
          const targetLabel = target > 0 ? `<small class="subject-target-badge${todayAttempts >= target ? ' done' : ''}">${todayAttempts}/${target} hoje</small>` : '';
          return `<button class="subject-button${attribute === activeAttribute ? ' active' : ''}" type="button" data-attribute="${attribute}"><span>${attribute}</span>${targetLabel}</button>`;
        })
        .join('')}
    </div>
    <article class="subject-panel">
      <header class="subject-panel-header">
        <div class="subject-title-wrap">
          <h4>${activeAttribute}</h4>
          <small>${activeTarget > 0 ? `Meta diaria: ${activeTodayAttempts}/${activeTarget} questoes` : 'Registro rapido da materia'}</small>
        </div>
        <div class="subject-head-metrics">
          <span class="subject-metric-pill">${accuracy.percentage}</span>
          <span class="subject-metric-pill ghost">${accuracy.ratio}</span>
        </div>
      </header>
      ${activeTarget > 0
        ? `<div class="subject-goal-strip${activeTodayAttempts >= activeTarget ? ' complete' : ''}">
            <div class="subject-goal-track"><div class="subject-goal-fill" style="width:${activeTargetProgress}%"></div></div>
            <strong>${activeTodayAttempts}/${activeTarget}</strong>
          </div>`
        : ''}
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
      const label = delta > 0
        ? `Registrar +1 em ${resultType === 'easy' ? UI_LABELS.easy : resultType === 'hard' ? UI_LABELS.hard : UI_LABELS.wrong}?`
        : `Remover 1 de ${resultType === 'easy' ? UI_LABELS.easy : resultType === 'hard' ? UI_LABELS.hard : UI_LABELS.wrong}?`;
      showModal(label, () => {
        updateCounter(campaign.id, activeAttribute, resultType, delta);
      });
    });
  });

  content.innerHTML = '';
  content.appendChild(fragment);
}

function showModal(message, onConfirm) {
  const overlay = document.getElementById('confirmModal');
  const msgEl = document.getElementById('confirmModalMessage');
  const okBtn = document.getElementById('confirmModalOk');
  const cancelBtn = document.getElementById('confirmModalCancel');

  msgEl.textContent = message;
  overlay.hidden = false;

  function cleanup() {
    overlay.hidden = true;
    okBtn.removeEventListener('click', handleOk);
    cancelBtn.removeEventListener('click', handleCancel);
    overlay.removeEventListener('click', handleOverlayClick);
  }

  function handleOk() {
    cleanup();
    onConfirm();
  }

  function handleCancel() {
    cleanup();
  }

  function handleOverlayClick(event) {
    if (event.target === overlay) {
      cleanup();
    }
  }

  okBtn.addEventListener('click', handleOk);
  cancelBtn.addEventListener('click', handleCancel);
  overlay.addEventListener('click', handleOverlayClick);
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
    showModal('Isso vai apagar todo o progresso salvo. Deseja continuar?', () => {
      resetState();
    });
  });

  document.getElementById('saveTodayButton').addEventListener('click', () => {
    showModal('Salvar o resumo do dia de hoje?', () => {
      saveTodaySummary();
    });
  });

  document.getElementById('resetTodayButton').addEventListener('click', () => {
    showModal('Zerar a evolucao diaria de hoje? Isso limpa os dados do dia atual.', () => {
      resetTodaySummary();
    });
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