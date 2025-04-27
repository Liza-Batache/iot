document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/admin/profiles/all');
        if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs.');
        
        const users = await response.json();
        const tableBody = document.getElementById('usersTableBody');

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});
