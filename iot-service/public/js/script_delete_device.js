document.getElementById('deleteDeviceForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('deviceId').value;

    try {
        const response = await fetch(`/devices/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.getElementById('result').innerText = 'Appareil supprimé avec succès !';
            document.getElementById('deleteDeviceForm').reset();
        } else {
            const error = await response.json();
            document.getElementById('result').innerText = `Erreur : ${error.message}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = 'Erreur de connexion au serveur.';
        console.error(err);
    }
});
