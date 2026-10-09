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

app.get('/', (req, res) => {
    const title = 'Welcome Home';
    res.render('home', { title });
});

app.get('/about', (req, res) => {
    const title = 'About Me';
    res.render('about', { title });
});

app.get('/products', (req, res) => {
    const title = 'Our Products';
    res.render('products', { title });
});

app.get('/student', (req, res) => {
    res.render('student', {
        title: 'Student Information',
        name: 'Jane Doe',
        id: 'A01234567',
        email: 'jane.doe@example.edu',
        address: '123 University Way, Rexburg, ID'
    });
});

app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on http://localhost:${PORT}`);
});