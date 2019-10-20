import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditButton from '../../Atoms/EditButton/EditButton'
import DeleteButton from '../../Atoms/DeleteButton/DeleteButton'

import './ListCard.css'

export default class ListCard extends Component {
  static propTypes = {
    /** Id of the note to display on card */
    id: PropTypes.string,
    /** Note to display on card */
    note: PropTypes.string,
    /** function called after the card is clicked */
    onClick: PropTypes.func,
    /** function called after the edit button is clicked */
    onEdit: PropTypes.func,
    /** Function to call when delete button is clicked */
    onDelete: PropTypes.func,
  }
  static defaultProps = {
    id: '',
    note: '',
    onClick: () => {},
  }

  render() {
    const { id, note, onClick, onEdit, onDelete, style } = this.props

    return (
      <li
        id={id}
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

        {this.props.onEdit && 
            <EditButton
            onClick={onEdit}
            style={{ marginRight: 10 }}
            data-testid={`listcard-button-edit`}
          />
        }

        {this.props.onDelete && 
            <DeleteButton
            onClick={onDelete}
            data-testid={`listcard-delete-button`}
        />
        }

      </li>
    )
  }
}
