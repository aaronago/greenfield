import React from 'react'
import shortId from 'shortid'
import findKey from 'lodash-es/findKey'

import Modal from './Modal'

const contextState = {
  hideModal: () => null,
  setModal: () => null,
  showModal: () => null,
}

const ModalContext = React.createContext(contextState)

function reducer (state, action) {
  switch (action.type) {
    case 'set':
      // Maintain current modal visibility if it exists.
      return {
        ...state,
        [action.id]: {C: action.C, visible: state[action.id] ? state[action.id].visible : false}
      }
    case 'unset':
      const {[action.id]: removedModal, ...newState} = state
      return newState
    case 'setVisibility':
      return {
        ...state,
        [action.id]: {...state[action.id], visible: action.visible}
      }
    default:
      throw new Error('No type provided to ModalProvider reducer.')
  }
}

export function ModalProvider({ children }) {
  const [components, setComponent] = React.useReducer(reducer, {})

  const hideModal = React.useCallback((id) => setComponent({type: 'setVisibility', id, visible: false}), [])
  const showModal = React.useCallback((id) => setComponent({type: 'setVisibility', id, visible: true}), [])

  const setModal = React.useCallback((id, f) => {
    if (f && typeof f === 'function') {
      setComponent({type: 'set', id, C: f({hideModal})})
    } else {
      setComponent({type: 'unset', id})
    }
  }, [hideModal])

  const contextState = {
    hideModal,
    setModal,
    showModal
  }

  // Return the first modal set to visible. Order not guaranteed.
  const currentModal = findKey(components, ({visible}) => !!visible)

  return (
    <ModalContext.Provider value={contextState}>
      {children}
      {currentModal && <Modal Component={() => components[currentModal].C} hideModal={() => hideModal(currentModal)} />}
    </ModalContext.Provider>
  )
}

function useModal(f) {
  const { hideModal, setModal, showModal } = React.useContext(ModalContext)
  const id = React.useMemo(() => shortId.generate(), [])

  const hideWithId = React.useCallback(() => hideModal(id), [hideModal, id])
  const showWithId = React.useCallback(() => showModal(id), [id, showModal])

  React.useEffect(() => {
    setModal(id, f)
  }, [f, id, setModal])

  React.useEffect(() => {
    return () => setModal(id, null)
  }, [id, setModal])

  return [showWithId, hideWithId]
}

export default useModal
