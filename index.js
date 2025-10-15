const SUPABASE_URL = 'https://kiletflvrfbaoeayfqea.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbGV0Zmx2cmZiYW9lYXlmcWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjg4OTEsImV4cCI6MjA3NTgwNDg5MX0.hBKTk1103rNMSNsPrlLuE0MGZbZMrhawQt5CbLVezk4';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const resultadoDiv = document.getElementById('resultado');

async function cadastrarUsuario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    resultadoDiv.innerHTML = 'Cadastrando...';

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: senha,
    });

    if (error) {
        resultadoDiv.innerHTML = `Erro: ${error.message}`;
        resultadoDiv.style.color = 'red';
    } else {
        resultadoDiv.innerHTML = 'Cadastro realizado! Verifique seu email para confirmar.';
        resultadoDiv.style.color = 'green';
        console.log(data);
    }
}

async function loginUsuario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    resultadoDiv.innerHTML = 'Entrando...';

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) {
        resultadoDiv.innerHTML = `Erro: ${error.message}`;
        resultadoDiv.style.color = 'red';
    } else {
        window.location.href = 'dashboard.html';
    }
}