import React, { useState } from "react";
import styled, { css } from "styled-components";

import DrawerIconSvg from "Assets/DrawerIcon.svg";

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #000000;
  padding: 1rem 0;
  border-bottom: 1px solid #bdbdbd;
  background-color: #eee;
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  @media (min-width: 720px) {
    border-bottom-color: #424242;
    background-color: #fff;
  }
`;

const ActiveDrawerIconStyle = css`
  transform: rotate(90deg);
`;

const DrawerIcon = styled.img<{ active: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.8rem;
  ${props => props.active && ActiveDrawerIconStyle}
`;

const ChildrenWrapper = styled.div<{ active: boolean }>`
  display: ${props => (props.active ? "block" : "none")};
`;

type DrawerProps = {
  title: string;
};

const Drawer: React.FC<DrawerProps> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { title, children } = props;

  return (
    <div>
      <Title onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
        <DrawerIcon active={isOpen} src={DrawerIconSvg} />
        {title}
      </Title>
      <ChildrenWrapper active={isOpen}>{children}</ChildrenWrapper>
    </div>
  );
};

export default Drawer;
