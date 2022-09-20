import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { errorResponse, Flex, successResponseEmailPsw, successResponseGoogle } from "../globalFunctions";
import {FcGoogle} from "react-icons/fc"
import Footer from "../components/Footer";
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth"
import {auth, provider} from "../firebase-config";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userError} = useSelector(store => store.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailPhone, password)
      .then((res) => successResponseEmailPsw(res, dispatch, navigate))
      .catch((err) => errorResponse(err, dispatch, "user"));
  }

  const signUpWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => successResponseGoogle(res, dispatch, navigate))
      .catch((err) => errorResponse(err, dispatch, "user"));
  }

  return (
    <Wrapper>
      <Container>
        <LogoContainer>
          <img src="/images/login-logo.svg" className="logo" alt="login" />
        </LogoContainer>

        <h1>Make the most of your professional life</h1>

        <FormWrapper>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <InputWrapper>
              <label>Email or phone number</label>
              <input
                type="text"
                value={emailPhone}
                autoComplete="false"
                onChange={(e) => setEmailPhone(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <label>Password (6 or more characters)</label>
              <input
                type={show ? "text" : "password"}
                value={password}
                autoComplete="false"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="showHide" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </span>
            </InputWrapper>
            <p>
              By clicking Agree & Join, you agree to the LinkedIn{" "}
              <span>User Agreement</span>, <span>Privacy Policy</span> and
              <span> Cookie Policy</span>.
            </p>
            {userError.state && <Error>{userError.errorMsg}</Error>}
            <button disabled={!emailPhone || !password}>Agree and Join</button>
          </Form>

          <Or>
            <span>or</span>
          </Or>
          <GoogleBtn onClick={signUpWithGoogle}>
            <FcGoogle /> Continue with Google
          </GoogleBtn>
          <p className="signin">
            Already on LinkedIn?
            <Link to="/signin"> Sign in</Link>
          </p>
        </FormWrapper>

        <p className="help">
          Looking to create a page for a business?
          <Link to="/"> Get help</Link>
        </p>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.section`
  background-color: var(--grayBg);
  min-height: 100vh;
  position: relative;
`;

const Container = styled.div`
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 25px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: clamp(1.8rem, 3vw, 2rem);
    font-weight: 400;
    margin: 1.5rem 0 1rem;
  }

  .help {
    margin: 2rem 0;
    font-size: 0.9rem;

    a {
      font-weight: bold;
      color: var(--link);
    }
  }

  @media screen and (max-width: 768px) {
    padding: 20px 15px;

    .help {
      margin-bottom: 10rem;
    }
  } ;
`;

const LogoContainer = styled.div`
  width: 130px;
  align-self: flex-start;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 30px 25px 20px;
  width: min(100%, 410px);
  ${Flex("", "column", "center")};
  border-radius: 8px;
  gap: 1.3rem;

  @media screen and (max-width: 1162px) {
    width: min(100%, 650px);
    background: transparent;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
  } ;
`;

const Form = styled.form`
  width: 100%;
  ${Flex("", "column", "flex-start")};
  gap: 1.3rem;

  > p {
    font-size: 0.8rem;
    color: var(--gray);

    span {
      font-weight: 600;
      color: var(--link);
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  > button {
    align-self: center;
    background-color: #0a66c2;
    height: 48px;
    border-radius: 24px;
    width: 100%;
    color: #fff;

    &:hover {
      background-color: #07427d;
    }
  }
`;

const InputWrapper = styled.div`
  ${Flex("", "column", "flex-start")};
  gap: 0.15rem;
  width: 100%;
  position: relative;

  label {
    font-size: 0.9rem;
    color: var(--gray);
  }

  input {
    padding: 0.5rem 0.8rem;
    border: 1px solid black;
    width: 100%;
    border-radius: 4px;
    font-size: .9rem;
  }

  .showHide {
    position: absolute;
    right: 10px;
    top: 50%;
    font-size: .9rem;
    cursor: pointer;
    user-select: none;

    &:Hover {
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
  gap: .5rem;
  font-size: .95rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  width: 90%;
  padding: .6rem;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

export const Error = styled.p`
  color: red !important;;
  text-align: center;
  margin: 5px auto;
  font-size: clamp(1rem, 1.1vw, 1.15rem) !important;
`