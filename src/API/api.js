const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const cors = require('cors')

// Create server
const app = express()

app.use(cors({
  credentials: true
}))
app.use(bodyParser.json())

// Create database instance and start server
const adapter = new FileAsync('db.json')
low(adapter)
  .then(db => {

    // GET /notes/
    app.get('/notes', (req, res) => {
      const notes = db.get('notes')
        .value()
      res.send(notes)
    })

    // GET /notes/:id
    app.get('/notes/:id', (req, res) => {
      const note = db.get('notes')
        .find({ id: req.params.id })
        .value()

      res.send(note)
    })


    // Set db default values
    return db.defaults({ notes: [] }).write()
  })
  .then(() => {
    app.listen(3001, () => console.log('listening on port 3001'))
  })