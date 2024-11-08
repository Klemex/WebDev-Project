const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the Front-end directory
app.use(express.static(path.join(__dirname, '../Front-end')));

// Basic route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-end/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
