# 🐳 Laboratório Prático: Docker (Portas, Env e Volumes)

**Disciplina:** Engenharia de Aplicações Web Backend  
**Aluno:** Valmir Monteiro Junior  
  

---

## 🎯 Passo 1: Mapeamento de Portas
**Objetivo:** Compreender a diferença entre a porta do host e a porta do container.

- **Comando executado para subir o container (`container-portas`):**
```bash
docker run -d --name container-portas -p 9090:4000 api-node-classroom:1.1
```

- **Evidência (Print ou Saída do Terminal) do acesso em `http://localhost:9090`:**
![](/assets/passo01.png)
---

## 🎯 Passo 2: Variáveis de Ambiente (Configuração Dinâmica)
**Objetivo:** Demonstração do padrão *The Twelve-Factor App* injetando comportamentos diferentes na mesma imagem.

- **Comandos executados para subir os containers (`container-prod` e `container-test`):**
```bash
docker run -d --name container-prod -p 8081:4000 -e APP_MESSAGE="Ambiente de Produção"  api-node-classroom:1.1
docker run -d --name container-prod -p 8081:4000 -e APP_MESSAGE="Ambiente de Produção"  api-node-classroom:1.1
```

- **Evidência do acesso em `http://localhost:8081/info` (Produção):**
![](/assets/passo2_1.png)

- **Evidência do acesso em `http://localhost:8082/info` (Testes):**
![](/assets/passo2_2.png)

*(Opcional)* **Utilizou o arquivo `.env`? Descreva brevemente como foi feito:**

Criei 2 arquivos chamados .env.prod e .env.test e coloquei em cada um o valor correspondente.
Na hora de executar os containers, foi passado para cada um deles o seu .env correspondente.
```bash
docker run -d --name container-prod -p 8081:4000 --env-file .env.prod  api-node-classroom:1.1
docker run -d --name container-test -p 8082:4000 --env-file .env.test  api-node-classroom:1.1
```
---

## 🎯 Passo 3: Volumes e Bind Mounts
**Objetivo:** Leitura de dados do sistema hospedeiro em tempo real sem reconstruir a imagem.

- **Comando executado para subir o container com o volume (`container-volume`):**
```bash
docker run -d --name container-aviso -p 8083:4000 -v "$(pwd)/dados:/usr/src/app/dados:ro"  api-node-classroom:1.3
```

- **Evidência 1: Acesso em `http://localhost:8083/aviso` (Texto Original):**
![](/assets/passo3_1.png)

- **Evidência 2: Acesso em `http://localhost:8083/aviso` (Após alterar o arquivo `aviso.txt` localmente):**
![](/assets/passo3_2.png)

---

## 🛡️ Passo 4: Análise Teórica e Boas Práticas (.dockerignore)

**Justifique, sob uma visão arquitetural de CI/CD, por que é crítico ignorar arquivos locais (como `.env`, `aviso.txt` e pastas de `dados/`) na construção da imagem utilizando o `.dockerignore`:**

O .dockerignore nos permite selecionar quais arquivo queremos ignorar na criação da imagem, e isto é importante pois existem arquivos, como .env, que podem conter informações sensíveis como credenciais ou chaves de acesso que representam um risco de segurança caso sejam expostas. Já a inclusão de arquivos de dependência, como o diretório node_modules, podem aumentar desnecessariamente o tamanho da imagem gerada, pois os arquivos de configuração permitem baixar as mesmas versões de dependências durante a configuração da imagem.