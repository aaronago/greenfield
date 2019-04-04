import React from 'react'
import { createPortal } from 'react-dom'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import { Close as StyledIconClose } from 'styled-icons/material/Close'
import { TextButton } from 'Atoms'
import { themeValue } from 'theme'

const CloseIcon = styled(StyledIconClose)`
  height: ${themeValue('baseIconHeight')}rem;
  color: ${themeValue('colors.gray.400')};
`

function ComposedClose(props) {
  return (
    <TextButton {...props}>
      <CloseIcon />
    </TextButton>
  )
}

const Close = styled(ComposedClose)`
  position: absolute;
  top: ${themeValue('space.small')};
  right: ${themeValue('space.base')};

  line-height: 1;
`

const customStyles = {
  content: {
    zIndex: '999',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '95vh',
  },
  overlay: {
    zIndex: '99',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
}

ReactModal.setAppElement('#overlay-root')

function parentSelector() {
  return document.querySelector('#overlay-root')
}

function Modal({ Component, hideModal }) {
  return createPortal(
    <ReactModal isOpen={true} onRequestClose={hideModal} style={customStyles} parentSelector={parentSelector}>
      <Close onClick={hideModal} />
      <Component />
    </ReactModal>,
    parentSelector(),
  )
}

export default Modal
