import React, { Component } from 'react'
import { Segment, Divider, Button } from 'semantic-ui-react'
import {propEq, filter} from 'ramda'

import ListCard from '../../components/Molecules/ListCard/ListCard'
import EditField from '../../components/Molecules/EditField/EditField'

import './EditPage.css'

const getNote = (id) => fetch(`http://localhost:3001/notes`)

export default class EditPage extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      notes: undefined
    })
  }

  componentDidMount() {
    getNote(this.props.match.params.id)
      .then(res => res.json() ) 
      .then(note => this.setState({ notes: note }) )
      .catch(error => console.log('returned error => ', error))
  }

  onUpdateNote = (id, note) => {

    fetch('http://localhost:3001/notes/:id', {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({id: id, content: note})
    })
    .then(res => res.text())
    .then(() => { this.setState({ showInput: false }) })
    .then(() => {
      this.props.history.push(`/notes`)
    })
  }

  onCancelEdit = () => {
    this.props.history.push(`/notes`)
  }

  render() {
    const { notes } = this.state

    // Because Get notes/:id refuses to work on BE, I am bringing in all notes
    // and then have to filter down to the one I want to edit.
    const note = notes ? filter(propEq('id', Number(this.props.match.params.id) ), notes) : undefined

    return (
      <Segment className='MainForm' >
      <div className="notes-container" >
          <h3>Edit Note</h3>
          <Button primary onClick={this.onCancelEdit} > Cancel Edit
            </Button>

            <EditField id={notes ? note[0].id : 0}
                       label='Note: ' 
                       content={notes ? note[0].content : 'loading'}
                       placeholder='Type note here...'
                       onAdd={this.onUpdateNote} />

          <Divider />

          <div>
             <ul className="schedulelist-wrapper">
               <ListCard
                 key={notes ? note[0].id : 0}
                 note={notes ? note[0].content : ''}
                 onClick={() => {
                   this.handleClick()
                 }}
               />
             </ul>
          </div>

      </div>
    </Segment>
    )
  }
}