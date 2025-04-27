document.getElementById('deleteProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const profileId = document.getElementById('profileId').value;

    try {
        const response = await fetch(`/admin/profiles/${profileId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.getElementById('result').innerText = 'Profil supprimé avec succès.';
            document.getElementById('deleteProfileForm').reset();
        } else {
            const error = await response.json();
            document.getElementById('result').innerText = `Erreur : ${error.message}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = 'Erreur de connexion au serveur.';
        console.error(err);
    }
});
