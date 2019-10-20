import React, { Component } from 'react'
import { Segment, Divider, Button } from 'semantic-ui-react'

import ListCard from '../../components/Molecules/ListCard/ListCard'
import InputField from '../../components/Molecules/InputField/InputField'

import './LandingPage.css'

const getNotes = () => fetch('http://localhost:3001/notes')


export default class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      notes: [],
      notesExist: false,
      showInput: false,
    })
  }


  componentDidMount() {
    getNotes()
      .then(res => res.json() ) 
      .then(notes => this.setState({ notes }) )
      .catch(error => console.log('returned error => ', error))
  }

  componentDidUpdate(prevP, prevS) {
    if (this.state.notes.length > 0 && this.state.notesExist === false) {
      this.setState({ notesExist: true })
    }

    if (this.state.notes.length === 0 && this.state.notesExist === true) {
      this.setState({ notesExist: false })
    }

  }

  handleAdd = () => {
    this.setState({ showInput: true })
  }

  cancelAdd = () => {
    this.setState({ showInput: false })
  }


  onAddNote = note => {

    fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({id: this.state.notes.length + 1, content: note})
    })
    .then(res => res.text())
    .then(() => { this.setState({ showInput: false }) })
    .then(() => {
      getNotes()
      .then(res => res.json() ) 
      .then(notes => this.setState({ notes }) )
      .catch(error => console.log('returned error => ', error))
    })
  }


  handleEdit = (note) => {
    this.setState({ showInput: true })

    this.props.history.push(`/notes/${note.id}`)
  }


  handleDelete = (note) => {
    
    fetch('http://localhost:3001/notes/:id', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({note})
    })
    .then(() => {
      getNotes()
      .then(res => res.json() ) 
      .then(notes => this.setState({ notes }) )
      .catch(error => console.log('returned error => ', error))
    })
  }


  renderWhenEmpty = () => {
    return (
      <ListCard
        id='empty'
        key="no-notes"
        note="You do not have any notes yet.  Click on the Add button above to enter a note."
        onClick={() => {} }
      />
    )
  }

  

  render() {
    const { notes, notesExist, showInput } = this.state

    const renderItems = notes.map(note => {
      return (
        <ListCard
          id={note.id.toString() }
          key={note.id}
          note={note.content}
          onClick={() => { this.handleEdit(note) }}
          onEdit={() => { this.handleEdit(note) }}
          onDelete={() => { this.handleDelete(note) }}
        />
      )
    })

    const buttonText = () => {
      return (
        showInput ? <Button color='red' onClick={this.cancelAdd} > Cancel</Button>
                  : <Button primary onClick={this.handleAdd} > Add Note</Button>
        )
    } 

    

    return (
      <Segment className='MainForm' >
        <div className="notes-container" >
            <h3>Welcome to the Notes App</h3>
            {buttonText()}

            {showInput &&
              <InputField label='Note: ' placeholder='Type note here...'
                          onAdd={this.onAddNote} />
              }
            <Divider />

            <div>
            {!notesExist &&
               <ul className="schedulelist-wrapper">{this.renderWhenEmpty()}</ul>
            }
            {notes &&
              <ul className="schedulelist-wrapper">{renderItems}</ul>
            } 
            </div>

        </div>
      </Segment>
      
    )
  }
}