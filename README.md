# Simulador de Classroom - Projeto de Software

## 1. Objetivo do Projeto
Desenvolver um software web funcional que simula as principais funcionalidades do Google Classroom, com entregas incrementais ao longo do semestre.

## 2. Arquitetura e Tecnologias
* **Front-end:** HTML5, CSS3 e JavaScript.
* **Back-end (BaaS):** Supabase, que fornece um banco de dados PostgreSQL gerenciado e APIs de autenticação e dados.
* **Ferramentas:** Visual Studio Code, GitHub.

## 3. Funcionalidades Implementadas

### AC1: Sistema de Autenticação e Segurança
- Cadastro de novos usuários com confirmação por e-mail.
- Tela de Login para autenticação.
- Proteção da página de "Dashboard", acessível apenas para usuários logados.
- Função de Logout para encerrar a sessão.

### AC2: Criação e Listagem de Turmas
- Implementação da criação de novas turmas através de um formulário em pop-up (modal).
- O dashboard busca e exibe dinamicamente a lista de turmas do banco de dados (`courses`).

### AC3: Gerenciamento de Atividades da Turma
- Ao clicar em uma turma, o usuário é levado a uma nova página de "Detalhes da Turma".
- A página busca e exibe a lista de atividades (`atividades`) específica daquela turma.
- Implementado formulário para criar novas atividades (com título e descrição) e associá-las à turma correta.

## 4. Estrutura do Banco de Dados (PostgreSQL)
O banco de dados do projeto consiste nas seguintes tabelas:

**Tabela `courses` (Turmas):**
```sql
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    materia TEXT
);
CREATE TABLE atividades (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    titulo TEXT NOT NULL,
    descricao TEXT,
    course_id BIGINT REFERENCES courses(id)
);
