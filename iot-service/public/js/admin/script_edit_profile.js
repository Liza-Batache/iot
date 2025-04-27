document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const profileId = document.getElementById('profileId').value;
    const username = document.getElementById('username').value || undefined;
    const email = document.getElementById('email').value || undefined;
    const role = document.getElementById('role').value || undefined;

    // Construct the update object
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    try {
        const response = await fetch(`/admin/profiles/${profileId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            const updatedProfile = await response.json();
            alert('Profil mis à jour avec succès.');
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Erreur lors de la mise à jour du profil.');
        }
    } catch (error) {
        console.error(error);
        alert('Erreur de connexion au serveur.');
    }
});
