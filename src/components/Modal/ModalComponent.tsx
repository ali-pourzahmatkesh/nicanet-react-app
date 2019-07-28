import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import CloseIconSvg from 'Assets/Close.svg';

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: #000000;
  position: relative;
  min-height: 2rem;
  z-index: 10;
`;

const ChildrenWrapper = styled.div`
  padding: 1rem;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 0;
  top: -1px;
  width: 1.5rem;
  z-index: 9;
  cursor: pointer;
`;

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
  style?: any;
  ChildrenWrapperStyle?: any;
};

const Modal: React.FC<ModalProps> = props => {
  const {
    onClose,
    title,
    isOpen,
    children,
    style,
    ChildrenWrapperStyle
  } = props;
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: style || {},
        overlay: {
          backgroundColor: 'rgba(0,0, 0, 0.4)'
        }
      }}
    >
      <Title>
        {title}
        {onClose && <CloseIcon onClick={onClose} src={CloseIconSvg} />}
      </Title>
      <ChildrenWrapper style={ChildrenWrapperStyle}>{children}</ChildrenWrapper>
    </ReactModal>
  );
};

export default Modal;
