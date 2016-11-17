/**
 * @module TableRow
 */

// Dependencies
import React, { PropTypes } from 'react'

const TableRow = ({ items, thead = false, ...props }) => (
  <tr {...props}>
    {items.map((item, index) => {
      let content = item
      let props = {}
      if (typeof item === 'object') {
        content = item.content
        props = item.props
      }
      return thead === 'th'
        ? <th key={index} {...props}>{content}</th>
        : <td key={index} {...props}>{content}</td>
    })}
  </tr>
)

TableRow.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  thead: PropTypes.string
}

/**
 * TableRow component
 */
export default TableRow