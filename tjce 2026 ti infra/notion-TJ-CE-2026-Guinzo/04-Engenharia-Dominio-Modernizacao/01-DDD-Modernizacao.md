# 📐 Macrotema 4: Engenharia de Domínio e Modernização Arquitetural

## 📋 Tópicos do Edital

- [ ] 7.1 DDD Estratégico: Domínios e Subdomínios (Core, Supporting, Generic)
- [ ] Contextos delimitados (Bounded Contexts)
- [ ] 7.2 Mapeamento de Contextos (Context Mapping): Linguagem Ubíqua e estratégias de integração
- [ ] 7.3 Decomposição de Monólitos: Fronteiras de negócio para migração a microsserviços
- [ ] 7.4 Migração de Legados: Padrão Strangler Fig
- [ ] 7.5 API-led Connectivity: APIs como produtos de negócio
- [ ] Conceitos de APIs de Sistema, de Processo e de Experiência
- [ ] 7.6 Gestão de Dívida Técnica: Impacto no roadmap e negociação refatoração vs. novas funcionalidades
- [ ] 7.7 Modernização sob a Ótica de Negócio: Justificativa de investimento e coexistência
- [ ] 7.8 Interoperabilidade Nacional: PDPJ-Br (Plataforma Digital do Poder Judiciário)
- [ ] 7.9 Ciclo de Vida de Aplicações: Modelo TIME

---

## 🎯 Como a FCC cobra este tema

A FCC tende a cobrar este macrotema com questões conceituais e de classificação:

**Padrões de questão mais comuns:**
- "Segundo o DDD, o subdomínio que representa o diferencial competitivo é chamado de..."
- "No padrão Strangler Fig, a migração ocorre de forma..." (gradual, não big bang)
- "Na abordagem API-led Connectivity, a camada responsável por orquestrar lógica de negócio é..."
- "O padrão de integração que cria uma camada de tradução para proteger o modelo interno é..."

### Dicas FCC:
1. DDD: saiba classificar subdomínios e justificar cada classificação
2. Context Mapping: decore TODOS os padrões e saiba quando usar cada um
3. Strangler Fig: a FCC pode usar o nome "Estrangulamento de Legado"
4. API-led: 3 camadas na ordem (Sistema → Processo → Experiência)
5. Modelo TIME: 4 categorias — associe cada uma a um cenário prático
6. PDPJ-Br: foco em interoperabilidade e padronização nacional

---

## 📝 Conteúdo Detalhado

---

## 7.1 Domain-Driven Design (DDD) Estratégico

### O que é DDD?

Domain-Driven Design é uma abordagem de desenvolvimento de software que coloca o **domínio do negócio** no centro de todas as decisões de design. Foi proposto por Eric Evans no livro "Domain-Driven Design: Tackling Complexity in the Heart of Software" (2003).

**Premissa fundamental:** A complexidade de um software está no domínio, não na tecnologia. Portanto, o modelo de domínio deve guiar a arquitetura.

DDD se divide em duas partes:
- **DDD Estratégico:** visão macro — como dividir o sistema em partes (o que o edital cobra)
- **DDD Tático:** visão micro — padrões de implementação (Entities, Value Objects, Aggregates, Repositories)

> ⚠️ O edital foca no DDD **Estratégico**. Não perca tempo com padrões táticos.

---

### Domínio e Subdomínios

**Domínio** = o espaço do problema que o software resolve. No caso do TJ-CE, o domínio é o "sistema de justiça" (processos judiciais, tramitação, decisões, etc.).

Todo domínio é composto por **subdomínios**, classificados em 3 tipos:

| Tipo | Definição | Investimento | Exemplo TJ-CE |
|------|-----------|:------------:|---------------|
| **Core Domain** | O que diferencia a organização. É a razão de existir do software. Vantagem competitiva. | Máximo (time interno, senior) | Tramitação processual eletrônica, distribuição inteligente de processos |
| **Supporting Subdomain** | Necessário para o core funcionar, mas não é o diferencial. Específico da organização. | Médio (pode ter time dedicado) | Gestão de pautas de audiência, controle de prazos processuais |
| **Generic Subdomain** | Problema já resolvido pelo mercado. Não é específico da organização. | Mínimo (comprar/terceirizar) | Autenticação, e-mail, geração de PDF, notificações |

**Como a FCC pode cobrar:**
> "Um tribunal está desenvolvendo um sistema. O módulo de autenticação de usuários é classificado como subdomínio..."
> Resposta: **Generic** (problema genérico, já resolvido pelo mercado)

**Regra prática para classificar:**
- Se outra organização do mesmo setor teria o MESMO problema → Generic
- Se é específico do seu contexto mas não é o diferencial → Supporting
- Se é O MOTIVO pelo qual o software existe → Core

---

### Bounded Context (Contexto Delimitado)

**Definição:** É a fronteira explícita dentro da qual um modelo de domínio específico se aplica. Dentro de um Bounded Context, todos os termos têm significado único e consistente.

**Por que existe?** Porque o mesmo termo pode significar coisas diferentes em partes diferentes do sistema.

**Exemplo prático no judiciário:**

O termo **"Parte"** pode significar:
- No contexto de **Processo Judicial:** autor, réu, terceiro interessado (com CPF, advogado, polo)
- No contexto de **Financeiro:** quem paga custas (com dados bancários, valores devidos)
- No contexto de **Comunicação:** destinatário de intimação (com endereço, e-mail, preferência de canal)

Cada um desses é um **Bounded Context diferente**, com seu próprio modelo de "Parte".

**Características de um Bounded Context:**
- Tem fronteira linguística clara (termos definidos)
- Tem seu próprio modelo de dados
- Pode ser implementado por um time independente
- Pode usar tecnologia diferente dos demais
- Se comunica com outros contextos via interfaces bem definidas

**Relação com Microsserviços:**
- Um Bounded Context frequentemente mapeia para um ou mais microsserviços
- Mas NÃO é uma regra 1:1 — um contexto pode ter vários serviços internos
- A fronteira do contexto é de **negócio**, não técnica

---

### Linguagem Ubíqua (Ubiquitous Language)

**Definição:** Vocabulário compartilhado entre desenvolvedores e especialistas de domínio, usado consistentemente no código, na documentação e na comunicação verbal.

**Regras:**
- Válida DENTRO de um Bounded Context específico
- O mesmo termo pode ter definições diferentes em contextos diferentes
- Deve aparecer no código-fonte (nomes de classes, métodos, variáveis)
- Evolui junto com o entendimento do domínio

**Exemplo:**
```
// Linguagem Ubíqua no contexto "Tramitação Processual"
class Processo {
    Distribuicao distribuicao;
    List<Movimentacao> movimentacoes;
    void tramitarPara(Vara destino);
    void suspender(MotivoSuspensao motivo);
}
```

**Anti-padrão:** usar termos técnicos genéricos (Manager, Handler, Processor) em vez de termos do domínio.

---

## 7.2 Context Mapping (Mapeamento de Contextos)

### O que é?

Context Mapping é a técnica de documentar os **relacionamentos entre Bounded Contexts**. Define como diferentes partes do sistema se comunicam e quem tem poder sobre o modelo compartilhado.

### Padrões de Relacionamento (TODOS — decore para a FCC)

| Padrão | Descrição Detalhada | Relação de Poder | Exemplo |
|--------|--------------------|-----------------:|---------|
| **Shared Kernel** | Dois contextos compartilham um subconjunto do modelo (código/banco). Mudanças requerem acordo mútuo. | Simétrica | Dois times compartilham a entidade "Pessoa" básica |
| **Customer-Supplier** | Upstream (fornecedor) entrega o que o downstream (cliente) precisa. Cliente pode negociar. | Upstream > Downstream | Time de Cadastro (upstream) fornece dados para time de Processo (downstream) |
| **Conformist** | Downstream aceita o modelo do upstream SEM poder de negociação. Conforma-se ao que recebe. | Upstream >> Downstream | Integração com sistema externo do CNJ — você aceita o formato deles |
| **Anti-Corruption Layer (ACL)** | Camada de tradução que protege o modelo interno de influências externas. Isola o contexto. | Downstream se protege | Traduzir dados do sistema legado para o modelo novo |
| **Open Host Service (OHS)** | Upstream expõe um protocolo/API aberta e documentada para múltiplos consumidores. | Upstream serve muitos | API pública do tribunal para advogados e partes |
| **Published Language (PL)** | Linguagem documentada e versionada para troca de informações (geralmente junto com OHS). | Neutra | XML/JSON Schema padronizado pelo CNJ |
| **Separate Ways** | Contextos decidem NÃO se integrar. Cada um resolve o problema independentemente. | Sem relação | Dois módulos que não precisam trocar dados |
| **Partnership** | Dois contextos cooperam mutuamente. Sucesso/falha é compartilhado. Coordenação ativa. | Simétrica | Dois times que dependem um do outro para uma entrega conjunta |

### Diagrama de Context Map

```
┌─────────────────┐         ┌─────────────────┐
│   Tramitação    │◄──ACL──►│  Sistema Legado  │
│   Processual    │         │   (Mainframe)    │
└────────┬────────┘         └─────────────────┘
         │
    Customer-Supplier
         │
         ▼
┌─────────────────┐         ┌─────────────────┐
│   Distribuição  │◄─OHS/PL─┤   Portal do     │
│   de Processos  │         │   Advogado      │
└─────────────────┘         └─────────────────┘
```

### Quando usar cada padrão (cenários FCC)

- **"O time não tem poder para mudar a API do fornecedor externo"** → Conformist ou ACL
- **"Precisamos proteger nosso modelo das mudanças do sistema legado"** → ACL
- **"Vários sistemas externos precisam consumir nossos dados"** → Open Host Service + Published Language
- **"Dois times precisam compartilhar uma parte do modelo"** → Shared Kernel
- **"Os sistemas não precisam se comunicar"** → Separate Ways

---

## 7.3 Decomposição de Monólitos

### Por que decompor?

Monólitos se tornam problemáticos quando:
- Deploy de uma parte afeta o sistema inteiro
- Times pisam uns nos outros (conflitos de merge)
- Escalabilidade é "tudo ou nada"
- Uma falha derruba todo o sistema
- Tecnologia fica presa a decisões antigas

### Estratégias de Decomposição

**1. Por Bounded Context (recomendada pelo DDD):**
- Identificar fronteiras de negócio usando DDD Estratégico
- Cada contexto vira um serviço (ou grupo de serviços)
- Critério: coesão de domínio, não técnica

**2. Por Capacidade de Negócio (Business Capability):**
- Mapear o que a organização FAZ (não como faz)
- Cada capacidade = candidato a serviço
- Ex: "Distribuir Processos", "Gerenciar Pautas", "Emitir Certidões"

**3. Por Subdomínio:**
- Usar a classificação Core/Supporting/Generic
- Core → microsserviço próprio com time dedicado
- Generic → serviço comprado ou SaaS

### Critérios para definir fronteiras

| Critério | Boa fronteira | Má fronteira |
|----------|--------------|--------------|
| Acoplamento | Baixo entre serviços | Alto (muitas chamadas síncronas) |
| Coesão | Alta dentro do serviço | Baixa (faz coisas não relacionadas) |
| Autonomia | Time pode deployar sozinho | Precisa coordenar com outros |
| Dados | Cada serviço tem seu banco | Banco compartilhado |
| Mudanças | Mudam juntas → mesmo serviço | Mudam independentemente → serviços separados |

### Armadilhas comuns (a FCC pode cobrar como "incorreto")
- ❌ Decompor por camada técnica (um serviço para UI, outro para lógica, outro para dados)
- ❌ Criar microsserviços muito pequenos (nano-serviços)
- ❌ Manter banco de dados compartilhado entre serviços
- ❌ Fazer decomposição "big bang" (tudo de uma vez)
- ✅ Decompor gradualmente, começando pelo domínio com menor acoplamento

---

## 7.4 Migração de Legados: Padrão Strangler Fig

### Origem do nome

Inspirado na **figueira estranguladora** (Strangler Fig) — uma planta que cresce ao redor de uma árvore hospedeira, eventualmente substituindo-a completamente. Martin Fowler cunhou o termo em 2004.

### Como funciona

```
FASE 1: Coexistência
┌──────────────────────────────────────────┐
│              PROXY / FACHADA             │
│  (intercepta todas as requisições)       │
└──────────┬───────────────┬───────────────┘
           │               │
           ▼               ▼
┌──────────────┐   ┌──────────────┐
│  MONÓLITO    │   │ NOVO SERVIÇO │
│  (legado)    │   │ (feature X)  │
│              │   │              │
│ [A][B][C][D] │   │    [A']      │
└──────────────┘   └──────────────┘

FASE 2: Migração progressiva
┌──────────────────────────────────────────┐
│              PROXY / FACHADA             │
└──────────┬───────────────┬───────────────┘
           │               │
           ▼               ▼
┌──────────────┐   ┌──────────────┐
│  MONÓLITO    │   │ NOVOS SERVIÇOS│
│  (legado)    │   │              │
│    [C][D]    │   │ [A'][B']     │
└──────────────┘   └──────────────┘

FASE 3: Conclusão (legado desligado)
┌──────────────────────────────────────────┐
│              PROXY / FACHADA             │
└──────────────────────┬───────────────────┘
                       │
                       ▼
               ┌──────────────┐
               │ NOVOS SERVIÇOS│
               │[A'][B'][C'][D']│
               └──────────────┘
```

### Etapas detalhadas

1. **Inserir um proxy/fachada** na frente do monólito (intercepta todo o tráfego)
2. **Implementar nova funcionalidade** no sistema novo (não no legado)
3. **Redirecionar tráfego** da funcionalidade migrada para o novo serviço
4. **Repetir** para cada funcionalidade
5. **Desligar o legado** quando não houver mais tráfego para ele

### Vantagens
- Risco baixo (migração incremental)
- Rollback fácil (basta redirecionar de volta)
- Valor entregue a cada migração
- Não requer "freeze" do legado durante a migração
- Permite validar a nova arquitetura gradualmente

### Variações do padrão
- **Strangler Fig com Event Interception:** captura eventos do legado para alimentar o novo sistema
- **Strangler Fig com Asset Capture:** migra dados gradualmente junto com funcionalidades
- **Branch by Abstraction:** cria abstração no código para alternar entre implementação antiga e nova

### Comparação com outras estratégias de migração

| Estratégia | Risco | Velocidade | Quando usar |
|-----------|:-----:|:----------:|-------------|
| **Big Bang** (reescrever tudo) | 🔴 Alto | Rápido (se der certo) | Sistemas muito pequenos |
| **Strangler Fig** (gradual) | 🟢 Baixo | Médio | Sistemas grandes em produção |
| **Parallel Run** (rodar ambos) | 🟡 Médio | Lento | Quando precisa validar resultados |
| **Feature Toggle** (flag) | 🟢 Baixo | Rápido | Funcionalidades isoladas |

---

## 7.5 API-led Connectivity

### Origem

Conceito criado pela **MuleSoft** (agora Salesforce). Propõe organizar APIs em 3 camadas com responsabilidades distintas, tratando APIs como **produtos de negócio** (não apenas interfaces técnicas).

### As 3 Camadas

```
┌─────────────────────────────────────────────────┐
│           EXPERIENCE APIs (Experiência)          │
│  Adaptadas para cada canal/consumidor            │
│  Ex: API Mobile, API Portal Web, API Chatbot     │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│            PROCESS APIs (Processo)               │
│  Orquestram lógica de negócio                    │
│  Combinam dados de múltiplas System APIs         │
│  Ex: "Consultar situação completa do processo"   │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│            SYSTEM APIs (Sistema)                 │
│  Acesso direto a sistemas de registro            │
│  Encapsulam complexidade do backend              │
│  Ex: API do banco de dados, API do ERP, API SAP  │
└─────────────────────────────────────────────────┘
```

### Detalhamento de cada camada

| Camada | Responsabilidade | Quem consome | Muda quando... | Exemplo TJ-CE |
|--------|-----------------|--------------|----------------|---------------|
| **System API** | Expor dados/funcionalidades de um sistema específico. Abstrai a complexidade técnica do backend. | Process APIs | O sistema de registro muda | API que lê processos do PJe, API que acessa o banco de dados de partes |
| **Process API** | Orquestrar lógica de negócio. Combinar chamadas a múltiplas System APIs. Não tem estado próprio. | Experience APIs | A regra de negócio muda | "Obter visão 360 do processo" (combina dados de tramitação + partes + movimentações) |
| **Experience API** | Adaptar dados para um canal/consumidor específico. Formatar, filtrar, paginar. | Usuário final (app, web, parceiro) | O canal/consumidor muda | API otimizada para o app mobile do advogado (menos dados, paginação) |

### Benefícios da abordagem
- **Reuso:** System APIs são reutilizadas por múltiplas Process APIs
- **Agilidade:** mudar o canal (Experience) não afeta a lógica (Process)
- **Governança:** cada camada tem ciclo de vida independente
- **Desacoplamento:** mudança no backend (System) não propaga para cima

### APIs como Produtos de Negócio

Tratar APIs como produtos significa:
- Ter um **Product Owner** para a API
- Definir **SLAs** (disponibilidade, latência, throughput)
- Ter **documentação** clara e atualizada (OpenAPI/Swagger)
- Gerenciar **versionamento** (v1, v2) sem quebrar consumidores
- Monitorar **adoção e uso** (quem consome, quanto consome)
- Ter **portal de desenvolvedor** para onboarding

---

## 7.6 Gestão de Dívida Técnica

### Definição

**Dívida técnica** = decisões de design/implementação que facilitam o curto prazo mas geram custo futuro. Analogia financeira: você "empresta" qualidade hoje e "paga juros" depois (em forma de bugs, lentidão, dificuldade de manutenção).

### Quadrante de Martin Fowler

|  | **Prudente** | **Imprudente** |
|--|:------------:|:--------------:|
| **Deliberada** | "Sabemos as consequências, mas precisamos entregar agora. Vamos pagar depois." | "Não temos tempo para fazer direito." (negligência consciente) |
| **Inadvertida** | "Agora que terminamos, percebemos como deveria ter sido feito." (aprendizado) | "O que é separação de responsabilidades?" (incompetência) |

### Tipos de Dívida Técnica

| Tipo | Exemplo | Impacto |
|------|---------|---------|
| **Código** | Duplicação, complexidade ciclomática alta, nomes ruins | Manutenção lenta |
| **Arquitetura** | Acoplamento excessivo, camadas violadas | Mudanças arriscadas |
| **Testes** | Cobertura baixa, testes frágeis | Bugs em produção |
| **Documentação** | Desatualizada ou inexistente | Onboarding lento |
| **Infraestrutura** | Versões desatualizadas, configuração manual | Vulnerabilidades |
| **Dependências** | Bibliotecas obsoletas, sem atualização | Segurança comprometida |

### Negociação: Refatoração vs. Novas Funcionalidades

**Estratégias para o Product Owner/Manager:**
- Reservar % fixo do sprint para dívida técnica (ex: 20%)
- Vincular dívida a riscos de negócio (não apenas técnicos)
- Usar métricas: tempo de deploy, taxa de bugs, velocity decrescente
- Priorizar dívida que bloqueia entregas futuras

**Como justificar para stakeholders:**
- "Se não refatorarmos X, a feature Y vai levar 3x mais tempo"
- "A dívida no módulo Z está causando N bugs/mês em produção"
- "Atualizar a dependência W elimina 5 vulnerabilidades críticas"

---

## 7.7 Modernização sob a Ótica de Negócio

### Justificativa de Investimento

Para aprovar um projeto de modernização, é preciso demonstrar valor de negócio:

| Argumento | Métrica |
|-----------|---------|
| Redução de custo operacional | R$/mês economizado em infraestrutura/suporte |
| Aumento de produtividade | Horas/mês liberadas para atividades-fim |
| Redução de risco | Probabilidade × impacto de falhas evitadas |
| Conformidade regulatória | Multas/sanções evitadas |
| Melhoria na experiência do usuário | NPS, tempo de atendimento, satisfação |
| Agilidade para novas demandas | Time-to-market de novas funcionalidades |

### Coexistência entre Novo e Antigo

Durante a modernização, os dois sistemas coexistem. Desafios:

- **Consistência de dados:** manter dados sincronizados entre legado e novo
- **Experiência do usuário:** evitar que o usuário perceba a transição
- **Operação:** monitorar e manter dois sistemas simultaneamente
- **Treinamento:** equipe precisa conhecer ambos os sistemas
- **Rollback:** ter plano de contingência se o novo falhar

**Padrões de coexistência:**
- **Parallel Run:** ambos processam, compara resultados
- **Shadow Mode:** novo processa mas não serve ao usuário (validação)
- **Canary Release:** % pequeno de usuários usa o novo
- **Feature Toggle:** liga/desliga funcionalidades por configuração

---

## 7.8 Interoperabilidade Nacional: PDPJ-Br

### O que é a PDPJ-Br?

**Plataforma Digital do Poder Judiciário Brasileiro** — iniciativa do CNJ para padronizar e integrar os sistemas judiciais de todo o país.

### Objetivos
- Interoperabilidade entre tribunais (TJ, TRF, TRT, TST, STJ, STF)
- Padronização de APIs e modelos de dados
- Reutilização de componentes (microsserviços compartilhados)
- Redução de custos (evitar que cada tribunal reinvente a roda)
- Transparência e acesso unificado à informação judicial

### Princípios Arquiteturais
- **Microsserviços:** cada funcionalidade é um serviço independente
- **APIs padronizadas:** contratos definidos pelo CNJ (OpenAPI)
- **Event-driven:** comunicação assíncrona entre serviços
- **Cloud-native:** preparado para execução em nuvem
- **Segurança:** autenticação centralizada, autorização por perfil

### Componentes Conceituais (visão estrutural)
- Barramento de serviços (integração entre tribunais)
- Catálogo de APIs (discovery e documentação)
- Gestão de identidade (SSO entre sistemas judiciais)
- Modelo Nacional de Interoperabilidade (MNI) — padrão de dados

### Relevância para o concurso
- O TJ-CE precisa integrar seus sistemas à PDPJ-Br
- Questões podem cobrar: princípios de interoperabilidade, papel do CNJ, padrões adotados
- Relaciona-se com: API-led Connectivity, microsserviços, DDD

---

## 7.9 Ciclo de Vida de Aplicações: Modelo TIME

### O que é?

Modelo de **gestão de portfólio de aplicações** que classifica cada sistema em uma das 4 categorias de ação, baseado em seu valor de negócio e qualidade técnica.

### As 4 Categorias

```
                    QUALIDADE TÉCNICA
                    Alta            Baixa
                ┌───────────┬───────────────┐
   VALOR    Alto│  INVEST   │   MIGRATE     │
   DE           │  (Investir)│  (Migrar)     │
   NEGÓCIO      ├───────────┼───────────────┤
            Baixo│ TOLERATE  │  ELIMINATE    │
                │ (Tolerar)  │  (Eliminar)   │
                └───────────┴───────────────┘
```

### Detalhamento

| Categoria | Valor | Qualidade | Ação | Exemplo TJ-CE |
|-----------|:-----:|:---------:|------|---------------|
| **Tolerate** | Baixo | Alta | Manter como está. Não investir, mas não desligar. Custo de manutenção aceitável. | Sistema de controle de patrimônio (funciona bem, pouco uso) |
| **Invest** | Alto | Alta | Evoluir, adicionar funcionalidades, escalar. É o futuro. | PJe (sistema processual eletrônico principal) |
| **Migrate** | Alto | Baixa | Substituir por solução melhor. O valor justifica o investimento na migração. | Sistema legado de tramitação que ainda é crítico mas está obsoleto |
| **Eliminate** | Baixo | Baixa | Descontinuar. Não vale manter nem migrar. Desligar. | Sistema antigo que ninguém usa, com tecnologia obsoleta |

### Como aplicar na prática

1. **Inventariar** todas as aplicações do portfólio
2. **Avaliar** cada uma em duas dimensões (valor de negócio + qualidade técnica)
3. **Classificar** no quadrante TIME
4. **Planejar ações** conforme a categoria
5. **Revisar periodicamente** (aplicações mudam de quadrante ao longo do tempo)

### Relação com outros conceitos do edital
- **Eliminate** → processo de decommissioning (Macrotema 1, item 1.2)
- **Migrate** → Strangler Fig Pattern (item 7.4)
- **Invest** → onde aplicar DDD e modernização
- **Tolerate** → candidato a Generic Subdomain (terceirizar/manter)

---

## 🧪 Questões Modelo (Estilo FCC)

**Q1.** No Domain-Driven Design Estratégico, um subdomínio que resolve um problema comum a diversas organizações e que pode ser atendido por soluções de mercado é classificado como:

a) Core Domain  
b) Supporting Subdomain  
c) Generic Subdomain ✅  
d) Shared Kernel  
e) Bounded Context  

---

**Q2.** O padrão de integração entre Bounded Contexts que cria uma camada intermediária de tradução para proteger o modelo interno de um contexto contra mudanças e complexidades de um sistema externo é denominado:

a) Conformist  
b) Open Host Service  
c) Published Language  
d) Anti-Corruption Layer ✅  
e) Shared Kernel  

---

**Q3.** Na abordagem API-led Connectivity, a camada responsável por orquestrar a lógica de negócio, combinando dados de múltiplas fontes, é chamada de:

a) System API  
b) Experience API  
c) Process API ✅  
d) Gateway API  
e) Integration API  

---

**Q4.** O padrão de migração de sistemas legados que propõe a substituição gradual de funcionalidades, permitindo que o sistema antigo e o novo coexistam durante a transição, é conhecido como:

a) Big Bang Migration  
b) Parallel Run  
c) Strangler Fig ✅  
d) Blue-Green Deployment  
e) Canary Release  

---

**Q5.** No modelo TIME de gestão de portfólio de aplicações, um sistema com alto valor de negócio mas baixa qualidade técnica deve ser classificado na categoria:

a) Tolerate  
b) Invest  
c) Migrate ✅  
d) Eliminate  
e) Sustain  

---

## 📚 Fontes Recomendadas

### Livros
- "Domain-Driven Design: Tackling Complexity in the Heart of Software" — Eric Evans (2003)
- "Implementing Domain-Driven Design" — Vaughn Vernon (2013)
- "Domain-Driven Design Distilled" — Vaughn Vernon (2016) ← mais conciso, bom para concurso
- "Building Microservices" — Sam Newman (capítulos sobre decomposição)

### Artigos e Referências Online
- Martin Fowler — "StranglerFigApplication" (martinfowler.com)
- Martin Fowler — "BoundedContext" (martinfowler.com)
- MuleSoft — "What is API-led Connectivity?" (whitepaper oficial)
- Gartner — TIME Model for Application Portfolio Management

### Normativos
- Resoluções do CNJ sobre PDPJ-Br e interoperabilidade
- Modelo Nacional de Interoperabilidade (MNI) do Judiciário

### Questões para praticar
- FCC — TRT, TRF, TJ (buscar questões sobre DDD, microsserviços, APIs)
- CESPE/Cebraspe — TCU, STJ (complementar, estilo diferente mas mesmo conteúdo)
