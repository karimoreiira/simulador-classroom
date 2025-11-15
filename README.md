Simulador de Classroom - Projeto de Software

1. Objetivo do Projeto

Desenvolver um software web funcional que simula as principais funcionalidades do Google Classroom, com entregas incrementais ao longo do semestre.

2. Arquitetura e Tecnologias

Front-end: HTML5, CSS3 e JavaScript.

Back-end (BaaS): Supabase, que fornece um banco de dados PostgreSQL gerenciado e APIs de autenticação e dados.

Ferramentas: Visual Studio Code, GitHub, Mermaid.

3. Funcionalidades Implementadas

AC1: Sistema de Autenticação e Segurança

Cadastro de novos usuários e tela de Login.

Proteção da página de "Dashboard", acessível apenas para usuários logados.

Função de Logout.

AC2: Criação e Listagem de Turmas

Implementação da criação de novas turmas (pop-up modal).

O dashboard busca e exibe dinamicamente a lista de turmas do banco de dados (courses).

AC3: Gerenciamento de Atividades da Turma

Página de "Detalhes da Turma" acessível ao clicar em um card.

A página busca e exibe a lista de atividades (atividades) específica daquela turma.

Formulário para criar novas atividades e associá-las à turma correta.

AC4: Gerenciamento de Exclusão (CRUD Completo)

Implementada a funcionalidade de Deletar Atividades na página de detalhes da turma.

Implementada a funcionalidade de Deletar Turmas no dashboard principal.

O sistema gerencia a integridade do banco (deleta atividades "filhas" antes de deletar a turma "mãe").

4. Diagramas do Projeto

Os diagramas de engenharia de software do projeto estão localizados na pasta /docs.

Diagrama de Caso de Uso (Link): Mostra as interações e casos de uso do ator "Professor" com o sistema.

Diagrama de Classes (Link): Mostra a arquitetura das classes e a estrutura do banco de dados.

5. Como Executar o Projeto

Baixe os arquivos do repositório.

Abra o arquivo index.html em qualquer navegador de internet.

Utilize a interface para cadastrar um novo usuário e, em seguida, fazer o login.
