# Sistema MusicADJ

**Autor:** José Flávio Fernandes Pinheiro  
**Disciplina:** Desenvolvimento Web para Nuvem – UERN  
**Atividade:** Implementação de Testes Automatizados e Integração Contínua (CI/CD)  
**Deploy:** https://sistemamusicadj.onrender.com/

---

##  Descrição do Projeto

O **MusicADJ** é um sistema web simples desenvolvido em **Node.js (Express)**, com **frontend em HTML, CSS e JavaScript**, que permite o login do usuário e a exibição de uma lista de músicas.

Durante a **Unidade III**, o projeto foi expandido com:
-  **Testes automatizados (Jest + Supertest)**
-  **Pipeline de Integração Contínua (CI/CD) com GitHub Actions**
-  **Deploy automático no Render**
-  **Conexão com banco de dados PostgreSQL**

Essas implementações garantem **qualidade, automação e entrega contínua**, seguindo boas práticas de desenvolvimento web para nuvem.

---

##  Tecnologias Utilizadas

### Backend
- Node.js + Express  
- JWT (autenticação)
- CORS
- Dotenv
- PostgreSQL com `pg`

### Testes
- Jest  
- Supertest  

### CI/CD
- GitHub Actions  
- Deploy automático no Render via **Deploy Hook**

---

##  Testes Automatizados

Foram implementados dois conjuntos de testes:

### **1. Testes de Backend**
- Utilizando **Jest** e **Supertest**.
- Verificam se as rotas do servidor respondem corretamente.  
- Exemplo de teste para a rota `/ping` e `/pingdb` (validação do banco).

### **2. Testes de Frontend**
- Teste simples de função `verificarToken()` (JavaScript puro).  
- Garante que o token de autenticação é verificado corretamente.

📷 *Figura 1 – Execução dos testes automatizados no terminal (Jest).*

---

##  Pipeline CI/CD com GitHub Actions

O arquivo `.github/workflows/main.yml` define o pipeline automatizado.

Cada **push na branch `main`** executa automaticamente:
1. Instalação das dependências (`npm install`)
2. Execução dos testes (`npx jest --ci --runInBand`)
3. Deploy automático no **Render**

O deploy é realizado através de uma variável secreta (`RENDER_DEPLOY_HOOK`) configurada nos *Secrets* do GitHub.

📷 *Figura 2 – Execução do pipeline CI/CD no GitHub Actions.*

---

##  Banco de Dados PostgreSQL (Render)

O sistema foi conectado a um banco **PostgreSQL hospedado no Render**, utilizando o driver `pg`.

- O arquivo `db.js` gerencia a conexão segura.
- O endpoint `/pingdb` valida a comunicação com o banco.  
- Tabelas criadas:
  - `users` → usuários com autenticação JWT  
  - `musicas` → músicas cadastradas  

📷 *Figura 3 – Página do sistema MusicADJ e resposta do endpoint `/pingdb`.*

