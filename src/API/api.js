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
      console.log('\x1b[31m', 'all notes sent to FE', '\x1b[0m')
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

    // PUT Create Note /notes/:id
    app.post('/notes', (req, res) => {
      console.log('\x1b[32m', 'note to create => ', req.body, '\x1b[0m')
      const note = db.get('notes')
        .push({ id: req.body.id, content: req.body.content })
        .write()

      res.send(note)
    })

    // DELETE Delete Note /notes/:id
    app.delete('/notes/:id', (req, res) => {
      console.log('\x1b[32m', 'id to delete => ', req.params.id, '\x1b[0m')
      const note = db.get('notes')
        .remove({ id: req.params.id })
        .write()

      res.send(note)
    })

    // app.delete('/', function (req, res) {
    //   res.send('DELETE request to homepage')
    // })

    // Set db default values
    return db.defaults({ notes: [] }).write()
  })
  .then(() => {
    app.listen(3001, () => console.log('listening on port 3001'))
  })