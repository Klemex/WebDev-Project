const express = require('express');
const path = require('path');
const app = express();

// Set the Front-end folder as the static folder
app.use(express.static(path.join(__dirname, '../Front-end')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-end/index.html'));
});

// Set the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
