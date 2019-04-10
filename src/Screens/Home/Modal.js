
import React from 'react'

function Modal (props) {
  const {columnMap, columns, masterColumnArray, setColumnPreferences} = props

  return (
    <React.Fragment>
      <h2>Manage Columns</h2>
      {masterColumnArray.map(key => {
        return (
          <p key={`${key}-checkbox`}>
            <input
              type='checkbox'
              onChange={e => setColumnPreferences({showHide: {key, value: e.target.checked}})}
              checked={columns.includes(key)}
            />
            {columnMap[key].label}
          </p>
        )
      })}
    </React.Fragment>
  )
}

export default Modal
