document.getElementById('editDeviceForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const deviceId = document.getElementById('deviceId').value;
    const deviceName = document.getElementById('deviceName').value;
    const deviceIP = document.getElementById('deviceIP').value;

    try {
        const response = await fetch(`/devices/${deviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: deviceName, ip_address: deviceIP }),
        });

        if (response.ok) {
            document.getElementById('result').innerText = 'Appareil mis à jour avec succès !';
            document.getElementById('editDeviceForm').reset();
        } else {
            const error = await response.json();
            document.getElementById('result').innerText = `Erreur : ${error.message}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = 'Erreur de connexion au serveur.';
        console.error(err);
    }
});
