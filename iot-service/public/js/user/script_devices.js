document.addEventListener('DOMContentLoaded', async () => {
    const devicesGrid = document.getElementById('devicesGrid');
    if (!devicesGrid) {
        console.error("L'élément devicesGrid est introuvable !");
        return;
    }

    try {
        console.log('Envoi de la requête GET vers /devices/all...');
        const response = await fetch('/devices/all'); // Modifier le chemin si nécessaire
        if (!response.ok) {
            throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
        }

        const devices = await response.json();
        console.log('Appareils récupérés :', devices);

        devices.forEach(device => {
            const deviceBox = document.createElement('div');
            deviceBox.className = 'device-box';

            deviceBox.innerHTML = `
                <h2>${device.name}</h2>
                <p><strong>IP :</strong> ${device.ip_address}</p>
                <p><strong>ID :</strong> ${device.id}</p>
            `;

            devicesGrid.appendChild(deviceBox);
        });
    } catch (err) {
        console.error('Erreur lors de la récupération des appareils :', err);
        const result = document.getElementById('result');
        if (result) result.innerText = 'Erreur de connexion au serveur.';
    }
});
