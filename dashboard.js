const SUPABASE_URL = 'https://lbgldgqatlrpazvbgrev.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZ2xkZ3FhdGxycGF6dmJncmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MzM4MzgsImV4cCI6MjA3MzMwOTgzOH0.T61HP6jXtHBD6Jo4_wHTTofDDoUXhzm2EAGaWJfkA5o';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

const avatarDiv = document.getElementById('avatar');

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'index.html';
    } else {
        const userEmail = session.user.email;
        const initial = userEmail.charAt(0).toUpperCase();
        avatarDiv.textContent = initial;
    }
});

async function fazerLogout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}