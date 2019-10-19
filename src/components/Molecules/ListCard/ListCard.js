import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditButton from '../../Atoms/EditButton/EditButton'
import DeleteButton from '../../Atoms/DeleteButton/DeleteButton'

import './ListCard.css'

export default class ListCard extends Component {
  static propTypes = {
    /** Note to display on card */
    note: PropTypes.string.isRequired,
    /** function called after the card is clicked */
    onClick: PropTypes.func,
    /** function called after the edit button is clicked */
    onEdit: PropTypes.func.isRequired,
    /** Function to call when delete button is clicked */
    onDelete: PropTypes.func.isRequired,
  }
  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const { note, onClick, onEdit, onDelete, style } = this.props


    return (
      <li
        style={style}
        className={`listcard`}
        data-testid={`listcard-${note}`}>

        <div
          onClick={onClick}
          className={`listcard-title `}
          data-testid={`listcard-click-wrapper`}>
          <span
            style={{ marginLeft: 10 }}
            data-testid={`listcard-note`}>
            {note}
          </span>
        </div>

        <EditButton
          onClick={onEdit}
          style={{ marginRight: 10 }}
          data-testid={`listcard-button-edit`}
        />
        <DeleteButton
            onClick={onDelete}
            data-testid={`listcard-${note.id}-delete-button`}
        />
      </li>
    )
  }
}
