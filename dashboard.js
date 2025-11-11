const SUPABASE_URL = 'https://kiletflvrfbaoeayfqea.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbGV0Zmx2cmZiYW9lYXlmcWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjg4OTEsImV4cCI6MjA3NTgwNDg5MX0.hBKTk1103rNMSNsPrlLuE0MGZbZMrhawQt5CbLVezk4';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const avatarDiv = document.getElementById('avatar');
const turmasContainer = document.getElementById('turmas-container');
const modal = document.getElementById('modal-nova-turma');

async function carregarTurmas() {
    const { data, error } = await supabaseClient.from('courses').select('*');
    if (error) {
        console.error('Erro ao buscar turmas:', error);
        return;
    }
    turmasContainer.innerHTML = '';

    if (data.length === 0) {
        turmasContainer.innerHTML = '<p>Nenhuma turma criada ainda. Clique no + para começar!</p>';
    } else {
        data.forEach(turma => {
            // <-- MUDANÇA AQUI: Adicionamos o onclick no div principal do card -->
            const cardHtml = `
                <div class="turma-card" onclick="irParaDetalhes(${turma.id})">
                    <div class="card-header"><h3>${turma.title}</h3><span>${turma.materia || ''}</span></div>
                    <div class="card-body"></div>
                    <div class="card-footer">
                        <span class="material-icons" title="Atividades">assignment</span>
                        <span class="material-icons" title="Pasta da turma">folder</span>
                    </div>
                </div>`;
            turmasContainer.innerHTML += cardHtml;
        });
    }
}

function abrirModal() {
    modal.style.display = 'flex';
}

function fecharModal() {
    modal.style.display = 'none';
}

async function criarNovaTurma() {
    const nomeTurma = document.getElementById('nome-turma-input').value;
    const materia = document.getElementById('materia-input').value; // Usando os dois campos

    if (!nomeTurma) { // Apenas o nome é obrigatório por enquanto
        alert('Por favor, preencha o nome da turma.');
        return;
    }

    const { data, error } = await supabaseClient
        .from('courses')
        .insert([
            { title: nomeTurma, materia: materia } // Enviando os dois campos
        ]);

    if (error) {
        console.error('Erro ao criar turma:', error);
        alert('Ocorreu um erro. Verifique o console.');
    } else {
        alert('Turma criada com sucesso!');
        fecharModal();
        carregarTurmas();
    }
}

// <-- MUDANÇA AQUI: Nova função para redirecionar -->
function irParaDetalhes(turmaId) {
    // Redireciona para a nova página, passando o ID da turma na URL
    window.location.href = `turma_detalhes.html?id=${turmaId}`;
}

// Lógica principal com onAuthStateChange
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
        const userEmail = session.user.email;
        const initial = userEmail.charAt(0).toUpperCase();
        avatarDiv.textContent = initial;
        carregarTurmas();
    } else {
        window.location.href = 'index.html';
    }
});

async function fazerLogout() {
    await supabaseClient.auth.signOut();
    // O onAuthStateChange vai detectar o logout e redirecionar sozinho.
}