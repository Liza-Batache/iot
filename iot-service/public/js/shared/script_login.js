document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const messageElement = document.getElementById('loginMessage');
    messageElement.textContent = ''; // Réinitialiser le message

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
            messageElement.style.color = 'green';
            messageElement.textContent = 'Connexion réussie.';

            // Vérifiez si le rôle est défini
            if (data.user && data.user.role) {
                if (data.user.role === 'admin') {
                    window.location.href = '/html/admin/dashboard_admin.html';
                } else if (data.user.role === 'user') {
                    window.location.href = '/html/user/dashboard_user.html';
                } else {
                    messageElement.style.color = 'red';
                    messageElement.textContent = 'Rôle inconnu. Contactez l\'administrateur.';
                }
            } else {
                messageElement.style.color = 'red';
                messageElement.textContent = 'Erreur : rôle utilisateur non défini.';
                console.error('Rôle utilisateur non défini dans la réponse :', data);
            }
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = data.message || 'Erreur de connexion.';
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        messageElement.style.color = 'red';
        messageElement.textContent = 'Erreur serveur. Veuillez réessayer plus tard.';
    }
});
