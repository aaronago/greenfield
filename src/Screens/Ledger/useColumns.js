import { useReducer } from 'react'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'columnResize':
      const { col, deltaX } = payload
      return {
        ...state,
        userData: {
          ...state.userData,
          [col]: {
            ...state.userData[col],
            width: state.userData[col].width + deltaX,
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

const useColumns = initialState => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return [state, dispatch]
}

export default useColumns
