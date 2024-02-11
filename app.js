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
        const playerData = response.data.response.players[0]; // Get player data from response
        const playerName = playerData.personaname; // Player's account name
        const numGamesOwned = playerData.game_count; // Number of games owned

        // Render HTML page with player's account name and number of games owned
        res.send(`
            <h1>Player Information</h1>
            <p>Account Name: ${playerName}</p>
            <p>Number of Games Owned: ${numGamesOwned}</p>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
