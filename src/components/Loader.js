import React from 'react'
import styled, { keyframes } from 'styled-components';
import { LinkedInBigIcon } from '../svgs';

const Loader = () => {
  return (
    <Container>
      <Logo>
        <LinkedInBigIcon />
      </Logo>
      <Bar></Bar>
    </Container>
  )
}

export default Loader;

const Container = styled.section`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Logo = styled.div`
  svg {
    width: 220px;
    padding: 15px 0;
  }
`;

const guageMove = keyframes`
  0% {
    transform: translateX(190%);
  }
  
  100% {
    transform: translateX(0);
  }
`;

const Bar = styled.div`
  width: 70%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1px;
  margin: 0 auto;

  &::after {
    content: "";
    position: absolute;
    top: 20%;
    width: 35%;
    left: 0;
    background: var(--link);
    height: 2px;
    animation : ${guageMove} 0.7s ease-in-out infinite alternate;
  }
`;

