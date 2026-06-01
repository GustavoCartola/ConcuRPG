# 📊 Macrotema 7: Engenharia de Dados e Plataformas Analíticas

## 📋 Tópicos do Edital

- [ ] 10.1 Arquiteturas de Dados: Data Lake, Data Warehouse e Lakehouse
- [ ] 10.2 Modelagem Analítica: Modelagem relacional e dimensional (Star Schema e Snowflake)
- [ ] 10.3 Fluxos de Engenharia: ETL e ELT
- [ ] 10.4 Governança de Dados: Linhagem, metadados e controle de qualidade
- [ ] 10.5 Dados em Larga Escala: Processamento distribuído
- [ ] 10.6 Integração de Ingestão: APIs, mensageria e dados estruturados/não estruturados
- [ ] 10.7 Suporte Analítico: Engenharia de dados para BI e IA

---

## 🎯 Como a FCC cobra este tema

- Diferenças entre Data Lake, Data Warehouse e Lakehouse
- Modelagem dimensional: fatos vs dimensões, Star vs Snowflake
- ETL vs ELT: ordem das operações e quando usar cada um
- Conceitos de governança e qualidade de dados

### Dicas FCC:
1. Data Lake = dados brutos (schema-on-read); Data Warehouse = dados processados (schema-on-write)
2. Star Schema: tabela fato no centro + dimensões desnormalizadas ao redor
3. ETL: transforma ANTES de carregar; ELT: carrega ANTES de transformar
4. Linhagem de dados = rastreabilidade da origem até o destino

---

## 📝 Resumo dos Conceitos-Chave

### 10.1 Arquiteturas de Dados

| Característica | Data Warehouse | Data Lake | Lakehouse |
|---------------|---------------|-----------|-----------|
| Dados | Estruturados | Todos os tipos | Todos os tipos |
| Schema | On-write | On-read | Flexível (ambos) |
| Processamento | OLAP | Batch/Stream | Batch/Stream + OLAP |
| Qualidade | Alta (curado) | Variável | Alta (com governança) |
| Custo | Alto | Baixo (storage) | Médio |
| Usuários | Analistas/BI | Data Scientists | Todos |
| Tecnologias | Redshift, BigQuery | S3, HDFS | Delta Lake, Iceberg |

**Lakehouse = Data Lake + Data Warehouse**
- Combina flexibilidade do Lake com governança do Warehouse
- Suporta ACID transactions sobre dados no lake
- Tecnologias: Delta Lake, Apache Iceberg, Apache Hudi

### 10.2 Modelagem Dimensional

**Tabela Fato:**
- Contém métricas/medidas numéricas
- Granularidade definida (ex: uma linha por venda)
- Chaves estrangeiras para dimensões
- Ex: fato_movimentacao_processual (qtd_movimentações, tempo_tramitação)

**Tabela Dimensão:**
- Contém atributos descritivos
- Usada para filtrar, agrupar e rotular
- Ex: dim_vara, dim_tempo, dim_tipo_processo

**Star Schema vs Snowflake:**
| Aspecto | Star Schema | Snowflake Schema |
|---------|-------------|-----------------|
| Dimensões | Desnormalizadas | Normalizadas (subdimensões) |
| Joins | Menos (mais rápido) | Mais (mais normalizado) |
| Redundância | Maior | Menor |
| Performance | Melhor para consultas | Melhor para storage |
| Complexidade | Simples | Mais complexo |

### 10.3 ETL vs ELT

| Aspecto | ETL | ELT |
|---------|-----|-----|
| Ordem | Extract → Transform → Load | Extract → Load → Transform |
| Transformação | No pipeline (ferramenta ETL) | No destino (engine do DW) |
| Quando usar | DW tradicional, dados estruturados | Cloud, big data, lakehouse |
| Performance | Limitada pela ferramenta ETL | Usa poder do destino (MPP) |
| Ferramentas | Informatica, Talend, SSIS | dbt, Spark, BigQuery |

### 10.4 Governança de Dados

**Linhagem de Dados (Data Lineage):**
- Rastreamento da origem → transformações → destino
- Permite auditoria e análise de impacto
- Essencial para conformidade (LGPD)

**Metadados:**
- **Técnicos:** schema, tipos, formatos, localização
- **De negócio:** definições, proprietários, classificação
- **Operacionais:** logs de execução, estatísticas de uso

**Qualidade de Dados - Dimensões:**
- Completude (dados não nulos)
- Consistência (sem contradições)
- Acurácia (correto em relação à realidade)
- Atualidade (timeliness)
- Unicidade (sem duplicatas)
- Validade (conforme regras de formato)

### 10.5 Processamento Distribuído

**Conceitos-chave:**
- **Batch:** processamento em lotes (grandes volumes, não tempo real)
- **Stream:** processamento em tempo real (evento a evento)
- **MapReduce:** paradigma de processamento paralelo (Map → Shuffle → Reduce)
- **MPP (Massively Parallel Processing):** múltiplos nós processando em paralelo

**Tecnologias de referência:**
- Apache Spark (batch + stream)
- Apache Kafka (streaming/mensageria)
- Apache Flink (stream processing)
- Hadoop/HDFS (storage distribuído)

### 10.6 Integração de Dados

**Padrões de ingestão:**
- **APIs REST:** pull-based, request-response
- **Mensageria (Kafka, RabbitMQ):** push-based, event-driven
- **CDC (Change Data Capture):** captura mudanças incrementais no banco
- **Batch files:** CSV, Parquet, JSON em intervalos regulares

**Tipos de dados:**
- Estruturados: tabelas, SQL
- Semi-estruturados: JSON, XML, Parquet
- Não-estruturados: PDFs, imagens, áudio

---

## 📚 Fontes Recomendadas

- "Fundamentals of Data Engineering" - Joe Reis & Matt Housley
- "The Data Warehouse Toolkit" - Ralph Kimball
- Databricks - Lakehouse Architecture
- dbt documentation (transformação moderna)
