import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../globalFunctions";
import { Discover, Jobs, People, Learning } from "../svgs";

const Header = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Link to="/">
          <img src="/images/login-logo.svg" alt="login" />
        </Link>

        <Nav>
          <div className="links">
            <Link to="/home">
              <Discover />
              <span>Discover</span>
            </Link>
            <Link to="/home">
              <People />
              <span>People</span>
            </Link>
            <Link to="/home">
              <Learning />
              <span>Learning</span>
            </Link>
            <Link to="/home">
              <Jobs />
              <span>Jobs</span>
            </Link>
          </div>

          <Buttons>
            <Link to="/signup" className="join">
              Join Now
            </Link>
            <Link to="/signin" className="sign">
              Sign In
            </Link>
          </Buttons>
        </Nav>
      </HeaderWrapper>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  width: 100%;
  margin-bottom: 2.5rem;

  @media screen and (max-width : 768px) {
    margin-bottom: 1rem;
  };
`;

const HeaderWrapper = styled.div`
  width: min(100%, 1200px);
  margin: auto;
  padding: 15px 20px;
  ${Flex("space-between")};
  position: relative;
  flex-wrap: nowrap;

  > a {
    width: 135px;

    @media screen and (max-width: 768px) {
      width: 100px;
    }
  }

   @media screen and (max-width: 350px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
  }
`;

const Nav = styled.nav`
  ${Flex()};
  gap: 1.5rem;

  .links {
    ${Flex()};
    gap: 2rem;

    > a {
      ${Flex("", "column")};
      color: var(--gray);

      &:hover {
        color: black;
      }

      svg {
        font-size: 2.5rem;
      }

      span {
        font-size: 0.9rem;
      }
    }

    @media screen and (max-width : 768px) {
      display: none;
    };
  }
`;

const Buttons = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  ${Flex()};
  gap: 0.5rem;

  .join,
  .sign {
    padding: 10px 20px;
    border-radius: 24px;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }

  .sign {
    border: 1px solid var(--link);
  }

  @media screen and (max-width: 768px) {
    border: none;

    .join, .sign {
      padding: 10px 15px;
    }
  } ;
`;
