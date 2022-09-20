import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {errorResponse, Flex, formatEmail, successResponseGoogle} from "../globalFunctions";
import {BiUser} from "react-icons/bi";
import Footer from "../components/Footer"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import { Error } from './Signup';

const tempUserData = {
      email : "Username2022@gmail.com",
      displayName : "User Name",
      photoURL : "/images/john-doe.png"
    }

const Signin = () => {
  const { userError } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tempUser] = useState(() => {
    return localStorage.tempUser ? JSON.parse(localStorage.tempUser) : tempUserData
  })

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => successResponseGoogle(res, dispatch, navigate))
      .catch((err) => errorResponse(err, dispatch, "user"));
  }

  return (
    <Wrapper>
      <Container>
        <img src="/images/login-logo.svg" className="logo" alt="login" />

        <h3>Welcome Back, {tempUser.displayName.split(" ")[0]}</h3>
        <p>
          Don't miss your next opportunity. Sign in to stay updated on your
          professional world.
        </p>

        <div className="tabs">
          <User onClick={signUpWithGoogle}>
            <img
              src={tempUser.photoURL}
              alt="john-doe"
            />
            <div>
              <h6>{tempUser.displayName}</h6>
              <p>{formatEmail(tempUser.email)}</p>
            </div>
          </User>
          <AnotherUser>
            <BiUser />
            <p>Sign in using another account</p>
          </AnotherUser>
        </div>

        {userError.state && <Error>{userError.errorMsg}</Error>}

        <p className="join">
          New to LinkedIn? <Link to="/signup">Join now</Link>
        </p>
      </Container>
      <Footer />
    </Wrapper>
  );
}

export default Signin;

const Wrapper = styled.section`
  padding: 5% 3%;
  background-color: var(--grayBg);
  min-height: 100vh;
  position: relative;
`;

const Container = styled.div`
  width: min(100%, 700px);
  margin: 3rem auto 0;
  padding: 12px 0 16px;
  ${Flex("space-between", "column")};
  text-align: center;

  .logo {
    width: 80px;
    margin: 1.5rem 0;
  }

  h3 {
    font-size: clamp(1rem, 2vw, 1.5rem);
    font-weight: 500;
  }

  > p:first-of-type {
    color: var(--gray);
    line-height: 1.75;
    padding: 10px 0 32px;
  }

  .tabs {
    width: min(100%, 400px);
    padding: 0.5em;

    > article {
      ${Flex()};
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding: 0.9rem;
      width: 100%;
      gap: 1rem;
      height: 70px;
      cursor: pointer;

      img {
        width: 45px;
        border-radius: 50%;
      }
    }
  }

  .join {
    margin: 2rem 0;

    a {
      font-weight: bold;
      color: var(--link);
    }
  }
`;

const User = styled.article`
    img {
      width: 45px;
      height: 45px;
    }
  > div {
    text-align: start;

    h6 {
      font-weight: 500;
    }
    p {
      color: var(--gray);
      font-size: .8rem;
    }
  }
`;

const AnotherUser = styled.article`
 svg {
    border: 2px solid rgba(0,0,0,0);
    border-radius: 50%;
    background-color: #cfcfcf;
    display: inline-block;
    font-size: 1.5rem;
    padding: .5rem;
    fill: white;
    box-sizing: content-box;
 }

 p {
  color: var(--gray);
 }
`;

