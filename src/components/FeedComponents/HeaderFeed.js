/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { errorResponse, Flex } from "../../globalFunctions";
import {
  Jobs,
  Home,
  Network,
  Messaging,
  Notifications,
  Work,
  DownIcon,
  Search,
  DotDot,
} from "../../svgs";
import {FaTimes} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setSignedOutUser } from "../../features/user/userSlice";

const HeaderFeed = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userCredentials} = useSelector(store => store.user);

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setSignedOutUser());
        navigate("/home");
      })
      .catch((err) => errorResponse(err, dispatch, "user"));
  }

  return (
    <Container>
      <HeaderWrapper>
        <LogoSearch>
          <Link to="/">
            <img src="/images/linkedin.png" alt="login" />
          </Link>
          <div>
            <input type="text" placeholder="search" />
            <Search />
          </div>
        </LogoSearch>

        <Nav>
          <Links isNavOpen={isNavOpen}>
            <FaTimes className="times" onClick={() => setIsNavOpen(false)} />
            <NavLink to="/feed">
              <Home />
              <span>Home</span>
            </NavLink>
            <NavLink to="/home">
              <Network />
              <span>My Network</span>
            </NavLink>
            <NavLink to="/home">
              <Jobs />
              <span>Jobs</span>
            </NavLink>
            <NavLink to="/home">
              <Messaging />
              <span>Messaging</span>
            </NavLink>
            <NavLink to="/home">
              <Notifications />
              <span>Notifications</span>
            </NavLink>
            <a href="#" className="profile-img">
              <img src={userCredentials?.photoURL || "/images/john-doe.png"} alt="me" />
              <div>
                <span>me</span>
                <DownIcon />
              </div>
              <DropDownLogin>
                <button onClick={signUserOut}>Logout</button>
              </DropDownLogin>
            </a>
            <WorkWrapper>
              <NavLink to="/home" activeclassname="active">
                <Work />
                <div>
                  <span>Work</span>
                  <DownIcon />
                </div>
              </NavLink>
              <span>Get Hired Faster, Try Premium Free</span>
            </WorkWrapper>
          </Links>
          <a href="#" className="dot-dot" onClick={() => setIsNavOpen(true)}>
            <DotDot />
          </a>
        </Nav>
      </HeaderWrapper>
    </Container>
  );
};

export default HeaderFeed;

const Container = styled.header`
  width: 100%;
  margin-bottom: 1.5rem;
  background-color: #fff;

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  } ;
`;

const HeaderWrapper = styled.div`
  width: min(100%, 1180px);
  margin: auto;
  padding: 5px 20px;
  ${Flex("space-between")};
  flex-wrap: nowrap;
  gap: 2rem;

  @media screen and (max-width: 1024px) {
    gap: .8rem;
  } ;
`;

const LogoSearch = styled.div`
  ${Flex()};
  gap: 0.5rem;
  width: 100%;
  flex: 1;

  > a {
    width: 35px;
  }

  > div {
    ${Flex()};
    width: 100%;
    position: relative;

    input {
      width: min(100%, 300px);
      line-height: 1.75;
      font-weight: 400;
      font-size: 0.9rem;
      height: 36px;
      border-color: 1px solid var(--gray);
      background-color: #eef3f8;
      border-radius: 4px;
      padding: 0 0.8rem 0 40px;
      transition: all 0.3s ease-in;

      &:focus {
        width: 100%;
        border: 2px solid black;
      }
    }

    svg {
      position: absolute;
      z-index: 1;
      top: 20%;
      left: 0.5rem;
      width: 20px;
      height: 20px;
      opacity: 0.6;
      pointer-events: none;
    }
  }

  @media screen and (max-width: 768px) {
    > div input {
      width: 100%;
    }
  }

  @media screen and (max-width: 460px) {
    > a {
      width: 25px;
    }
  }
`;

const Nav = styled.nav`
  ${Flex()};
  gap: 1.5rem;

  .dot-dot {
    display: none;
  }

  @media screen and (max-width: 768px) {
    a.dot-dot {
      display: flex;
    }
  }
`;

const DropDownLogin = styled.article`
  padding: 10px 20px;
  background: #fff;
  position: absolute;
  top: 90%;
  z-index: 2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: none;

  button {
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    font-size: 1rem;
  }

  @media screen and (max-width : 768px) {
    position: static;
    top: 0;
    display: block;
    background-color: transparent;
    box-shadow: none;
  };
`;

const Links = styled.div`
  ${Flex()};
  transition: 0.3s ease-in-out;

  .times {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    font-size: 1.1rem;
    display: none;
  }

  a {
    ${Flex("", "column")};
    color: var(--gray);
    fill: var(--gray);
    padding: 3px 12px;

    img {
      width: 25px;
      border-radius: 50%;
    }

    &.profile-img {
      position: relative;

      &:hover ${DropDownLogin} {
        display: block;
      }
    }

    > div {
      ${Flex()};
    }

    span {
      font-size: 0.8rem;
      white-space: nowrap;
    }

    &.active {
      color: black;
      fill: black;
      border-bottom: 2px solid black;
    }

    &:hover,
    &:hover svg {
      color: black;
      fill: black;
    }
  }

  @media screen and (max-width: 1024px) {
    gap: 1rem;
  }

  @media screen and (max-width: 853px) {
    a span,
    a > div {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    ${Flex("", "column", "center")};
    position: fixed;
    top: 0;
    right: ${({ isNavOpen }) => (isNavOpen ? "0%" : "-100%")};
    z-index: 2;
    padding: 70px 0 20px;
    background-color: #fff;
    width: min(100%, 120px);
    height: 100vh;
    text-align: center;
    overflow: auto;

    .times {
      display: block;
    }

    a {
      vertical-align: middle;

      & span,
      & > div {
        display: flex;
      }
    }
  }
`;



const WorkWrapper = styled.div`
  ${Flex()};
  gap: 1rem;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 0 0 0 20px;

  > span {
    max-width: 100px;
    font-size: 0.8rem;
    text-decoration: underline;
  }

  @media screen and (max-width: 760px) {
    ${Flex("", "column", "center")};
    padding: 0;

    > span {
      padding: 0 10px;
    }
  }
`;
