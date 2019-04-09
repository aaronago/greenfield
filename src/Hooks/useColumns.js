import { useReducer } from 'react'

const calculateColumnWidth = (currentWidth, deltaX) => {
  const newWidth = currentWidth + deltaX
  return newWidth > 0 ? newWidth : currentWidth
}

const tableConfigReducer = (state, { type, payload }) => {
  switch (type) {
    case 'columnResize':
      const { col, deltaX } = payload
      return {
        ...state,
        userData: {
          ...state.userData,
          [col]: {
            ...state.userData[col],
            width: calculateColumnWidth(state.userData[col].width, deltaX),
          },
        },
      }
    case 'toggleColumn':
      return {
        ...state,
        userData: {
          ...state.userData,
          [payload]: {
            ...state.userData[payload],
            enabled: !state.userData[payload].enabled,
          },
        },
      }

    default:
      return state
  }
}
const defaultSortState = {
  key: '',
  dir: '',
}

const getSortDir = (prevKey, newKey, dir) => {
  // change direction if click on currently sorted column
  // else sort new column in ascending order
  if (prevKey === newKey) {
    return dir === 'asc' ? 'desc' : 'asc'
  }
  return 'asc'
}
const sortReducer = (state, { key }) => {
  return {
    key,
    dir: getSortDir(state.key, key, state.dir),
  }
}

const useColumns = (initialTableConfigState, initialSortState = defaultSortState) => {
  const [tableConfig, setTableConfig] = useReducer(tableConfigReducer, initialTableConfigState)
  const [sortState, setSortState] = useReducer(sortReducer, initialSortState)
  return { tableConfig, setTableConfig, sortState, setSortState }
}

export default useColumns
