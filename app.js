const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Define routes here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
