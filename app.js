const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Read API key from ApiKey.json
const apiKeyData = JSON.parse(fs.readFileSync('ApiKey.json'));
const apiKey = apiKeyData.apiKey;

// Route handler for root URL
app.get('/', (req, res) => {
    res.send('Server is running.');
});

// Route handler to fetch player summaries from Steam API
app.get('/player/:steamid', async (req, res) => {
    try {
        const steamId = req.params.steamid;
        const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`);
        
        // Extract name and number of games from the response
        const playerData = response.data.response.players[0];
        const playerName = playerData.personaname;
        const gameCount = playerData.game_count;

        // Send the name and game count as a response
        res.send(`Player Name: ${playerName}\nNumber of Games Owned: ${gameCount}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
