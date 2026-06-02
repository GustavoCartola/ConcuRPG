# Bloco 01 - Sistemas Operacionais (Linux e Windows)

## Topicos do edital
- [ ] Processos, threads, escalonamento e gerenciamento de memoria
  - Thread compartilha; processo isola contexto.
- [ ] Sistemas de arquivos, permissao, usuarios e grupos
  - Permissao por grupo evita erros.
- [ ] Linux administracao: shell, servicos, pacotes e logs
  - Coletar log nao e correlacionar.
- [ ] Windows Server: AD DS, GPO, PowerShell, WSUS
  - AD autentica; GPO padroniza; WSUS atualiza.
- [ ] Acesso remoto seguro (SSH/SCP) e rotinas operacionais
  - SSH administra; SCP transfere com seguranca.

---

## Como a FCC cobra este bloco
- FCC combina conceito com comando/acao pratica de administracao.
- Em Windows, costuma cruzar AD + politica + permissao.
- Em Linux, cobra permissao (chmod/chown), processos e diagnostico.

Dicas FCC:
1. AD DS organiza identidade e autenticacao centralizada.
2. GPO aplica politica em escala; nao e permissao local isolada.
3. Em Linux, log e processo sao base de troubleshooting.
4. SSH/SCP entram como administracao segura, nao como servico web.

---

## Resumo dos conceitos-chave
- Linux e Windows Server aparecem como operacao diaria de infra.
- RBAC e grupos reduzem erro de permissao manual.
- PowerShell e shell script aumentam repetibilidade operacional.
- Hardening e atualizacao reduzem superficie de ataque.

| Item | Regra pratica |
|---|---|
| Permissao Linux | 755/644 sao padroes comuns |
| AD DS | Diretorio e autenticacao de dominio |
| GPO | Politica centralizada |
| WSUS | Gestao de updates em ambiente Windows |

---

## Fontes recomendadas
- tema-linux-windows.html
- edital_verticalizado_infra.txt (blocos de SO e administracao)
- F_91238_1665666823.txt (cobranca forte de SO/Admin)
