document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch des statistiques
        const response = await fetch('/admin/dashboard/stats');
        const stats = await response.json();

        // Mettre à jour les statistiques dans le DOM
        document.getElementById('userCount').innerText = stats.userCount;
        document.getElementById('deviceCount').innerText = stats.deviceCount;
        document.getElementById('alertCount').innerText = stats.alertCount;
    } catch (err) {
        console.error('Erreur lors du chargement des statistiques :', err);
    }
});
