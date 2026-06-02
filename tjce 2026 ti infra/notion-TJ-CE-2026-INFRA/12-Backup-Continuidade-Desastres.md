# Bloco 10 - Backup, Continuidade e Recuperacao de Desastres

## Topicos do edital
- [ ] Politicas e estrategias de backup
  - Politica define frequencia e retencao.
- [ ] Tipos: full, incremental e diferencial
  - Incremental encadeia; diferencial acumula.
- [ ] Testes de restauracao e validacao periodica
  - Sem restore testado, backup e risco.
- [ ] BCP/DRP e procedimentos de contingencia
  - BCP continua negocio; DRP recupera TI.
- [ ] Metricas RPO e RTO
  - Coletar log nao e correlacionar.

---

## Como a FCC cobra este bloco
- FCC cobra conceito + aplicacao pratica em continuidade.
- Questao comum: identificar estrategia adequada ao cenario de indisponibilidade.
- Pegadinha frequente: confundir RPO com RTO.

Dicas FCC:
1. Backup sem teste de restore gera falsa seguranca.
2. RPO trata perda de dados; RTO trata tempo de retomada.
3. DRP deve ter procedimento executavel, nao so documento teorico.

---

## Resumo dos conceitos-chave
- Continuidade depende de processo, tecnologia e governanca.
- Politica de backup deve considerar criticidade do servico.
- Teste de restauracao valida se o plano funciona na pratica.

| Tema | Ponto critico |
|---|---|
| Full/Incremental/Diferencial | Custo x janela x restauracao |
| RPO | Quanto dado pode ser perdido |
| RTO | Quanto tempo pode ficar indisponivel |
| DRP | Plano de recuperacao operacional |

---

## Fontes recomendadas
- tema-governanca-normativos.html
- edital_verticalizado_infra.txt (bloco de backup)
- F_117670_1697659275.txt
