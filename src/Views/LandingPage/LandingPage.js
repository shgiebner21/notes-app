import React, { Component } from 'react'
import { Segment, Divider } from 'semantic-ui-react'

import ListCard from '../../components/Molecules/ListCard/ListCard'

import './LandingPage.css'

const getNotes = () => fetch('http://localhost:3001/notes')


export default class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      notes: []
    })
  }


  componentDidMount() {
    getNotes()
      .then(res => res.json() ) 
      .then(notes => this.setState({ notes }) )
      .catch(error => console.log('returned error => ', error))
  }

  handleClick = () => {
    console.log('Note clicked')
  }

  handleEdit = () => {
    console.log('Edit Note clicked')
  }

  handleDelete = () => {
    console.log('Delete Note clicked')
  }




  render() {
    console.log('state => ', this.state.notes)

    const renderItems = this.state.notes.map(note => {

      return (
        <ListCard
          key={note.id}
          note={note.content}
          onClick={() => {
            this.handleClick(note.id)
          }}
          onEdit={() => {
            this.handleEdit(note.id)
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
              <ul className="schedulelist-wrapper">{renderItems}</ul>
            </div>

        </div>
      </Segment>
      
    )
  }
}