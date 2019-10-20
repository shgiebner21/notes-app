import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Form, Button } from 'semantic-ui-react'


export default class EditField extends Component {
  static propTypes = {
    /** Id of the note */
    id: PropTypes.number,
    /** Text to display for input */
    label: PropTypes.string,
    /** Input value passed down to edit */
    content: PropTypes.string,
    /** Placeholder text for input field */
    placeholder: PropTypes.string.isRequired,
    /** Function called when the button is clicked */
    onAdd: PropTypes.func,
  }  
  static defaultProps = {
    id: 0,
    label: '',
    content: ''
  }

  constructor(props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  componentDidUpdate(prevP) {
    if (prevP && this.state.inputValue === '' ) {
      this.setState({ inputValue: this.props.content })
    }

  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleFormSubmit = () => {
    this.props.onAdd(this.props.id, this.state.inputValue)
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