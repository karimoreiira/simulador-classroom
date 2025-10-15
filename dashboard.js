// --- NOVAS CREDENCIAIS ---
const SUPABASE_URL = 'https://kiletflvrfbaoeayfqea.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbGV0Zmx2cmZiYW9lYXlmcWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjg4OTEsImV4cCI6MjA3NTgwNDg5MX0.hBKTk1103rNMSNsPrlLuE0MGZbZMrhawQt5CbLVezk4';
// -------------------------

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const avatarDiv = document.getElementById('avatar');
const turmasContainer = document.getElementById('turmas-container');
const modal = document.getElementById('modal-nova-turma');


supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log('Estado da autenticação mudou:', event);

    if (session) {
        
        console.log('Sessão encontrada para:', session.user.email);
        const userEmail = session.user.email;
        const initial = userEmail.charAt(0).toUpperCase();
        avatarDiv.textContent = initial;
        
        
        carregarTurmas();
    } else {
       
        console.log('Nenhuma sessão encontrada. Redirecionando para login.');
        window.location.href = 'index.html';
    }
});


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
            const cardHtml = `
                <div class="turma-card">
                    <div class="card-header"><h3>${turma.title}</h3></div>
                    <div class="card-body"></div>
                    <div class="card-footer"><span class="material-icons" title="Atividades">assignment</span><span class="material-icons" title="Pasta da turma">folder</span></div>
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
    const materia = document.getElementById('materia-input').value;

    if (!nomeTurma || !materia) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const { data, error } = await supabaseClient
        .from('courses')
        .insert([
            { title: nomeTurma, materia: materia }
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

async function fazerLogout() {
    await supabaseClient.auth.signOut();
}