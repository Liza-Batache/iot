document.getElementById('deleteButton').addEventListener('click', async () => {
    const deviceId = document.getElementById('deviceId').value;

    if (!deviceId) {
        alert('Please enter a Device ID');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/devices/${deviceId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Device deleted successfully!');
        } else if (response.status === 404) {
            alert('Device not found.');
        } else {
            alert('An error occurred while deleting the device.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server.');
    }
});
