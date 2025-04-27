document.getElementById('addProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/admin/profiles/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, role, password }),
        });

        if (response.ok) {
            document.getElementById('result').innerText = 'Profil ajouté avec succès !';
            document.getElementById('addProfileForm').reset();
        } else {
            const error = await response.json();
            document.getElementById('result').innerText = `Erreur : ${error.message}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = 'Erreur de connexion au serveur.';
        console.error(err);
    }
});
