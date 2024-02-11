// Import necessary modules
const express = require('express');
const axios = require('axios');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Define routes
app.get('/player/:steamid', async (req, res) => {
    try {
        const steamId = req.params.steamid;
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
