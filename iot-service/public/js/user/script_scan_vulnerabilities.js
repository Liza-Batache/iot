document.addEventListener('DOMContentLoaded', () => {
    console.log('Script chargé pour les vulnérabilités.');
});

async function scanVulnerabilities() {
    try {
        const response = await fetch('/scan/vulnerabilities');

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const vulnerabilities = await response.json();

        console.log('Vulnerabilities:', vulnerabilities);

        // Vérifiez que vulnerabilities est un tableau
        if (!Array.isArray(vulnerabilities)) {
            throw new Error('La réponse retournée n\'est pas un tableau.');
        }

        const tableBody = document.getElementById('vulnerabilitiesTableBody');
        const emptyMessage = document.getElementById('emptyMessage');

        tableBody.innerHTML = ''; // Nettoyer le tableau existant

        if (vulnerabilities.length === 0) {
            emptyMessage.style.display = 'block';
            return;
        }

        emptyMessage.style.display = 'none';

        vulnerabilities.forEach(vuln => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vuln.device_id}</td>
                <td>${vuln.type}</td>
                <td>${vuln.details}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erreur:', error.message);
        alert('Erreur lors du scan des vulnérabilités.');
    }
}
