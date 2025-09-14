# Simulador de Classroom - Entrega AC1

## 1. Objetivo da Entrega
Implementar a primeira funcionalidade principal do software: um sistema completo de autenticação de usuários, incluindo cadastro, login, logout e proteção de páginas.

## 2. Arquitetura e Tecnologias Escolhidas -AC2
Para este projeto, foi escolhida uma arquitetura moderna e robusta, conhecida como "Jamstack" ou "Serverless":
* **Front-end:** HTML5, CSS3 e JavaScript puro.
* **Back-end (BaaS):** Supabase, que fornece um banco de dados PostgreSQL gerenciado e uma API de autenticação completa.
* **Ferramentas:** Visual Studio Code, Supabase Dashboard, GitHub.

## 3. Funcionalidade Implementada -AC3
O software possui as seguintes funcionalidades prontas e funcionais:
* **Cadastro de Usuários:** Novos usuários podem se registrar com email e senha. O sistema dispara um e-mail de confirmação para garantir a validade do email.
* **Login de Usuários:** Usuários existentes podem se autenticar para acessar a plataforma.
* **Proteção de Página:** A página de "dashboard" é protegida e só pode ser acessada por usuários autenticados.
* **Logout:** Usuários logados podem encerrar sua sessão de forma segura.

## 4. Como Executar o Projeto -AC4
1.  Baixe os arquivos `index.html` e `dashboard.html`.
2.  Abra o arquivo `index.html` em qualquer navegador de internet.
3.  Utilize a interface para cadastrar um novo usuário e, em seguida, fazer o login.
