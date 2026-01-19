# Desafio Kubernetes

Essa aplicação sobe um banco de dados e uma api em Nest.js em container com K8S.

## Pré-requisitos

- kubectl: Ferramenta para manipular o kubernertes pela CLI
- kind: Ferramenta para criar/manipular o cluster

### Execução

- Crie o kluster com o kind

```
kind create cluster --config kind.yaml --name [cluster-name]
```

- Após o processo finalizar mude o contexto para o cluster

```
kubectl cluster-info --context kind-app-cluster
```

- Aplique cada Namespace pois estão sendo referidos dentro dos manifestos da API

```
kubectl apply -f db-ns.yaml
kubectl apply -f api-ns.yaml
```

- Adicione o metrics-server para coletar métricas e usar o HPA para escalonamento vertical dos Pods da API

```
kubectl apply -f metrics-server.yaml
```

- Adicione o PersistentVolume para comunição com o StorageClass e uso dos volumes

```
kubectl apply -f db-pv.yaml
```

- Aplique a pasta do banco de dados para criação do Deployment, service, secrets e pva.

```
kubectl apply -f /api/k8s/db
```

- Aplique a pasta da API para criação do Deployment, service, secrets e hpa.

```
kubectl apply -f /api/k8s/api
```

### API

- GET / => retorna um 'Hello World!', rota padrão gerada pelo Nest.
- GET /users => lista todos os usuários na base de dados.
- GET /healthz => retorna um OK, caso a API esteja rodando normalmente.
- GET /readyz => verificar se a API está pronta para receber requisição. Verifica se suas dependências estão funcionando(Banco de dados).
- POST /data => insere dois usuários na base.
