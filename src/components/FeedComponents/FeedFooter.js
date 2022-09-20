import React from "react";
import styled from "styled-components";
import { Flex } from "../../globalFunctions";
import { Link } from "react-router-dom";
import { LinkedInBigIcon } from "../../svgs";

const FeedFooter = () => {
  return (
    <Container>
      <Links>
        <li><Link to="/feed">About</Link></li>
        <li><Link to="/feed">Accessibility</Link></li>
        <li><Link to="/feed">Help Center</Link></li>
        <li><Link to="/feed">Privacy and Terms</Link></li>
        <li><Link to="/feed">Ad choices</Link></li>
        <li><Link to="/feed">Advertising</Link></li>
        <li><Link to="/feed">Business Center </Link></li>
        <li><Link to="/feed">Get the Linkin App</Link></li>
        <li><Link to="/feed">More</Link></li>
      </Links>
      <Copyright>
        <LinkedInBigIcon />
        <span>LinkedIn Corporation © 2022</span>
      </Copyright>
    </Container>
  );
};

export default FeedFooter;

const Container = styled.footer`
  width: min(100%, 220px);
  margin: 0 auto;
  padding: 10px 0;
  ${Flex("", "column")};
  gap: 1em 1.5em;
  text-align: center;
  position: sticky;
  top: 15rem;
`;

const Copyright = styled.div`
  ${Flex()};
  width: 100%;
  gap: .2rem;
  
  svg {
    width: 60px;
  }

  span {
    font-size: .7rem !important;
  }
`;

const Links = styled.ul`
  list-style: none;
  ${Flex("center")};
  flex-wrap: wrap;
  gap: 0.3rem 1rem;
  width: 100%;

  li a {
    color: var(--gray);
    font-size: 0.75rem;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
      color: var(--link);
    }
  }
`;
