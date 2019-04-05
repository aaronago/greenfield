import React from 'react'

import Modal from './Modal'

const contextState = {
  showModal: () => null,
  hideModal: () => null,
  setModalState: () => null,
  modalState: null,
}

export const ModalContext = React.createContext(contextState)

export function ModalProvider({ children }) {
  const [Component, setComponent] = React.useState(null)
  const [modalState, setModalState] = React.useState(null)

  const hideModal = React.useCallback(() => setComponent(null), [])

  const showModal = React.useCallback(
    f => {
      setComponent(f({ hideModal }))
    },
    [hideModal],
  )

  const contextState = {
    showModal,
    hideModal,
    setModalState,
    modalState,
  }

  return (
    <ModalContext.Provider value={contextState}>
      {children}
      {Component && <Modal Component={() => Component} hideModal={hideModal} />}
    </ModalContext.Provider>
  )
}

function useModal() {
  const { showModal, hideModal, modalState, setModalState } = React.useContext(ModalContext)
  return { showModal, hideModal, modalState, setModalState }
}

export default useModal
