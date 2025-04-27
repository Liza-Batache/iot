document.getElementById('searchDeviceForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const deviceId = document.getElementById('deviceId').value;
    const resultContainer = document.getElementById('resultContainer');
    const deviceName = document.getElementById('deviceName');
    const deviceIP = document.getElementById('deviceIP');
    const deviceID = document.getElementById('deviceID');
    const error = document.getElementById('error');

    resultContainer.style.display = 'none';
    error.innerText = '';

    try {
        const response = await fetch(`/devices/${deviceId}`, {
            method: 'GET',
        });

        if (response.ok) {
            const device = await response.json();
            deviceName.innerText = `Nom : ${device.name}`;
            deviceIP.innerText = `Adresse IP : ${device.ip_address}`;
            deviceID.innerText = `ID : ${device.id}`;
            resultContainer.style.display = 'block';
        } else {
            const errorMessage = await response.text();
            error.innerText = `Erreur : ${errorMessage}`;
        }
    } catch (err) {
        console.error(err);
        error.innerText = 'Erreur de connexion au serveur.';
    }
});
