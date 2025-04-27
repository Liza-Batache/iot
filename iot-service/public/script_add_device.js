document.getElementById('addButton').addEventListener('click', async () => {
    const deviceName = document.getElementById('deviceName').value;
    const deviceIP = document.getElementById('deviceIP').value;

    if (!deviceName || !deviceIP) {
        document.getElementById('result').innerText = 'Please fill out all fields.';
        return;
    }

    try {
        const response = await fetch('/devices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: deviceName,
                ip_address: deviceIP,
                user_id: userId // Ajoutez cette valeur
            })
        });
        

        if (response.ok) {
            document.getElementById('result').innerText = 'Device added successfully!';
        } else {
            document.getElementById('result').innerText = 'Error adding device. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Failed to connect to the server.';
    }
});
