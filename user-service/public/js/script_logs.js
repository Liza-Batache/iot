document.addEventListener('DOMContentLoaded', () => {
    console.log('Chargement des journaux...');

    fetch('/admin/logs')
        .then(response => response.json())
        .then(logs => {
            const logsTableBody = document.getElementById('logsTableBody');

            logs.forEach(log => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${log.action}</td>
                    <td>${log.user}</td>
                    <td>${new Date(log.timestamp).toLocaleString()}</td>
                `;
                logsTableBody.appendChild(row);
            });
        })
        .catch(err => console.error('Erreur lors de la récupération des journaux :', err));
});
