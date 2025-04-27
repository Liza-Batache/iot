document.getElementById('addDeviceForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('deviceName').value;
    const ip_address = document.getElementById('deviceIP').value;

    // Vous devez définir ou récupérer userId
    const userId = 1; // Remplacez par une valeur dynamique si possible

    try {
        const response = await fetch('/devices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name, // Correction ici
                ip_address: ip_address, // Correction ici
                user_id: userId // Ajout de l'ID utilisateur
            })
        });

        if (response.ok) {
            document.getElementById('result').innerText = 'Appareil ajouté avec succès !';
            document.getElementById('addDeviceForm').reset();
        } else {
            const error = await response.json();
            document.getElementById('result').innerText = `Erreur : ${error.message}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = 'Erreur de connexion au serveur.';
        console.error(err);
    }
});
