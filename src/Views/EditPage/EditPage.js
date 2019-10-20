import React, { Component } from 'react'
import { Segment, Divider } from 'semantic-ui-react'

import ListCard from '../../components/Molecules/ListCard/ListCard'
import EditField from '../../components/Molecules/EditField/EditField'

import './EditPage.css'

const getNote = (id) => fetch(`http://localhost:3001/notes`)

export default class EditPage extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      noteId: 0,
      note: undefined
    })
  }

  componentDidMount() {
    getNote(this.props.match.params.id)
      .then(res => res.json() ) 
      .then(note => this.setState({ noteId : this.props.match.params.id, note: note }) )
      .catch(error => console.log('returned error => ', error))
  }

  onUpdateNote = (id, note) => {

    console.log('updatedNote id => ', id)
    console.log('updatedNote => ', note)

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


  render() {
    const { noteId, note } = this.state

    console.log('EditNote state  => ', this.state)

    return (
      <Segment className='MainForm' >
      <div className="notes-container" >
          <h3>Edit Note</h3>

            <EditField id={note ? note[noteId - 1].id : undefined}
                       label='Note: ' 
                       content={note ? note[noteId - 1].content : undefined}
                       placeholder='Type note here...'
                       onAdd={this.onUpdateNote} />

          <Divider />

          <div>
             <ul className="schedulelist-wrapper">
               <ListCard
                 key={note ? note[0].id : undefined}
                 note={note ? note[0].content : undefined}
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