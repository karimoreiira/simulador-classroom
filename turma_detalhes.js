// --- CONFIGURAÇÃO JÁ PREENCHIDA ---
const SUPABASE_URL = 'https://kiletflvrfbaoeayfqea.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbGV0Zmx2cmZiYW9lYXlmcWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjg4OTEsImV4cCI6MjA3NTgwNDg5MX0.hBKTk1103rNMSNsPrlLuE0MGZbZMrhawQt5CbLVezk4';
// ---------------------------------------------------------

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Pegando os elementos da página
const avatarDiv = document.getElementById('avatar');
const turmaNomeH2 = document.getElementById('turma-nome');
const turmaMateriaP = document.getElementById('turma-materia');
const atividadesContainer = document.getElementById('atividades-container');

let idDaTurmaAtual = null; // Variável global para sabermos em qual turma estamos

// Pega o ID da turma da URL (ex: ?id=1)
function getIdDaUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); 
}

// Carrega os dados da Turma e suas Atividades
async function carregarDetalhesDaTurma() {
    idDaTurmaAtual = getIdDaUrl();
    if (!idDaTurmaAtual) {
        console.error("ID da turma não encontrado na URL!");
        turmaNomeH2.textContent = "Erro: Turma não encontrada";
        atividadesContainer.innerHTML = '<li>Erro ao carregar turma.</li>'; 
        return;
    }

    // 1. Buscar dados da turma (courses)
    const { data: turmaData, error: turmaError } = await supabaseClient
        .from('courses')
        .select('*')
        .eq('id', idDaTurmaAtual) 
        .single(); 

    if (turmaError || !turmaData) {
        console.error("Erro ao buscar detalhes da turma:", turmaError);
        turmaNomeH2.textContent = "Erro ao carregar turma";
         atividadesContainer.innerHTML = '<li>Erro ao carregar turma.</li>';
        return;
    }

    turmaNomeH2.textContent = turmaData.title;
    turmaMateriaP.textContent = turmaData.materia || ''; 

    // 2. Buscar atividades da turma (atividades)
    const { data: atividadesData, error: atividadesError } = await supabaseClient
        .from('atividades')
        .select('*')
        .eq('course_id', idDaTurmaAtual); 

    if (atividadesError) {
        console.error("Erro ao buscar atividades:", atividadesError);
        atividadesContainer.innerHTML = '<li>Erro ao carregar atividades.</li>';
        return;
    }

    atividadesContainer.innerHTML = ''; 
    if (atividadesData.length === 0) {
        atividadesContainer.innerHTML = '<li>Nenhuma atividade criada ainda.</li>';
    } else {
        atividadesData.forEach(atividade => {
            // Adiciona o <span> da lixeira aqui
            const atividadeHtml = `
                <li>
                    <span class="material-icons">assignment</span>
                    <div>
                        <span class="delete-icon" onclick="deletarAtividade(${atividade.id})">🗑️</span>
                        <strong>${atividade.titulo}</strong>
                        <p>${atividade.descricao || ''}</p>
                    </div>
                </li>
            `;
            atividadesContainer.innerHTML += atividadeHtml;
        });
    }
}

// Cria uma nova atividade
async function criarNovaAtividade() {
    const titulo = document.getElementById('atividade-titulo').value;
    const descricao = document.getElementById('atividade-descricao').value;

    if (!titulo) {
        alert("Por favor, preencha o título da atividade.");
        return;
    }
    if (!idDaTurmaAtual) {
        alert("Erro: ID da turma não encontrado."); return;
    }

    const { data, error } = await supabaseClient
        .from('atividades')
        .insert([ { titulo: titulo, descricao: descricao, course_id: idDaTurmaAtual } ]);

    if (error) {
        console.error("Erro ao criar atividade:", error);
        alert("Ocorreu um erro. Verifique o console.");
    } else {
        alert("Atividade criada com sucesso!");
        document.getElementById('atividade-titulo').value = '';
        document.getElementById('atividade-descricao').value = '';
        carregarDetalhesDaTurma(); // Recarrega a lista
    }
}

// --- NOVA FUNÇÃO ADICIONADA ---
async function deletarAtividade(atividadeId) {
    if (!confirm("Tem certeza que deseja deletar esta atividade?")) {
        return; 
    }

    console.log("Deletando atividade ID:", atividadeId);
    const { error } = await supabaseClient
        .from('atividades')
        .delete()
        .eq('id', atividadeId); 

    if (error) {
        console.error("Erro ao deletar atividade:", error);
        alert("Erro ao deletar atividade.");
    } else {
        alert("Atividade deletada com sucesso!");
        carregarDetalhesDaTurma(); // Recarrega a lista
    }
}
// --- FIM DA NOVA FUNÇÃO ---

// Faz o Logout
async function fazerLogout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}

// LÓGICA PRINCIPAL DA PÁGINA (Segurança e Carregamento)
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
        avatarDiv.textContent = session.user.email.charAt(0).toUpperCase();
        carregarDetalhesDaTurma(); 
    } else {
        window.location.href = 'index.html';
    }
});