# Bloco 06 - Servicos Web, E-mail e Intranet

## Topicos do edital
- [ ] HTTP/HTTPS e arquitetura cliente-servidor
- [ ] Servidores web: Apache, Nginx, IIS
- [ ] Publicacao, hardening e controle de acesso
- [ ] Correio eletronico: SMTP, POP3, IMAP
- [ ] Seguranca de e-mail: antispam, antivirus, SPF, DKIM, DMARC

---

## Como a FCC cobra este bloco
- Alta incidencia em prova de Infra.
- FCC gosta de identificar tecnologia pelo comportamento descrito.
- Cobrança tipica: XSS, drive-by-download e hardening de e-mail.

Dicas FCC:
1. XSS injeta script no navegador da vitima.
2. SPF valida remetente; DKIM assina mensagem.
3. DMARC define politica de tratamento de falha de autenticacao.
4. Spam nao e o mesmo que ataque web.

---

## Resumo dos conceitos-chave
- Servico web e e-mail sao superficie critica de ataque e disponibilidade.
- Hardening e autenticacao de e-mail reduzem fraude e phishing.
- Operacao exige monitoramento e politica de acesso.

| Tema | Leitura rapida |
|---|---|
| HTTPS | Criptografia de transporte |
| SMTP | Envio de e-mail |
| IMAP/POP3 | Recebimento de e-mail |
| SPF/DKIM/DMARC | Confianca e autenticidade de dominio |

---

## Fontes recomendadas
- tema-servicos-web-email.html
- edital_verticalizado_infra.txt (bloco de servicos web)
- F_117670_1697659275.txt
