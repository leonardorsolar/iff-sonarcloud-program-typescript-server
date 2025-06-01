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

---

## ✅ Etapa 1: Criar conta no SonarCloud

1. Acesse: [https://sonarcloud.io](https://sonarcloud.io)
   https://docs.sonarsource.com/sonarqube-cloud/
2. Clique em **"Log in with GitHub"**
3. Autorize o acesso ao GitHub
4. Crie um projeto no SonarCloud:
   - Clique em + no menu lateral > Analyze new project
5. Selecione seu repositório público do GitHub:

- Clique em Import from a DevOps platform: Github e depois clique em configure
- Clique em use github e autentique
- Aparecerá uma tela do SonarQubeCloud, role até o final
- Cliquem em select repositories. Selecione o repositório que você subiu: iff-sonarcloud-program-typescript-server
- clique em save.
- Clique novamente + Analyze new project, se necessário

7. Escolha:
   o nome do seu projeto: iff-sonarcloud-program-typescript-server
8. Clique em **"Set Up"** ( configurar)
9. Clique em previous version
10. Cliquem em Create project

---

## ✅ Etapa 2: Pegar o token do SonarCloud (Siga o assistente e copie o Token)

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

Conteúdo:

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

Crie o arquivo `.github/workflows/sonarcloud.yml`:

```yaml
name: SonarCloud

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  build:
    name: SonarCloud Scan
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Instalar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Instalar dependências
        run: npm install

      - name: Rodar análise SonarCloud
        uses: SonarSource/sonarcloud-github-action@v2
        with:
          args: >
            -Dsonar.projectKey=seu-usuario_nome-do-projeto
            -Dsonar.organization=seu-usuario
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

## 4. Configurar o GitHub Actions (se usando)

Crie `.github/workflows/sonar.yml`:

```yaml
name: SonarCloud Analysis
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests with coverage
        run: npm run test:coverage
        
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## 5. Dependências necessárias

Instale as dependências de desenvolvimento:

```bash
npm install --save-dev typescript @types/node jest ts-jest @types/jest
```

## 6. Estrutura de diretórios recomendada

```
projeto/
├── src/
│   ├── index.ts
│   └── **/*.ts
├── dist/
├── coverage/
├── tsconfig.json
├── sonar-project.properties
├── package.json
└── jest.config.js (opcional)
```

## Pontos importantes:

- **Source Maps**: Essencial ter `sourceMap: true` no tsconfig.json para o SonarCloud mapear corretamente o código TypeScript
- **Cobertura**: Configure o Jest para gerar relatórios LCOV que o SonarCloud consegue ler
- **Exclusões**: Exclua arquivos de teste e node_modules da análise
- **Tokens**: Configure os tokens `SONAR_TOKEN` nas variáveis de ambiente do seu CI/CD

Essa configuração garante que o SonarCloud consiga analisar adequadamente seu código TypeScript compilado para Node.js.