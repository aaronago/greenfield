import React from 'react'

import Modal from './Modal'

const contextState = {
  showModal: () => null,
  hideModal: () => null,
}

const ModalContext = React.createContext(contextState)

export function ModalProvider({ children }) {
  const [Component, setComponent] = React.useState(null)

  const hideModal = React.useCallback(() => setComponent(null), [])

  const showModal = f => {
    setComponent(f({ hideModal }))
  }

  const contextState = {
    showModal,
    hideModal,
  }

  return (
    <ModalContext.Provider value={contextState}>
      {children}
      {Component && <Modal Component={() => Component} hideModal={hideModal} />}
    </ModalContext.Provider>
  )
}

function useModal() {
  const { showModal, hideModal } = React.useContext(ModalContext)
  return [showModal, hideModal]
}

export default useModal
