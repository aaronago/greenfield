import React from 'react'

import Modal from './Modal'

const contextState = {
  hideModal: () => null,
  setModal: () => null,
  showModal: () => null,
}

const ModalContext = React.createContext(contextState)

export function ModalProvider({ children }) {
  const [Component, setComponent] = React.useState(null)
  const [visible, setVisible] = React.useState(false)

  const hideModal = React.useCallback(() => setVisible(false), [])
  const showModal = React.useCallback(() => setVisible(true), [])

  const setModal = React.useCallback((f) => {
    if (f && typeof f === 'function') {
      setComponent(f({ hideModal }))
    } else {
      setComponent(null)
    }
  }, [hideModal])

  const contextState = {
    hideModal,
    setModal,
    showModal
  }

  return (
    <ModalContext.Provider value={contextState}>
      {children}
      {visible && Component && <Modal Component={() => Component} hideModal={hideModal} />}
    </ModalContext.Provider>
  )
}

function useModal(f) {
  const { hideModal, setModal, showModal } = React.useContext(ModalContext)

  React.useEffect(() => {
    setModal(f)
    return () => setModal(null)
  }, [f, setModal])

  return [showModal, hideModal]
}

export default useModal
