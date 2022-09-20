import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { errorResponse, Flex, successResponseEmailPsw, successResponseGoogle } from "../../globalFunctions";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import {auth, provider} from "../../firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "../../pages/Signup";

const HeroSection = () => {
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userError } = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, emailPhone, password)
      .then((res) => successResponseEmailPsw(res, dispatch, navigate))
      .catch((err) => errorResponse(err, dispatch, "user"));
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => successResponseGoogle(res, dispatch, navigate))
      .catch((err) => errorResponse(err, dispatch, "user"));
  };

  return (
    <Container>
      <LeftSection>
        <h1>Welcome to your professional community</h1>

        <FormWrapper>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <InputWrapper>
              <input
                type="text"
                value={emailPhone}
                placeholder="Email or phone number"
                autoComplete="false"
                onChange={(e) => setEmailPhone(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <input
                type={show ? "text" : "password"}
                value={password}
                placeholder="Password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="showHide" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </span>
            </InputWrapper>
            <Link to="/home">Forget password?.</Link>
            {userError.state && <Error>{userError.errorMsg}</Error>}
            <button disabled={!emailPhone || !password}>
              Sign In
            </button>
          </Form>

          <Or>
            <span>or</span>
          </Or>
          <GoogleBtn onClick={signUpWithGoogle}>
            <FcGoogle /> Sign in with Google
          </GoogleBtn>
        </FormWrapper>
      </LeftSection>

      <RightSection>
        <img src="/images/login-hero1.svg" alt="hero" />
      </RightSection>
    </Container>
  );
};

export default HeroSection;

const Container = styled.section`
  ${Flex()};
  gap: 2rem;
  width: min(100%, 1150px);
  margin: 0 auto;

  @media screen and (max-width: 768px) {
   align-items: flex-start;
   flex-direction: column;
  }
`;

const LeftSection = styled.aside`
  min-width: 50%;

  h1 {
    font-size: 3.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
    line-height: 4.2rem;
    color: var(--brownText);
  }

  @media screen and (max-width : 768px) {
    min-width: 100%;

    h1 {
      font-size: 2rem;
      line-height: 2.5rem;
    }
  };
`;

const FormWrapper = styled.div`
  padding: 10px 0;
  width: min(100%, 410px);
  ${Flex("", "column", "center")};
  gap: 1.3rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  } ;
`;

const Form = styled.form`
  width: 100%;
  ${Flex("", "column", "flex-start")};
  gap: 1rem;

  > a {
    margin: 0.3rem 0;
  }

  > button {
    align-self: center;
    background-color: #0a66c2;
    height: 54px;
    border-radius: 24px;
    width: 100%;
    color: #fff;
    font-size: clamp(1.2rem, 1.7vh, 1.7rem);

    &:hover {
      background-color: #07427d;
    }

    &:disabled {
      cursor : default;
      opacity: 0.6;
    }
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;

  input {
    height: 48px;
    padding: 15px 12px;
    border: 1px solid rgba(0, 0, 0, 0.6);
    width: 100%;
    font-size: 1.1rem;

    &::placeholder {
      font-size: 0.9rem;
    }
  }

  .showHide {
    position: absolute;
    right: 10px;
    top: 30%;
    font-size: .95rem;
    cursor: pointer;
    user-select: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Line = `
  content: "";
  position: absolute;
  width: 42%;
  top: 50%;
  background: rgba(0, 0, 0, 0.3);
  height: 1px;
`;

const Or = styled.div`
  width: 100%;
  position: relative;
  text-align: center;

  span {
    &:before {
      ${Line};
      left: 0;
    }

    &:after {
      ${Line};
      right: 0;
    }
  }
`;

const GoogleBtn = styled.button`
  ${Flex("center")};
  gap: 1rem;
  font-size: 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 40px;
  width: 100%;
  padding: 1rem 0;
  color: var(--gray);
  transition: none;

  svg {
    font-size: 1.6rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border: 2px solid rgba(0, 0, 0, 0.9);
  }
`;

const RightSection = styled.aside`
  height: 560px;
  width: 100%;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  @media screen and (min-width: 1128px) {
    img {
      width: auto;
    }
  }

  @media screen and (max-width: 768px) {
    width: min(100%, 300px);
    margin: 0 auto;
    height: auto;

    img {
      position: static;
    }
  }
`;
