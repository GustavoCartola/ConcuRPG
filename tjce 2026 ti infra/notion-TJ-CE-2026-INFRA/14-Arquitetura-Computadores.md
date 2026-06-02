# Bloco 00 - Arquitetura de Computadores

## Topicos do edital
- [ ] CPU, ULA, registradores, ciclos de instrucao
  - Decore funcao de cada componente.
- [ ] Hierarquia de memoria: cache, RAM, armazenamento
  - Cache rapida; RAM area ativa.
- [ ] Dispositivos de entrada e saida, barramentos e interrupcoes
  - Interrupcao evita polling constante.
- [ ] Armazenamento HDD, SSD, NVMe e RAID (visao de infra)
  - NVMe rapido; RAID disponibilidade/desempenho.
- [ ] Conceitos de firmware, boot e UEFI/BIOS
  - UEFI/BIOS inicializa antes do SO.

---

## Como a FCC cobra este bloco
- FCC costuma cobrar diferencas objetivas: memoria volatil x nao volatil, cache x RAM.
- Em infraestrutura, aparece junto de performance e gargalo de I/O.
- Pegadinha comum: confundir capacidade de armazenamento com velocidade de acesso.

Dicas FCC:
1. Associe cache a latencia baixa e capacidade pequena.
2. Associe RAM a area de trabalho temporaria.
3. Associe SSD/NVMe a throughput e IOPS maiores que HDD.

---

## Resumo dos conceitos-chave
- CPU executa instrucoes e coordena os demais componentes.
- Hierarquia de memoria busca equilibrar custo e desempenho.
- I/O afeta diretamente desempenho de banco, virtualizacao e backup.
- RAID melhora disponibilidade e, em alguns niveis, desempenho.

| Conceito | Leitura rapida |
|---|---|
| Cache | Muito rapida, pequena, cara |
| RAM | Rapida, volatil, uso de execucao |
| SSD/NVMe | Persistente, baixa latencia |
| HDD | Persistente, maior latencia |

---

## Fontes recomendadas
- edital_verticalizado_infra.txt (bloco inicial de arquitetura)
- tema-redes.html (contexto de infraestrutura)
- F_*.txt (itens basicos de hardware em questoes de base)
