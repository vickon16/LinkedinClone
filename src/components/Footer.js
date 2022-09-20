import React from 'react'
import styled from 'styled-components';
import {AiOutlineLinkedin} from "react-icons/ai";
import { Flex } from '../globalFunctions';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
      <Copyright>
        <AiOutlineLinkedin />
        <span>© 2022</span>
      </Copyright>
      <Links>
        <li>
          <Link to="/">User Agreement</Link>
        </li>
        <li>
          <Link to="/">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/">Community Guidelines</Link>
        </li>
        <li>
          <Link to="/">Cookie Policy</Link>
        </li>
        <li>
          <Link to="/">Copyright Policy</Link>
        </li>
        <li>
          <Link to="/">Send Feedback</Link>
        </li>
        <li>
          <Link to="/">language </Link>
        </li>
      </Links>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  width: max-content;
  max-width: 100%;
  padding: 1em;
  ${Flex("center")};
  gap: 1em 1.5em;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);

  @media screen and (max-width : 768px) {
    flex-wrap: wrap;
    gap: 1em;
  };
`;

const Copyright = styled.div`
  width: max-content;
  white-space: nowrap;
`;

const Links = styled.ul`
  list-style: none;
  ${Flex("center")};
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  width: 100%;

  li a {
    color: var(--gray);
    font-size: 0.75rem;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }

  }
`;
