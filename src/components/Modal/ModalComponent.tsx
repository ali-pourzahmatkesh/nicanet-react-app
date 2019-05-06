import React from 'react'
import ReactModal from 'react-modal';
import styled from 'styled-components';

import CloseIconSvg from 'Assets/Close.svg'

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: #000000;
  position: relative;
`

const ChildrenWrapper = styled.div`
  padding: 1rem;
`

const CloseIcon = styled.img`
  position: absolute;
  right: 0;
  top: -1px;
  width: 1.5rem;
`

type ModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = (props) => {
  const { onClose, title, isOpen, children } = props

  return (
    <ReactModal
      ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={onClose}
		>
      <Title>
        {title}
        <CloseIcon onClick={onClose} src={CloseIconSvg} />
      </Title>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
		</ReactModal>
  )
}

export default Modal
