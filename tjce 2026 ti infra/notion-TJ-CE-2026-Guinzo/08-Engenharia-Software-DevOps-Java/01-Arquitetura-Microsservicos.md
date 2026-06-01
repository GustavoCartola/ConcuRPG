# ☕ Macrotema 8: Engenharia de Software Moderna, DevOps e Java

## 📋 Tópicos do Edital

### Arquitetura e DevOps
- [ ] 12.1 Arquiteturas de sistemas distribuídos e microsserviços
- [ ] 12.2 Desenvolvimento orientado a APIs (REST e eventos)
- [ ] 12.3 Integração entre sistemas legados e modernos
- [ ] 12.4 Conteinerização e orquestração (Docker e Kubernetes)
- [ ] 12.5 Práticas de DevOps e DevSecOps
- [ ] 12.6 Testes automatizados e qualidade de software
- [ ] 12.7 Observabilidade: logs, métricas e rastreamento distribuído

### Java e Frameworks
- [ ] 13.1 Linguagem Java e Programação orientada a objetos
- [ ] 13.2 Tratamento de exceções e boas práticas de codificação
- [ ] 13.3 Desenvolvimento com Spring Boot e Spring MVC
- [ ] 13.4 Decomposição de sistemas monolíticos
- [ ] 13.5 Padrões: API Gateway, Service Discovery, Circuit Breaker
- [ ] 13.6 Comunicação síncrona (REST) e assíncrona (mensageria)
- [ ] 13.7 JPA e Hibernate
- [ ] 13.8 Transações e controle de concorrência
- [ ] 13.9 Conceitos de mensageria (filas e tópicos)
- [ ] 13.10 Kafka ou RabbitMQ (conceitos)

---

## 🎯 Como a FCC cobra este tema

- Conceitos de microsserviços vs monólito
- Verbos HTTP e princípios REST
- Docker: Dockerfile, imagens, containers
- Kubernetes: pods, services, deployments
- Pilares de observabilidade
- POO em Java: herança, polimorfismo, encapsulamento, abstração
- Spring Boot: annotations, IoC, DI

### Dicas FCC:
1. REST: saiba os **verbos HTTP** (GET, POST, PUT, PATCH, DELETE) e **códigos de status** (2xx, 3xx, 4xx, 5xx)
2. Docker: imagem é template read-only; container é instância em execução
3. Circuit Breaker: 3 estados (Closed → Open → Half-Open)
4. JPA: saiba as annotations (@Entity, @Table, @Id, @OneToMany, etc.)

---

## 📝 Resumo dos Conceitos-Chave

### 12.1 Microsserviços vs Monólito

| Aspecto | Monólito | Microsserviços |
|---------|----------|---------------|
| Deploy | Único artefato | Independente por serviço |
| Escalabilidade | Vertical (toda a app) | Horizontal (por serviço) |
| Tecnologia | Homogênea | Heterogênea (polyglot) |
| Comunicação | In-process | Rede (HTTP, mensageria) |
| Complexidade | Código | Infraestrutura |
| Consistência | ACID (fácil) | Eventual (saga pattern) |

### 12.2 REST - Princípios e Verbos

**Constraints REST:**
1. Client-Server
2. Stateless
3. Cacheable
4. Uniform Interface
5. Layered System
6. Code on Demand (opcional)

**Verbos HTTP:**
| Verbo | Ação | Idempotente | Safe |
|-------|------|:-----------:|:----:|
| GET | Ler | ✅ | ✅ |
| POST | Criar | ❌ | ❌ |
| PUT | Substituir | ✅ | ❌ |
| PATCH | Atualizar parcial | ❌ | ❌ |
| DELETE | Remover | ✅ | ❌ |

**Códigos de Status:**
- 2xx: Sucesso (200 OK, 201 Created, 204 No Content)
- 3xx: Redirecionamento (301 Moved, 304 Not Modified)
- 4xx: Erro do cliente (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
- 5xx: Erro do servidor (500 Internal, 502 Bad Gateway, 503 Unavailable)

### 12.4 Docker e Kubernetes

**Docker:**
- **Imagem:** template read-only com instruções para criar container
- **Container:** instância em execução de uma imagem
- **Dockerfile:** script de construção da imagem
- **Docker Compose:** orquestração local de múltiplos containers
- Comandos: `docker build`, `docker run`, `docker push`, `docker pull`

**Kubernetes (K8s):**
| Recurso | Função |
|---------|--------|
| **Pod** | Menor unidade deployável (1+ containers) |
| **Service** | Expõe pods na rede (ClusterIP, NodePort, LoadBalancer) |
| **Deployment** | Gerencia réplicas e rolling updates |
| **ConfigMap/Secret** | Configuração externalizada |
| **Ingress** | Roteamento HTTP externo |
| **Namespace** | Isolamento lógico de recursos |

### 12.5 DevOps e DevSecOps

**Práticas DevOps:**
- CI (Continuous Integration): build + testes automáticos a cada commit
- CD (Continuous Delivery): artefato sempre pronto para deploy
- CD (Continuous Deployment): deploy automático em produção
- IaC (Infrastructure as Code): Terraform, Ansible
- Monitoramento e feedback contínuo

**DevSecOps = DevOps + Segurança integrada:**
- SAST (Static Application Security Testing): análise de código
- DAST (Dynamic Application Security Testing): testes em execução
- SCA (Software Composition Analysis): vulnerabilidades em dependências
- Shift-left: segurança desde o início do ciclo

### 12.6 Pirâmide de Testes
```
        /  E2E  \        ← Poucos, lentos, caros
       / Integração \    ← Médios
      /   Unitários   \  ← Muitos, rápidos, baratos
```

### 12.7 Observabilidade - 3 Pilares
| Pilar | O que responde | Ferramenta |
|-------|---------------|------------|
| **Logs** | O que aconteceu? | ELK, Loki |
| **Métricas** | Como está o sistema? | Prometheus, Grafana |
| **Traces** | Onde está o problema? | Jaeger, Zipkin |

### 13.1 Java - POO

**4 Pilares:**
- **Encapsulamento:** ocultar detalhes internos (getters/setters, modificadores de acesso)
- **Herança:** reutilizar comportamento (extends, implements)
- **Polimorfismo:** mesmo método, comportamentos diferentes (override, overload)
- **Abstração:** modelar conceitos essenciais (abstract class, interface)

### 13.3 Spring Boot

**Annotations principais:**
- `@SpringBootApplication` (= @Configuration + @EnableAutoConfiguration + @ComponentScan)
- `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`
- `@Service`, `@Repository`, `@Component`
- `@Autowired` (injeção de dependência)
- `@Entity`, `@Table`, `@Id`, `@Column`

**IoC/DI (Inversão de Controle / Injeção de Dependência):**
- Container Spring gerencia ciclo de vida dos beans
- Dependências são injetadas (não instanciadas manualmente)

### 13.5 Padrões de Resiliência

**API Gateway:**
- Ponto único de entrada para microsserviços
- Funções: roteamento, autenticação, rate limiting, load balancing

**Service Discovery:**
- Registro dinâmico de serviços
- Client-side (Eureka) vs Server-side (Consul, K8s DNS)

**Circuit Breaker:**
```
[CLOSED] → falhas > threshold → [OPEN] → timeout → [HALF-OPEN]
    ↑                                                      ↓
    ←←←←←←←← sucesso ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
```
- **Closed:** requisições passam normalmente
- **Open:** requisições falham imediatamente (fail-fast)
- **Half-Open:** permite algumas requisições para testar recuperação

### 13.7 JPA/Hibernate

**Mapeamento:**
- `@Entity` → classe mapeada para tabela
- `@Id` + `@GeneratedValue` → chave primária
- `@OneToMany`, `@ManyToOne`, `@ManyToMany` → relacionamentos
- `@Column` → configuração de coluna

**Fetch Types:**
- EAGER: carrega relacionamento imediatamente
- LAZY: carrega sob demanda (padrão para coleções)

### 13.9-13.10 Mensageria

**Filas vs Tópicos:**
| Aspecto | Fila (Queue) | Tópico (Topic) |
|---------|-------------|----------------|
| Padrão | Point-to-Point | Publish-Subscribe |
| Consumidores | Um consome cada mensagem | Todos recebem cópia |
| Uso | Distribuição de trabalho | Notificação/broadcast |

**Kafka vs RabbitMQ:**
| Aspecto | Kafka | RabbitMQ |
|---------|-------|----------|
| Modelo | Log distribuído | Message broker |
| Retenção | Persiste mensagens | Remove após consumo |
| Throughput | Muito alto | Alto |
| Ordenação | Por partição | Por fila |
| Uso ideal | Streaming, event sourcing | Tarefas assíncronas, RPC |

---

## 📚 Fontes Recomendadas

- "Building Microservices" - Sam Newman
- Spring Boot Reference Documentation
- Docker Documentation (docs.docker.com)
- Kubernetes Documentation (kubernetes.io)
- "Java: Como Programar" - Deitel & Deitel
