# Bloco 07 - Banco de Dados para Infra

## Topicos do edital
- [ ] Administracao de SGBD em ambiente corporativo
- [ ] Disponibilidade, replicacao e mecanismos de recuperacao
- [ ] Backup, restore e PITR
- [ ] RPO/RTO aplicados a banco
- [ ] Monitoramento e tuning de desempenho

---

## Como a FCC cobra este bloco
- FCC cobra banco sob otica de operacao e continuidade.
- Questao comum: diferenciar backup logico/fisico e estrategia de restauracao.
- Pode aparecer integrado com storage, HA e DRP.

Dicas FCC:
1. RPO define perda de dados aceitavel.
2. RTO define tempo maximo de recuperacao.
3. PITR e chave para recuperar ate ponto especifico no tempo.

---

## Resumo dos conceitos-chave
- Em Infra, foco e disponibilidade e recuperacao.
- Replicacao e monitoramento evitam parada silenciosa.
- Tuning envolve indice, I/O, memoria e plano de execucao.

| Item | Objetivo |
|---|---|
| Backup | Preservar dados |
| Restore | Recuperar servico |
| Replicacao | Redundancia e leitura |
| PITR | Recuperar ate instante escolhido |

---

## Fontes recomendadas
- edital_verticalizado_infra.txt (bloco de banco)
- edital-priorizado-fcc-infra-redes.html
- F_132055_1712317081.txt
