import styled from "styled-components";
import { Flex } from "../globalFunctions";
import HeaderFeed from "../components/FeedComponents/HeaderFeed";
import LeftAside from "../components/FeedComponents/LeftAside";
import MainAside from "../components/FeedComponents/MainAside";
import RightAside from "../components/FeedComponents/RightAside";

const Feed = () => {
  return (
    <Container>
      <HeaderFeed />
      <FeedLayout>
        <LeftAside />
        <MainAside />
        <RightAside />
      </FeedLayout>
    </Container>
  );
};

export default Feed;

const Container = styled.main`
  ${Flex("", "column", "flex-start")};
  background-color : var(--grayBg);

  p, small, a, span, b {
    font-size: .8rem;
  }
`;

const FeedLayout = styled.section`
  width: min(100%, 1150px);
  margin: 0 auto;
  display: grid;
  grid-template-areas: "left main right";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  gap: 20px;
  grid-template-rows: auto;
  position: relative;

  @media screen and (max-width: 990px) {
    width: min(100%, 750px);
    grid-template-areas: "left main";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr);
  }

  @media screen and (max-width: 768px) {
    width: min(100%, 600px);
    grid-template-areas: "main";
    grid-template-columns: minmax(0, 12fr);
  } ;
`;
