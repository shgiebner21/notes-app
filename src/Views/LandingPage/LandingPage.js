import React, { Component } from 'react'
import { Segment, Divider } from 'semantic-ui-react'

import ListCard from '../../components/Molecules/ListCard/ListCard'

import './LandingPage.css'

const getNotes = () => fetch('http://localhost:3001/notes')


export default class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      notes: [],
      notesExist: false,
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
  }


  handleClick = () => {
    console.log('Note clicked')
  }

  handleEdit = (note) => {
    console.log('Edit Note clicked')

    fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({note})
    })
    .then(res => res.text())
    .then(res => console.log('create note res => ', res))
  }

  handleDelete = (id) => {
    console.log('Delete Note clicked with id => ', id)
    
    fetch('http://localhost:3001/notes/' + id, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({id})
    })
    .then(res => res.text())
    .then(res => console.log('delete resp => ', res))

  }

  // fetch("/api/users/delete/" + userId, requestOptions).then((response) => {
  //   return response.json();
  // }).then((result) => {
  //   // do what you want with the response here
  // })

  renderWhenEmpty = () => {
    console.log('renderWhenEmpty')
            return (
                <ListCard
                  key="no-notes"
                  note="You do not have any notes yet.  Click on the Add button above to enter a note."
                  onClick={() => {
                    this.handleClick()
                  }}
                />
              )
  }

  render() {
    console.log('state => ', this.state)



    const renderItems = this.state.notes.map(note => {
      return (
        <ListCard
          key={note.id}
          note={note.content}
          onClick={() => {
            this.handleClick(note.id)
          }}
          onEdit={() => {
            this.handleEdit({id: 4, content: "My first FE note"})
          }}
          onDelete={() => {
            this.handleDelete(note.id)
          }}
        />
      )
    })
    

    return (
      <Segment className='MainForm' >
        <div className="notes-container" >
            <h3>Welcome to the Notes App</h3>
            <Divider />

            <div>
            {!this.state.notesExist &&
               <ul className="schedulelist-wrapper">{this.renderWhenEmpty()}</ul>
              }
              {this.state.notes &&
               <ul className="schedulelist-wrapper">{renderItems}</ul>
              }
             
            </div>

        </div>
      </Segment>
      
    )
  }
}