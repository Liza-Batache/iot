
fetch('/devices/all')
  .then(response => response.json())
  .then(devices => {
    const list = document.getElementById('device-list');
    devices.forEach(device => {
      const li = document.createElement('li');
      li.textContent = `${device.name} (${device.ip_address}) - ${device.status}`;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des appareils :', error);
  });
