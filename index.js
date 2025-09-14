const SUPABASE_URL = 'https://lbgldgqatlrpazvbgrev.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZ2xkZ3FhdGxycGF6dmJncmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MzM4MzgsImV4cCI6MjA3MzMwOTgzOH0.T61HP6jXtHBD6Jo4_wHTTofDDoUXhzm2EAGaWJfkA5o';

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