const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const devicesRoutes = require('./routes/devices');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/users-from-service', async (req, res) => {
    try {
        const response = await axios.get(process.env.USER_SERVICE_URL + '/users');
        res.json(response.data);
    } catch (error) {
        console.error('Erreur lors de l’appel à user-service:', error.message);
        res.status(500).json({ error: 'Erreur de communication avec user-service' });
    }
});

app.use('/devices', devicesRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/html', express.static(path.join(__dirname, 'public/html')));

app.get('/', (req, res) => {
    res.send('Mon nom : [Votre Nom]');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Application running on http://localhost:${PORT}`);
});
