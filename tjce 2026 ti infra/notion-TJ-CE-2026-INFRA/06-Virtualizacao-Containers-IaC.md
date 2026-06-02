# Bloco 04 - Virtualizacao, Containers e IaC

## Topicos do edital
- [ ] Hipervisores e gerenciamento de VMs
  - VM completa; container compartilha kernel.
- [ ] Docker: imagens, containers, volumes, redes
  - Imagem empacota; volume persiste dados.
- [ ] Kubernetes e orquestracao (pods, services, escalabilidade)
  - Pod executa; Service expoe acesso.
- [ ] Rancher e gestao de clusters
  - Rancher simplifica multiplos clusters.
- [ ] IaC e automacao: Terraform/Ansible (visao de infraestrutura)
  - IaC padroniza e replica ambiente.

---

## Como a FCC cobra este bloco
- FCC separa bem VM de container.
- Questao recorrente: vantagem de container (leveza) x VM (isolamento).
- Pode cobrar comando/conceito basico: EXPOSE, volume, kubectl apply.

Dicas FCC:
1. Container compartilha kernel; VM tem SO completo.
2. Kubernetes orquestra ciclo de vida e escala.
3. IaC reduz erro manual e melhora repetibilidade.

---

## Resumo dos conceitos-chave
- Virtualizacao aumenta consolidacao e aproveitamento de recursos.
- Containers aceleram entrega e padronizam ambiente.
- Orquestracao resolve escala, disponibilidade e auto-recuperacao.
- IaC conecta infraestrutura a pipeline operacional.

| Recurso | Uso principal |
|---|---|
| VM | Isolamento forte |
| Container | Agilidade e padronizacao |
| Kubernetes | Orquestracao |
| IaC | Provisionamento versionado |

---

## Fontes recomendadas
- tema-infra-moderna-nuvem.html
- edital_verticalizado_infra.txt (blocos de virtualizacao)
- F_136071_1715713678.txt
