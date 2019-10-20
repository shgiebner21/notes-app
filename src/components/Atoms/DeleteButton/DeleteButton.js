import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

export default class DeleteButton extends Component {
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
          icon="trash alternate"
          size="tiny"
          onClick={onClick}
          data-testid="delete-button"
        />
      )
  }
}
