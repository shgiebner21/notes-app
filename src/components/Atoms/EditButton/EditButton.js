import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

export default class EditButton extends Component {
  static propTypes = {
    /** Function called when the button is clicked */
    onClick: PropTypes.func,
  }


  render() {
    const { onClick } = this.props

      return (
        <Button
          circular
          compact
          icon="pencil"
          size="tiny"
          onClick={onClick}
        />
      )
  }
}
