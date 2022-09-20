import { Link } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../../globalFunctions";

const PostJob = () => {
  return (
    <Container>
      <Wrapper>
        <h1>Post your job for millions of people to see</h1>
        <Link to="/home">Post a job</Link>
      </Wrapper>
    </Container>
  );
};

export default PostJob;

const Container = styled.section`
  width: 100%;
  background-color: #f1ece5;
  margin-bottom: 8rem;
`;

const Wrapper = styled.div`
  ${Flex()};
  padding: 60px 0;
  width: min(100%, 1150px);
  margin: 0 auto;
  gap: 4.5rem;

  h1 {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 3rem;
    font-weight: 400;
    max-width: 400px;
    color: var(--thickBrown);
  }

  a {
    height: min-content;
    min-height: 56px;
    border-radius: 28px;
    padding: 12px 24px;
    font-size: 1.25rem;
    font-weight: 600;
    width: max-content;
    color: var(--link);
    border: 1px solid var(--link);

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }
`;
