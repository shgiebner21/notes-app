import React, { Component } from 'react'


const getNotes = () => fetch('http://localhost:3000/notes')


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


  render() {
    console.log('state => ', this.state)

    return (
      <div>My Notes app</div>
    )
  }
}