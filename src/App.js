import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from '../src/Views/LandingPage/LandingPage'
import EditPage from '../src/Views/EditPage/EditPage'

import './App.css'



function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/notes" exact component={LandingPage}></Route>
        <Route path="/notes/:id" exact component={EditPage}></Route>
      </div>
    </Router>
  )
}

export default App
