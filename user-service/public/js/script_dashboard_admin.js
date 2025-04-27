document.addEventListener("DOMContentLoaded", async () => {
    await fetchUsers();
});

async function fetchUsers() {
    try {
        const response = await fetch("/users");
        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }
        const users = await response.json();
        const usersTable = document.getElementById("usersTable").getElementsByTagName("tbody")[0];

        if (!usersTable) {
            console.error("❌ L'élément usersTable n'existe pas !");
            return;
        }

        usersTable.innerHTML = "";
        users.forEach(user => {
            const row = usersTable.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
            `;
        });

        console.log("✅ Utilisateurs chargés avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
    }
}
