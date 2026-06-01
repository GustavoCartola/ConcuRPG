# 🏃 Macrotema 3: Agilidade, Métricas de Fluxo e Engenharia de Riscos

## 📋 Tópicos do Edital

- [ ] 4.1 Framework Scrum e Método Kanban: Princípios, cerimônias, artefatos e papéis
- [ ] 4.2 Agilidade em Escala: Flight Levels (Nível 1, 2 e 3)
- [ ] 4.3 Planejamento Integrado: PI Planning e sincronização entre times
- [ ] 4.4 Dependências de Sistemas: Gestão de dependências entre produtos e sistemas legados
- [ ] 5.1 Métricas de Processo (Eficiência): Lead Time, Cycle Time, Throughput e CFD
- [ ] 5.2 Métricas de Produto (Eficácia): NPS, CSAT, Testes A/B, Análise Cohort
- [ ] 5.3 Entrega de Valor: Outcomes vs. Outputs
- [ ] 5.4 Governança de Decisão: Qualidade do dado para tomada de decisão
- [ ] 6.1 Gestão de Riscos de Produto: Riscos de valor, viabilidade, usabilidade e jurídicos
- [ ] 6.2 LGPD e Arquitetura: Privacy by Design e Privacy by Default
- [ ] 6.3 Validação de Negócio: Qualidade sob perspectiva do negócio
- [ ] 6.4 FinOps (Básico): Gestão de custos em nuvem

---

## 🎯 Como a FCC cobra este tema

- Papéis, eventos e artefatos do Scrum (cobrança literal do Scrum Guide)
- Princípios do Kanban (limitar WIP, visualizar fluxo, etc.)
- Definições de métricas (Lead Time vs Cycle Time)
- Princípios da LGPD aplicados a sistemas

### Dicas FCC:
1. Scrum: **3 papéis** (PO, Scrum Master, Developers), **5 eventos**, **3 artefatos**
2. Kanban: **6 práticas** — decore todas
3. Lead Time ≠ Cycle Time (Lead = pedido até entrega; Cycle = início do trabalho até entrega)
4. Privacy by Design: **7 princípios** de Ann Cavoukian

---

## 📝 Resumo dos Conceitos-Chave

### 4.1 Scrum (Scrum Guide 2020)

**Papéis (Accountabilities):**
| Papel | Responsabilidade |
|-------|-----------------|
| Product Owner | Maximizar valor do produto, gerenciar backlog |
| Scrum Master | Eficácia do Scrum, remover impedimentos |
| Developers | Criar incremento utilizável a cada Sprint |

**Eventos:**
1. **Sprint** (container, 1-4 semanas)
2. **Sprint Planning** (o que + como)
3. **Daily Scrum** (15 min, developers)
4. **Sprint Review** (inspecionar incremento, adaptar backlog)
5. **Sprint Retrospective** (melhorar processo)

**Artefatos + Compromissos:**
| Artefato | Compromisso |
|----------|-------------|
| Product Backlog | Meta do Produto (Product Goal) |
| Sprint Backlog | Meta da Sprint (Sprint Goal) |
| Incremento | Definição de Pronto (DoD) |

### Kanban - 6 Práticas
1. Visualizar o fluxo de trabalho
2. Limitar o trabalho em progresso (WIP)
3. Gerenciar o fluxo
4. Tornar as políticas explícitas
5. Implementar ciclos de feedback
6. Melhorar colaborativamente, evoluir experimentalmente

### 4.2 Flight Levels
| Nível | Foco | Escopo |
|-------|------|--------|
| Nível 1 | Operacional | Time individual |
| Nível 2 | Coordenação | Múltiplos times/produtos |
| Nível 3 | Estratégico | Portfólio/organização |

### 5.1 Métricas de Fluxo

- **Lead Time:** tempo total desde o pedido até a entrega ao cliente
- **Cycle Time:** tempo desde o início do trabalho até a conclusão
- **Throughput:** quantidade de itens entregues por unidade de tempo
- **CFD (Cumulative Flow Diagram):** gráfico de área empilhada mostrando itens em cada estado ao longo do tempo
  - Permite identificar gargalos e WIP excessivo

### 5.2 Métricas de Produto
- **NPS (Net Promoter Score):** % Promotores - % Detratores (-100 a +100)
- **CSAT (Customer Satisfaction):** satisfação pontual (escala 1-5 ou 1-10)
- **Teste A/B:** comparação controlada entre duas versões
- **Análise Cohort:** agrupar usuários por período e comparar comportamento

### 5.3 Outcomes vs Outputs
- **Output:** o que foi entregue (features, releases, story points)
- **Outcome:** o impacto gerado (redução de tempo, aumento de satisfação)
- Foco moderno: medir outcomes, não outputs

### 6.2 Privacy by Design - 7 Princípios
1. Proativo, não reativo (preventivo)
2. Privacidade como padrão (Privacy by Default)
3. Privacidade incorporada ao design
4. Funcionalidade total (soma positiva, não soma zero)
5. Segurança de ponta a ponta (ciclo de vida completo)
6. Visibilidade e transparência
7. Respeito pela privacidade do usuário (centrado no usuário)

### 6.4 FinOps - Conceitos Básicos
- **Fases:** Informar → Otimizar → Operar
- **Princípios:** 
  - Times devem colaborar
  - Decisões orientadas pelo valor de negócio
  - Todos são responsáveis pelo uso de nuvem
  - Relatórios acessíveis e em tempo real
  - Governança centralizada, decisões descentralizadas

---

## 📚 Fontes Recomendadas

- Scrum Guide 2020 (oficial, gratuito)
- "Kanban: Successful Evolutionary Change" - David Anderson
- Flight Levels Academy (Klaus Leopold)
- Lei 13.709/2018 (LGPD)
- FinOps Foundation (finops.org)
