/**
 * @module TableRow
 */

import React, { PropTypes } from 'react'
import shortid from 'shortid'

const TableRow = ({ items, thead, ...props }) => (
  <tr {...props}>
    {items.map((item) => {
      let content = item
      let itemProps = {}
      if (typeof item === 'object') {
        content = item.content
        itemProps = item.props
      }
      return thead === 'th'
        ? <th key={shortid.generate()}
          {...itemProps}>{content}</th>
        : <td key={shortid.generate()}
          {...itemProps}>{content}</td>
    })}
  </tr>
)

TableRow.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  thead: PropTypes.string
}

TableRow.defaultProps = {
  className: '',
  thead: ''
}

/**
 * TableRow component
 */
export default TableRow
