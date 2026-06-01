# 🛠 Macrotema 2: Análise de Negócio, Requisitos e Design Estratégico

## 📋 Tópicos do Edital

- [ ] 2.1 Técnicas de Elicitação de Requisitos: Entrevistas, questionários e observação
- [ ] Workshops de requisitos e análise de documentos
- [ ] 2.2 Análise de Processos de Negócio (BPMN 2.0): Modelagem AS-IS e TO-BE
- [ ] 2.3 Especificação de Requisitos: Funcionais, não-funcionais e regras de negócio
- [ ] 2.4 Documentação Ágil: User Stories e Critérios de Aceitação
- [ ] Definição de Pronto (DoD) e Definição de Apto (DoR)
- [ ] 2.5 Avaliação Operacional: Gap Analysis e análise de viabilidade técnica e de negócio
- [ ] 3.1 Design Thinking: Empatia, definição e ideação (Mapa mental, brainwriting, SCAMPER)
- [ ] Escrita de PRD, jobs to be done e future backwards
- [ ] Prototipação e testes em Design Thinking
- [ ] 3.2 Product Discovery: Exploração de problemas e validação de soluções
- [ ] 3.3 UX/UI: Usabilidade e acessibilidade digital (e-MAG)
- [ ] Arquitetura de informação e prototipação de baixa e alta fidelidade
- [ ] 3.4 Planejamento Estratégico de TI: OKRs e alinhamento institucional
- [ ] 3.5 Roadmaps de Produto: Tipos e comunicação da evolução

---

## 🎯 Como a FCC cobra este tema

- Elementos da notação BPMN 2.0 (eventos, atividades, gateways, fluxos)
- Diferença entre requisitos funcionais e não-funcionais
- Estrutura de User Stories (formato "Como... Quero... Para que...")
- Fases do Design Thinking
- Conceitos de UX/UI e acessibilidade

### Dicas FCC:
1. BPMN: decore os **tipos de gateway** (exclusivo, paralelo, inclusivo, baseado em evento)
2. Saiba a diferença entre **DoD** (quando o item está PRONTO) e **DoR** (quando está APTO para entrar no sprint)
3. Design Thinking: 5 fases na ordem correta (Empatia → Definição → Ideação → Prototipação → Teste)
4. OKR: Objective (qualitativo) + Key Results (quantitativos e mensuráveis)

---

## 📝 Resumo dos Conceitos-Chave

### 2.1 Técnicas de Elicitação
| Técnica | Quando usar | Vantagem |
|---------|-------------|----------|
| Entrevista | Explorar em profundidade | Rica em detalhes |
| Questionário | Muitos stakeholders | Escalável |
| Observação | Processos tácitos | Captura o real |
| Workshop | Consenso entre partes | Colaborativo |
| Análise de documentos | Sistemas existentes | Não depende de pessoas |

### 2.2 BPMN 2.0 - Elementos Principais

**Eventos (círculos):**
- Início (borda fina) | Intermediário (borda dupla) | Fim (borda grossa)
- Tipos: mensagem, timer, erro, sinal, compensação

**Atividades (retângulos arredondados):**
- Tarefa | Subprocesso
- Tipos de tarefa: manual, de usuário, de serviço, de script, de envio, de recebimento

**Gateways (losangos):**
- ✕ Exclusivo (XOR): apenas um caminho
- + Paralelo (AND): todos os caminhos
- ○ Inclusivo (OR): um ou mais caminhos
- ⬡ Baseado em evento: aguarda evento

**Fluxos:**
- Sequência (seta cheia): ordem de execução
- Mensagem (seta tracejada): comunicação entre pools
- Associação (linha pontilhada): artefatos

### 2.3 Tipos de Requisitos
- **Funcionais:** O QUE o sistema faz (comportamento, funcionalidades)
- **Não-funcionais:** COMO o sistema faz (desempenho, segurança, usabilidade)
- **Regras de negócio:** restrições e políticas do domínio

### 2.4 User Stories e Critérios de Aceitação

**Formato:**
```
Como [papel/persona],
Quero [funcionalidade],
Para que [benefício/valor].
```

**Critérios de Aceitação (Gherkin):**
```
Dado que [contexto],
Quando [ação],
Então [resultado esperado].
```

**INVEST (boas User Stories):**
- **I**ndependent
- **N**egotiable
- **V**aluable
- **E**stimable
- **S**mall
- **T**estable

### DoD vs DoR
| DoD (Definition of Done) | DoR (Definition of Ready) |
|--------------------------|---------------------------|
| Quando o item está COMPLETO | Quando o item pode ENTRAR no sprint |
| Critérios de qualidade | Critérios de clareza |
| Ex: testado, revisado, documentado | Ex: estimado, sem dependências, aceito pelo PO |

### 3.1 Design Thinking - 5 Fases
1. **Empatia** → entender o usuário (entrevistas, observação, personas)
2. **Definição** → sintetizar o problema (Point of View, How Might We)
3. **Ideação** → gerar soluções (brainstorming, brainwriting, SCAMPER)
4. **Prototipação** → materializar ideias (baixa/alta fidelidade)
5. **Teste** → validar com usuários reais

**SCAMPER:** Substituir, Combinar, Adaptar, Modificar, Propor outros usos, Eliminar, Reorganizar

### 3.4 OKRs
- **Objective:** qualitativo, inspirador, com prazo
- **Key Results:** quantitativos (2-5 por objetivo), mensuráveis
- Exemplo:
  - O: Melhorar a experiência do jurisdicionado
  - KR1: Reduzir tempo médio de atendimento de 15min para 5min
  - KR2: Atingir NPS de 80+

### 3.5 Tipos de Roadmap
- **Baseado em resultados (outcomes):** foco no impacto/valor
- **Baseado em funcionalidades (features):** foco no que será entregue
- Tendência moderna: preferir roadmaps baseados em resultados

---

## 📚 Fontes Recomendadas

- OMG BPMN 2.0 Specification (poster de referência)
- "User Story Mapping" - Jeff Patton
- "Sprint" - Jake Knapp (Design Thinking aplicado)
- e-MAG (Modelo de Acessibilidade em Governo Eletrônico)
