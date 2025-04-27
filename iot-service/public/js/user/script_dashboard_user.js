document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Requête vers le serveur pour récupérer les appareils
        const responseDevices = await fetch('/user/devices');
        if (!responseDevices.ok) {
            throw new Error(`Erreur HTTP : ${responseDevices.status}`);
        }

        // Analyse des données JSON
        const devices = await responseDevices.json();
        console.log('Appareils récupérés :', devices);

        // Vérification des éléments dans le DOM
        const tableBody = document.getElementById('userDevicesTableBody');
        const deviceCountElement = document.getElementById('deviceCount');
        const alertCountElement = document.getElementById('alertCount');

        if (!tableBody) {
            console.warn("L'élément 'userDevicesTableBody' est absent du DOM.");
        }
        if (!deviceCountElement) {
            console.warn("L'élément 'deviceCount' est absent du DOM.");
        }
        if (!alertCountElement) {
            console.warn("L'élément 'alertCount' est absent du DOM.");
        }

        // Mise à jour des statistiques si les éléments existent
        if (tableBody) {
            devices.forEach(device => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${device.id}</td>
                    <td>${device.name}</td>
                    <td>${device.ip_address}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        if (deviceCountElement) {
            deviceCountElement.innerText = devices.length;
        }

        if (alertCountElement) {
            alertCountElement.innerText = devices.filter(device => device.vulnerable).length;
        }

    } catch (err) {
        console.error('Erreur lors de la récupération des données utilisateur :', err);

        // Affichage d'une erreur dans la table
        const tableBody = document.getElementById('userDevicesTableBody');
        if (tableBody) {
            tableBody.innerHTML = `<tr><td colspan="3">Erreur de connexion ou aucun appareil trouvé.</td></tr>`;
        }
    }
});
