# 🤖 Macrotema 6: Inteligência Artificial e Hiperautomação

## 📋 Tópicos do Edital

### IA e Machine Learning
- [ ] 9.1 Fundamentos de IA e aprendizado de máquina: conceitos básicos e aplicações
- [ ] 9.2 PLN: Aplicações no contexto jurídico
- [ ] 9.3 IA Generativa no SDLC: LLMs para automação de requisitos, user stories e PRDs
- [ ] 9.4 Engenharia de Prompt: Princípios, técnicas e aplicações
- [ ] 9.5 Discovery com IA: Análise de feedback, transcrições e síntese de evidências
- [ ] 9.6 UX for AI: Gestão de incerteza, explicabilidade e Human-in-the-loop
- [ ] 9.7 Arquiteturas Corporativas de IA: APIs de modelos, integração e pipelines
- [ ] 9.8 Arquitetura RAG: Fundamentos de Retrieval-Augmented Generation
- [ ] 9.9 Agentes Inteligentes: Workflows agênticos e orquestração de tarefas
- [ ] 9.10 Monitoramento de IA: Métricas de desempenho, alucinação, latência e qualidade
- [ ] 9.11 Ética e Diretrizes: Vieses, transparência e Resolução 615 do CNJ

### Hiperautomação (RPA)
- [ ] 11.1 Conceitos de BPM e RPA
- [ ] 11.2 Identificação e priorização de processos automatizáveis
- [ ] 11.3 Desenvolvimento e orquestração de robôs
- [ ] 11.4 Integração de RPA com sistemas corporativos e APIs
- [ ] 11.5 Monitoramento, sustentação e governança de automações
- [ ] 11.6 Hyperautomation: Integração de RPA com IA, OCR e workflows digitais

---

## 🎯 Como a FCC cobra este tema

- Conceitos e classificações de IA/ML (supervisionado, não-supervisionado, reforço)
- Definições de PLN, RAG, LLM
- Técnicas de engenharia de prompt
- Conceitos de RPA e diferença para BPM
- Ética em IA (vieses, explicabilidade)

### Dicas FCC:
1. Saiba classificar tipos de aprendizado: **supervisionado** (com rótulos), **não-supervisionado** (sem rótulos), **por reforço** (recompensa)
2. RAG = Retrieval + Generation (busca documentos relevantes antes de gerar resposta)
3. RPA ≠ BPM: RPA automatiza tarefas repetitivas; BPM redesenha processos
4. Resolução 615 CNJ: regulamenta uso de IA no Judiciário

---

## 📝 Resumo dos Conceitos-Chave

### 9.1 Fundamentos de IA

**Tipos de Aprendizado de Máquina:**
| Tipo | Dados | Objetivo | Exemplo |
|------|-------|----------|---------|
| Supervisionado | Rotulados | Classificação/Regressão | Spam detection |
| Não-supervisionado | Sem rótulos | Agrupamento/Associação | Clustering de processos |
| Por Reforço | Feedback (recompensa) | Otimização de decisões | Jogos, robótica |

**Conceitos-chave:**
- **Modelo:** representação matemática aprendida dos dados
- **Treinamento:** processo de ajuste dos parâmetros do modelo
- **Inferência:** uso do modelo treinado para fazer previsões
- **Overfitting:** modelo memoriza dados de treino (não generaliza)
- **Underfitting:** modelo muito simples (não captura padrões)

### 9.2 PLN no Contexto Jurídico
- Classificação automática de petições e documentos
- Extração de entidades (nomes, datas, valores, artigos de lei)
- Sumarização de decisões judiciais
- Busca semântica em jurisprudência
- Análise de sentimento em manifestações

### 9.4 Engenharia de Prompt

**Técnicas Principais:**
| Técnica | Descrição |
|---------|-----------|
| Zero-shot | Sem exemplos, apenas instrução |
| Few-shot | Com poucos exemplos no prompt |
| Chain-of-Thought (CoT) | Pedir raciocínio passo a passo |
| Role prompting | Atribuir um papel ao modelo |
| Self-consistency | Gerar múltiplas respostas e escolher a mais consistente |
| ReAct | Raciocínio + Ação (reasoning + acting) |

**Boas práticas:**
- Ser específico e claro
- Fornecer contexto relevante
- Definir formato de saída esperado
- Usar delimitadores para separar seções
- Iterar e refinar

### 9.8 Arquitetura RAG (Retrieval-Augmented Generation)

```
[Pergunta] → [Retriever] → [Documentos Relevantes] → [LLM + Contexto] → [Resposta]
```

**Componentes:**
1. **Indexação:** documentos são divididos em chunks e vetorizados
2. **Retrieval:** busca por similaridade semântica (embeddings)
3. **Augmentation:** documentos recuperados são adicionados ao prompt
4. **Generation:** LLM gera resposta baseada no contexto recuperado

**Vantagens:**
- Reduz alucinações (grounded em documentos reais)
- Permite atualização sem re-treinar o modelo
- Rastreabilidade das fontes

### 9.9 Agentes Inteligentes
- **Agente:** sistema que percebe o ambiente e age autonomamente
- **Workflow agêntico:** orquestração de múltiplas chamadas a LLMs/ferramentas
- **Padrões:** ReAct, Plan-and-Execute, Multi-agent
- **Ferramentas:** o agente pode chamar APIs, buscar dados, executar código

### 9.10 Monitoramento de IA
- **Alucinação:** modelo gera informação falsa/inventada
- **Latência:** tempo de resposta do modelo
- **Métricas de qualidade:** BLEU, ROUGE, perplexidade, human evaluation
- **Drift:** degradação do modelo ao longo do tempo

### 9.11 Resolução 615 do CNJ
- Regulamenta o uso de IA no Poder Judiciário
- Princípios: transparência, explicabilidade, não-discriminação
- Supervisão humana obrigatória em decisões judiciais
- Registro e auditabilidade dos sistemas de IA

### 11.1-11.6 RPA e Hyperautomation

**RPA (Robotic Process Automation):**
- Automação de tarefas repetitivas baseadas em regras
- Robôs de software que imitam ações humanas na interface
- **Attended:** robô trabalha junto com humano
- **Unattended:** robô trabalha sozinho (agendado/trigger)

**Critérios para automatizar (priorização):**
- Alto volume de transações
- Baseado em regras claras
- Dados estruturados
- Baixa taxa de exceções
- Alto custo de erro humano

**Hyperautomation:**
- Combinação de RPA + IA + ML + OCR + Process Mining
- Automação inteligente de processos complexos
- Capacidade de lidar com dados não-estruturados
- Tomada de decisão automatizada

---

## 📚 Fontes Recomendadas

- Resolução 615 do CNJ (texto integral)
- "Designing Machine Learning Systems" - Chip Huyen
- OpenAI Prompt Engineering Guide
- Gartner - Hyperautomation reports
- LangChain documentation (conceitos de RAG e agentes)
