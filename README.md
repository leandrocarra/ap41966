# Neoenergia Agência Virtual

Projeto Agência Virtual das distribuidoras: <br> 
• NEOENERGIA COELBA <br> 
• NEOENERGIA COSERN  <br>
• NEOENERGIA ELEKTRO  <br>
• NEOENERGIA PERNAMBUCO <br>
<br>

# Descrições

Angular CLI
```bash
Version 13.3.3
```
NodeJs
```bash
Version 16.13.1
```
Angular
```bash
Version 13.3.3
```
Package Manager
```bash
Yarn v1.22.17
```
Typescript
```bash
Version 4.6.3
```
Rxjs
```bash
Version 7.5.5
```
<br>
<br>

# Instalação do Projeto

```bash
yarn install
```
<br>

## 

Utilize `yarn start` para executar o servidor de desenvolvimento.
<br>
Para executar o ambiente de uma distribuidora específica, utilize os scripts de execução a seguir:

NEOENERGIA COELBA
```bash
yarn start:coelba
```
NEOENERGIA COSERN
```bash
yarn start:cosern
```
NEOENERGIA ELEKTRO
```bash
yarn start:elektro
```
NEOENERGIA PERNAMBUCO
```bash
yarn start:celpe
```
<br>
<br>

# Builds da Aplicação

| DISTRIBUIDORA         | AMBIENTE |  COMANDO                              |
|-----------------------|----------|---------------------------------------|
| NEOENERGIA COELBA     | QA       | ng build --configuration=coelba-qa    |
| NEOENERGIA COELBA     | PROD     | ng build --configuration=coelba-prod  |
| NEOENERGIA COSERN     | QA       | ng build --configuration=cosern-qa    |
| NEOENERGIA COSERN     | PROD     | ng build --configuration=cosern-prod  |
| NEOENERGIA ELEKTRO    | QA       | ng build --configuration=elektro-qa   |
| NEOENERGIA ELEKTRO    | PROD     | ng build --configuration=elektro-prod |
| NEOENERGIA PERNAMBUCO | QA       | ng build --configuration=celpe-qa     |
| NEOENERGIA PERNAMBUCO | PROD     | ng build --configuration=celpe-prod   |

<br>
<br>

# Geração dos Testes Unitários para o Coverage
```bash
yarn coverage:wf
```
