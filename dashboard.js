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
            const cardHtml = `
                <div class="turma-card" onclick="irParaDetalhes(${turma.id})">
                    <div class="card-header">
                        <h3>${turma.title}</h3>
                        <span>${turma.materia || ''}</span>
                        <span class="delete-icon-turma" onclick="event.stopPropagation(); deletarTurma(${turma.id});">🗑️</span>
                    </div>
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
    const materia = document.getElementById('materia-input').value; 

    if (!nomeTurma) { 
        alert('Por favor, preencha o nome da turma.');
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

function irParaDetalhes(turmaId) {
    window.location.href = `turma_detalhes.html?id=${turmaId}`;
}

async function deletarTurma(turmaId) {
    
    if (!confirm("Tem certeza que deseja deletar esta turma?\n\nAVISO: ISSO APAGARÁ TODAS AS ATIVIDADES DENTRO DELA E NÃO PODE SER DESFEITO.")) {
        return;
    }

    console.log("Deletando turma ID:", turmaId);
    
    
    const { error: errorAtividades } = await supabaseClient
        .from('atividades')
        .delete()
        .eq('course_id', turmaId);

    if (errorAtividades) {
        console.error("Erro ao deletar atividades da turma:", errorAtividades);
        alert("Erro ao tentar limpar as atividades da turma.");
        return; 
    }

    const { error: errorTurma } = await supabaseClient
        .from('courses')
        .delete()
        .eq('id', turmaId);
    
    if (errorTurma) {
        console.error("Erro ao deletar turma:", errorTurma);
        alert("Erro ao deletar a turma.");
    } else {
        alert("Turma e todas as suas atividades foram deletadas com sucesso!");
        carregarTurmas(); 
    }
}

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
}