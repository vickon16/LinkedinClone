import { Link} from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../../globalFunctions";

const ContentSuggested = ({ mainText, subText, linkArr, Bg }) => {

  return (
    <Container Bg={Bg}>
      <Wrapper>
        <h1>{mainText}</h1>
        <Content>
          <h4>{subText}</h4>

          <Links>
            {linkArr.map(item => (
              <Link
                to="/home"
                key={item.id}
                className={item.active ? "active" : ""}
                onClick={!item.active}
                >
                {item.title}
              </Link>
            ))}
          </Links>
        </Content>

      </Wrapper>
    </Container>
  );
};

export default ContentSuggested;

const Container = styled.section`
  width: 100%;
  background-color: ${({ Bg }) => Bg};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 60px 0;
  width: min(100%, 1150px);
  margin: 0 auto;
  gap: 4.5rem;

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 4rem;
    font-weight: 300;
    max-width: 400px;
  }

  @media screen and (max-width: 992px) {
    grid-template-columns: auto;
    gap: 1rem;

    h1 {
      max-width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-weight: 400;
      line-height: 2.5rem;
    }
  } ;
`;

const Content = styled.div`
  ${Flex("space-between", "column", "flex-start")};
  gap: 1rem;

  h4 {
    color: var(--gray);
    text-transform: uppercase;
    font-weight: 500;
  }
`;

const Links = styled.div`
  ${Flex()};
  flex-wrap: wrap;
  gap: .6rem .25rem;

  > a {
    height: min-content;
    min-height: 56px;
    border-radius: 28px;
    padding: 12px 24px;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
    width: max-content;
    color: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);

    &:active, &.active {
      color: var(--link);
      border-color: var(--link);
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;
