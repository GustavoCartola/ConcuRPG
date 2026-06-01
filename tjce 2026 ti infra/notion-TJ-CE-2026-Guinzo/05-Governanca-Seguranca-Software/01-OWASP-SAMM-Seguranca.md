# 🔒 Macrotema 5: Governança de Segurança e Qualidade de Software

## 📋 Tópicos do Edital

- [ ] 8.1 OWASP SAMM: Estrutura e princípios gerais
- [ ] Domínios do SAMM: Governança, Design, Implementação, Verificação e Operações
- [ ] 8.2 Segurança no SDLC: Security by Design
- [ ] 8.3 Modelagem de Ameaças (Threat Modeling): Ativos, superfícies de ataque e vetores
- [ ] 8.4 Vulnerabilidades de Negócio: Falhas de lógica de negócio e fluxos de aprovação judicial
- [ ] 8.5 Privacidade na Prática Judicial: LGPD em sistemas judiciais e RIPD/DPIA
- [ ] 8.6 IAM: Menor privilégio e RBAC
- [ ] 8.7 Segurança de Cadeia de Suprimentos: SBOM (Software Bill of Materials)
- [ ] 8.8 Conformidade Operacional: Logs de auditoria e não-repúdio

---

## 🎯 Como a FCC cobra este tema

- Estrutura e domínios do OWASP SAMM
- Princípios de segurança (menor privilégio, defesa em profundidade)
- Conceitos de LGPD aplicados a sistemas
- Definições de RBAC, SBOM, não-repúdio

### Dicas FCC:
1. OWASP SAMM: decore os **5 domínios** e suas práticas de segurança
2. STRIDE é o modelo clássico de threat modeling (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
3. RBAC: acesso baseado em **funções/papéis**, não em identidade individual
4. SBOM: inventário de todos os componentes de software (análogo a lista de ingredientes)

---

## 📝 Resumo dos Conceitos-Chave

### 8.1 OWASP SAMM (Software Assurance Maturity Model)

**5 Domínios de Negócio:**

| Domínio | Foco | Práticas |
|---------|------|----------|
| **Governança** | Estratégia e conformidade | Estratégia & Métricas, Política & Conformidade, Educação & Orientação |
| **Design** | Arquitetura segura | Modelagem de Ameaças, Requisitos de Segurança, Arquitetura de Segurança |
| **Implementação** | Código seguro | Build Seguro, Deploy Seguro, Gestão de Defeitos |
| **Verificação** | Testes de segurança | Revisão de Arquitetura, Testes Baseados em Requisitos, Testes de Segurança |
| **Operações** | Produção segura | Gestão de Incidentes, Gestão de Ambiente, Gestão Operacional |

**Níveis de Maturidade:** 0 (implícito) → 1 → 2 → 3 (otimizado)

### 8.2 Security by Design - Princípios
1. Minimizar superfície de ataque
2. Estabelecer padrões seguros (secure defaults)
3. Princípio do menor privilégio
4. Defesa em profundidade
5. Falhar de forma segura (fail securely)
6. Não confiar em serviços externos
7. Separação de responsabilidades
8. Não confiar em segurança por obscuridade
9. Manter a segurança simples
10. Corrigir problemas de segurança corretamente

### 8.3 Modelagem de Ameaças

**STRIDE (Microsoft):**
| Ameaça | Propriedade Violada |
|--------|-------------------|
| **S**poofing (Falsificação) | Autenticação |
| **T**ampering (Adulteração) | Integridade |
| **R**epudiation (Repúdio) | Não-repúdio |
| **I**nformation Disclosure | Confidencialidade |
| **D**enial of Service | Disponibilidade |
| **E**levation of Privilege | Autorização |

**Processo de Threat Modeling:**
1. Identificar ativos (o que proteger)
2. Criar visão geral da arquitetura
3. Decompor a aplicação
4. Identificar ameaças (STRIDE)
5. Documentar e classificar (DREAD)
6. Definir contramedidas

### 8.5 LGPD em Sistemas Judiciais

**RIPD/DPIA (Relatório de Impacto à Proteção de Dados):**
- Obrigatório quando tratamento pode gerar alto risco
- Descreve: processos de tratamento, necessidade, proporcionalidade, riscos e medidas
- No judiciário: dados sensíveis de processos, menores, vítimas

**Princípios LGPD relevantes:**
- Finalidade, adequação, necessidade
- Livre acesso, qualidade dos dados
- Transparência, segurança, prevenção
- Não discriminação, responsabilização

### 8.6 IAM (Identity and Access Management)

**Princípio do Menor Privilégio:**
- Usuário recebe apenas as permissões mínimas necessárias
- Revisão periódica de acessos

**RBAC (Role-Based Access Control):**
- Permissões atribuídas a **papéis/funções**
- Usuários são associados a papéis
- Simplifica gestão (não precisa gerenciar permissão por usuário)
- Exemplo judicial: Juiz, Escrivão, Advogado, Parte → cada um vê o que precisa

### 8.7 SBOM (Software Bill of Materials)
- Lista completa de componentes, bibliotecas e dependências
- Permite rastrear vulnerabilidades em componentes de terceiros
- Formatos: SPDX, CycloneDX
- Essencial para gestão de vulnerabilidades (ex: Log4Shell)

### 8.8 Conformidade Operacional
- **Logs de auditoria:** registro de quem fez o quê, quando e onde
- **Não-repúdio:** garantia de que uma ação não pode ser negada pelo autor
  - Implementado via: assinatura digital, timestamps, logs imutáveis
- **Rastreabilidade:** capacidade de reconstruir a sequência de eventos

---

## 📚 Fontes Recomendadas

- OWASP SAMM v2 (owaspsamm.org)
- OWASP Top 10 (referência geral)
- Lei 13.709/2018 (LGPD)
- NIST SP 800-53 (controles de segurança)
- Microsoft Threat Modeling Tool (documentação STRIDE)
