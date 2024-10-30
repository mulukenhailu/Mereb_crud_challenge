const { v4: uuidv4 } = require('uuid'); // For generating unique UUIDs
const Joi = require('joi'); // For data validation


// Validation schema
const personSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    hobbies: Joi.array().items(Joi.string()).required()
});


// Get all persons or a specific person by ID
const getPersons = (req, res) => {
    const persons = req.app.get('db');

    const { personId } = req.params;

    if (personId) {
        const person = persons.find(p => p.id === personId);
        if (!person) return res.status(404).json({ message: 'Person not found' });
        return res.status(200).json(person);
    }

    res.status(200).json(persons);
};

// Create a new person
const createPerson = (req, res) => {

    const persons = req.app.get('db');

    // Validate required fields
    const { error } = personSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    const { name, age, hobbies } = req.body;

    const newPerson = { id: uuidv4(), name, age, hobbies };
    persons.push(newPerson);
    res.status(200).json(newPerson);
};

// Update an existing person by ID
const updatePerson = (req, res) => {

    const persons = req.app.get('db');

    const { personId } = req.params;
    
    const personIndex = persons.findIndex(p => p.id === personId);
    if (personIndex === -1) return res.status(404).json({ message: 'Person not found' });

    // Validate required fields
    const { error } = personSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    const { name, age, hobbies } = req.body;


    persons[personIndex] = { id: personId, name, age, hobbies };
    res.status(200).json(persons[personIndex]);
};

// Delete a person by ID
const deletePerson = (req, res) => {
    const persons = req.app.get('db');

    const { personId } = req.params;

    const personIndex = persons.findIndex(p => p.id === personId);
    if (personIndex === -1) return res.status(404).json({ message: 'Person not found' });

    const deletedPerson = persons.splice(personIndex, 1);
    res.status(200).json({ message: 'Person deleted', person: deletedPerson });
};

module.exports = {
    getPersons,
    createPerson,
    updatePerson,
    deletePerson
};
