const express = require('express');
const {
    getPersons,
    createPerson,
    updatePerson,
    deletePerson
} = require('../controllers/personController');

const router = express.Router();

// GET /person or /person/:personId - Get all persons or a specific person
router.get('/person/:personId?', getPersons);

// POST /person - Create a new person
router.post('/person', createPerson);

// PUT /person/:personId - Update an existing person
router.put('/person/:personId', updatePerson);

// DELETE /person/:personId - Delete a person by ID
router.delete('/person/:personId', deletePerson);

module.exports = router;
