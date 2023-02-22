const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());
const studentArray = require('./InitialData');


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

//get data
app.get('/api/student', (req, res) => {
    res.json(studentArray);
});


//get a single data 
app.get('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = studentArray.find((s) => s.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

//save data
app.post('/api/student', (req, res) => {
    const { name, currentClass, division } = req.body;
    if (!name || !currentClass || !division) {
        res.status(400).send('Incomplete details provided');
        return;
    }
    const newStudent = {
        id: studentArray.length + 1,
        name,
        currentClass: parseInt(currentClass),
        division
    };
    studentArray.push(newStudent);
    res.json(newStudent);
});

//update data
app.put('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const student = studentArray.find((s) => s.id === id);
    if (!student) {
        return res.status(400).send('Student not found');
    }
    if (!name) {
        return res.status(400).send('Name is required');
    }
    student.name = name;
    res.send(`Student with id ${id} has been updated`);
});


//delete data
app.delete('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = studentArray.findIndex((s) => s.id === id);
    if (index === -1) {
        return res.status(404).send('Student not found');
    }
    studentArray.splice(index, 1);
    res.send(`Student with id ${id} has been deleted`);
});



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   