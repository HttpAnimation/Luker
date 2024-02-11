const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Read API key from ApiKey.json
const apiKeyData = JSON.parse(fs.readFileSync('ApiKey.json'));
const apiKey = apiKeyData.apiKey;

app.get('/player/:steamid', async (req, res) => {
    try {
        const steamId = req.params.steamid;
        const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`App can be found at localhost:3000`)
});
