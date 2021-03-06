import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Form, Button } from 'semantic-ui-react'


export default class InputField extends Component {
  static propTypes = {
    /** Text to display for input */
    label: PropTypes.string.isRequired,
    /** Placeholder text for input field */
    placeholder: PropTypes.string.isRequired,
    /** Function called when the button is clicked */
    onAdd: PropTypes.func,
  }  

  constructor(props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleFormSubmit = () => {
    this.props.onAdd(this.state.inputValue)
  }

  render() {
    const { label, placeholder } = this.props
    const { inputValue } = this.state

    return (
      <React.Fragment>
        <Divider />

          <Form style={{ display: 'flex'  }}
                onSubmit={this.handleFormSubmit} >
            <label style={{ marginRight: '10px', fontWeight: 'bold', alignSelf: 'center' }} >{label}</label>
            <input style={{ marginRight: '10px' }} placeholder={placeholder}
                   value={inputValue} onChange={this.handleInputChange} />
            <Button primary type='submit' >Enter</Button>
          </Form>
      </React.Fragment>
    )
  }
}