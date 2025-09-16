# Simulador de Classroom - Entrega AC1

## 1. Objetivo da Entrega
O objetivo desta primeira entrega (AC1) foi implementar a funcionalidade principal e a base de segurança do software: um sistema completo de autenticação de usuários.

## 2. Arquitetura e Tecnologias Escolhidas
Para este projeto, foi escolhida uma arquitetura moderna e robusta:
* **Front-end:** HTML5, CSS3 e JavaScript.
* **Back-end (BaaS):** Supabase, que fornece um banco de dados PostgreSQL gerenciado e uma API de autenticação completa.
* **Ferramentas:** Visual Studio Code, Supabase Dashboard, GitHub.

## 3. Estrutura do Banco de Dados (PostgreSQL)
A funcionalidade de autenticação utiliza uma tabela `usuarios` no banco de dados PostgreSQL. O código-fonte para a criação desta tabela (schema) é o seguinte:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL
);
## 4. Funcionalidade Implementada na AC1
O software possui as seguintes funcionalidades prontas e funcionais nesta entrega:

Cadastro de Usuários: Novos usuários podem se registrar com email e senha. O sistema dispara um e-mail de confirmação para garantir a validade do email.

Login de Usuários: Usuários existentes podem se autenticar para acessar a plataforma.

Proteção de Página: A página de "dashboard" é protegida e só pode ser acessada por usuários autenticados.

Logout: Usuários logados podem encerrar sua sessão de forma segura.

5. Como Executar o Projeto
Baixe os 6 arquivos do repositório (.html, .css, .js).

Abra o arquivo index.html em qualquer navegador de internet.

Utilize a interface para cadastrar um novo usuário e, em seguida, fazer o login.
