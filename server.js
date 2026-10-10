require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'production';
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

const routes = require('./src/routes');

/**
 * Routes
 */
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on http://localhost:${PORT}`);
});
