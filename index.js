const express = require('express');
const cors = require('cors');
const personRoutes = require('./routes/personRoute');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

let persons = [{
    id: '1',
    name: 'Sam',
    age: 26,
    hobbies: []    
}] //This is your in memory database

app.set('db', persons)
//TODO: Implement crud of person
// Use person routes
app.use(personRoutes);

// Handle non-existing routes
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Global error handler for internal server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

if (require.main === module) {
    app.listen(3000)
    console.log("running")
}
module.exports = app;