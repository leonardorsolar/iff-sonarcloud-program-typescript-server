Perfeito! Abaixo está um **tutorial completo** dividido em duas partes:

---

# 📦 PARTE 1 – Clonar, remover `.git` e subir em novo repositório

## ✅ Etapa 1: Clonar o projeto original

Abra o terminal e execute:

```bash
git clone https://github.com/leonardorsolar/iff-sonarcloud-program-typescript-server.git
cd iff-sonarcloud-program-typescript-server
```

---

## ✅ Etapa 2: Remover o repositório Git antigo

```bash
rm -rf .git
```

> 🔎 Isso apaga todo o histórico de versionamento do repositório anterior.

---

## ✅ Etapa 3: Inicializar um novo repositório Git

```bash
git init
git add .
git commit -m "Primeiro commit do projeto clonado e limpo"
```

---

## ✅ Etapa 4: Criar um novo repositório no GitHub

1. Vá para [https://github.com/new](https://github.com/new)
2. Crie um repositório **vazio** (sem README, gitignore, etc.)
3. Copie a URL do repositório novo (ex: `https://github.com/seu-usuario/nome-repo.git`)

---

## ✅ Etapa 5: Subir para o novo repositório

```bash
git remote add origin https://github.com/seu-usuario/nome-repo.git
git branch -M main
git push -u origin main
```

---

# Qualidade de Código com SonarQube

# 🌊 PARTE 2 – Subir projeto TypeScript para o **SonarCloud com GitHub Actions**

## ✅ Etapa 1: Criar conta no SonarCloud

documentação [https://sonarcloud.io](https://sonarcloud.io)
https://docs.sonarsource.com/sonarqube-cloud/

1. Acesse: [https://sonarcloud.io](https://sonarcloud.io/)
2. Clique em **"Log in with GitHub"**
3. Autorize o acesso ao GitHub
4. Crie um projeto no SonarCloud:
   - Clique em + no menu lateral > Analyze new project ou Analyze new project na tela
5. Selecione seu repositório público do GitHub:

- Clique em Import from an organization Github
- Em Install SonarQubeCloud, clique no nome prinicpal da sua organização do github
- Aparecerá uma tela do SonarQubeCloud, Install & Authorize SonarQubeCloud
- Cliquem em Only select repositories. Selecione o repositório que você subiu: iff-sonarcloud-program-typescript-server

6. Crie a organização:

- Dê um nome para organização do github: leonardosolar
- Dê um nome para sua key: leonardorsolarkey
- Role a té o final da página
- Selecione Select Free
- Clique em Cretae Organization

7. Analyze projects

- Select repositories from one of your GitHub organization
- Clique em Import another organization
- Clique em Github
- Cliquem no mome princiapla da sua organização do github, no meu caso: leonardosolar configure
- Role até o final
- Cliquem em Only select repositories. SeleVeja que já está secionado o repositório que você subiu: iff-sonarcloud-program-typescript-server. Se não tiver selecione
- Clique em save

7. Analisar projetos:
   - Selecione o nome do seu projeto: iff-sonarcloud-program-typescript-server
   - Clique em **"Set Up"** ( configurar)
8. Clique em previous version e em Cliquem em Create project
9. Estamos analisando seu projeto

---

Método de Análise:
Análise Automática
Configurar análise por outros métodos:
Com ações do GitHub

## Método de Análise: Análise Automática

Se você está usando o modo automático (Automatic Analysis) do SonarCloud (sem CI, sem GitHub Actions), e quer garantir que os testes sejam detectados e analisados corretamente, você pode configurar o arquivo .sonarcloud.properties no repositório raiz com as opções recomendadas para isso.

- Crie ou edite o arquivo .sonarcloud.properties no diretório raiz do repositório.
- Adicione os caminhos corretos para os testes e fontes, conforme a estrutura do seu projeto.

```js
# Caminho para os arquivos-fonte do projeto
sonar.sources=src

# Caminho para os testes (por exemplo, testes unitários)
sonar.tests=src/test

# Inclusões e exclusões opcionais
# sonar.exclusions=**/*.spec.ts
# sonar.test.exclusions=
sonar.test.inclusions=**/*.test.ts

# Codificação dos arquivos-fonte
sonar.sourceEncoding=UTF-8

# Excluir arquivos duplicados em análise de duplicação de código
# sonar.cpd.exclusions=**/*.test.js

```

O modo automático do SonarCloud não executa os testes nem coleta cobertura automaticamente.
Alternativa recomendada para cobertura de testes
Se você quiser cobertura de testes, a melhor prática é:
Usar GitHub Actions ou outra ferramenta de CI.

## ✅ Etapa 2: Método de Análise: ações do GitHub

Pegar o token do SonarCloud (Siga o assistente e copie o Token)

1. Copie o token (guarde, não será mostrado de novo)

---

## ✅ Etapa 3: Adicionar o token no GitHub

1. Acesse seu repositório no GitHub
2. Vá em: `Settings` → `Secrets and variables` → `Actions` → **New repository secret**
3. Nome: `SONAR_TOKEN`
   Valor: _(o token copiado do SonarCloud)_
4. deopois adicione o outro.

---

## ✅ Etapa 4: Criar arquivo de configuração `sonar-project.properties`

Na raiz do projeto, crie um arquivo:

```bash
touch sonar-project.properties
```

Conteúdo: verificar a sua configuração

```properties
sonar.projectKey=seu-usuario_nome-do-projeto
sonar.organization=seu-usuario
sonar.host.url=https://sonarcloud.io
sonar.token=${SONAR_TOKEN}

sonar.sources=src
sonar.exclusions=**/*.test.ts
sonar.tests=tests
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

```properties
sonar.projectKey=iff-sonarcloud-program-typescript-server  # Substitua pelo ID do projeto no SonarCloud
sonar.organization=leonardorsolar       # Nome da sua organização no SonarCloud
sonar.host.url=https://sonarcloud.io
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Diretórios importantes
sonar.sources=src
sonar.tests=test
sonar.exclusions=**/*.spec.ts

# Para TypeScript com Jest
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

> Substitua os campos `projectKey` e `organization` com os dados do SonarCloud.

---

## ✅ Etapa 5: Commit e push

```bash
git add .
git commit -m "Configuração do SonarCloud com GitHub Actions"
git push origin main
```

## ✅ Etapa 6: Criar o GitHub Action

Crie o arquivo `.github/workflows/build.yml`:

```yaml
name: Build
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonarqube:
    name: SonarQube
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Shallow clones should be disabled for a better relevancy of analysis
      - name: Install dependencies
        run: npm install
      - name: Run tests with coverage
        run: npm test -- --coverage --coverageReporters=lcov --coverageReporters=text
      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@v5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

---

## ✅ Etapa 7: Commit e push

```bash
git add .
git commit -m "Configuração do SonarCloud com GitHub Actions"
git push origin main
```

---

## ✅ Etapa 8: Verificar no GitHub e SonarCloud

- Vá até o GitHub → **Actions**

  - Verifique se a action foi executada com sucesso

- Vá até o **SonarCloud → Projects**

  - Verifique os resultados da análise

---

## ✅ Bônus: Gerar cobertura de testes (opcional)

Se você tiver testes e quiser incluir cobertura de código com Jest:

```bash
npm install --save-dev jest ts-jest @types/jest
npx ts-jest config:init
```

No `package.json`, adicione:

```json
"scripts": {
  "test": "jest --coverage"
}
```

Rode:

```bash
npm run test
```

E aponte o `sonar.typescript.lcov.reportPaths=coverage/lcov.info` no `sonar-project.properties`.

---

Se quiser, posso gerar um PDF ou README com tudo isso formatado. Deseja?

Para configurar TypeScript em Node.js para funcionar com o SonarCloud, você precisa seguir alguns passos importantes:

## 1. Configurar o tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

## 2. Criar o arquivo sonar-project.properties

Na raiz do projeto, crie o arquivo `sonar-project.properties`:

```properties
sonar.projectKey=seu-projeto-key
sonar.organization=sua-organizacao
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.ts,**/*.spec.ts
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.test.ts,**/*.spec.ts,**/node_modules/**
sonar.cpd.exclusions=**/*.test.ts,**/*.spec.ts
```

## 3. Configurar Jest para cobertura de código

No `package.json`, adicione a configuração do Jest:

```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "sonar": "sonar-scanner"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.ts",
      "!src/**/*.test.ts",
      "!src/**/*.spec.ts"
    ],
    "coverageDirectory": "coverage",
    "coverageReporters": ["text", "lcov", "html"]
  }
}
```

## Pontos importantes:

- **Source Maps**: Essencial ter `sourceMap: true` no tsconfig.json para o SonarCloud mapear corretamente o código TypeScript
- **Cobertura**: Configure o Jest para gerar relatórios LCOV que o SonarCloud consegue ler
- **Exclusões**: Exclua arquivos de teste e node_modules da análise
- **Tokens**: Configure os tokens `SONAR_TOKEN` nas variáveis de ambiente do seu CI/CD

Essa configuração garante que o SonarCloud consiga analisar adequadamente seu código TypeScript compilado para Node.js.

Automatic analysis:
https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/automatic-analysis/?_gl=1*18tay96*_gcl_au*MTAyNTA1MTIzLjE3NDgwNTAzNzY.*_ga*MjA1MTUxMDczNy4xNzQ4MDUwMzc2*_ga_9JZ0GZ5TC6*czE3NDg3NzIxMzckbzMkZzEkdDE3NDg3NzI5MzAkajYwJGwwJGgw
