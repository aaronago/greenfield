import { useReducer } from 'react'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'columnResize':
      return state
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

const useColumns = initialState => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}

export default useColumns
