const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const repl = require('repl')
const date = require('date-and-time')

app.use(bodyParser.json())

const baseUrl = 'http://localhost:3001/api/persons'

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Martti Tienari",
        number: "040-123456"
    },
    {
        id: 3,
        name: "Arto Järvinen",
        number: "040-123456"
    },
    {
        id: 4,
        name: "Lea Kutvonen",
        number: "040-123456"
    },
    {
        id: 5,
        name: "letti",
        number: "040-123456"
    }
]

personCount = () => {
    const max = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
    console.log(max, typeof max, typeof arr)
    return max
}

// infoa = (arr) => {
//     console.log('cat', personCount(arr), typeof arr, typeof personCount(arr))
// } 

let now = new Date();

app.get('/info', (req, res) => {
    const txt = `<ul>Puhelinluettelossa on ${personCount()} henkilön tiedot <BR/> ${now}</ul>`
    res.send(txt)
})

app.get('/', (req, res) => {
    res.send('<hi>ASD</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const maxId = Math.floor(Math.random() * Math.floor(max))
    console.log(maxId)
    return maxId
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    const person = persons.find(person => person.name === body.name)
    console.log('person', person, typeof person)
    
    if (body.name === undefined) {
        return res.status(400).json({ error: 'Name is missing!' })
    }
    if (body.number === undefined) {
        return res.status(400).json({ error: 'Number is missing!' })
    }
    if (person.number === body.number) {
        return res.status(400).json({ error: 'Name must be unique!'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})