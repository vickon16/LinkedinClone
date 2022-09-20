import styled from "styled-components";
import { Flex } from "../globalFunctions";
import ContentSuggested from "../components/HomeComponents/ContentSuggested";
import HeroSection from "../components/HomeComponents/HeroSection";
import ContentLinks from "../data/ContentLinks.json";
import SuggestedLinks from "../data/SuggestedLinks.json";
import PostJob from "../components/HomeComponents/PostJob";
import Header from "../components/Header";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <Container>
      <Header />
      <HeroSection />
      <ContentSuggested
        mainText="Explore topics you are interested in"
        subText="content topics"
        linkArr={ContentLinks}
        Bg="var(--grayBg)"
      />
      <ContentSuggested
        mainText="Find the right job or internship for you"
        subText="suggested searches"
        linkArr={SuggestedLinks}
        Bg="#fff"
      />
      <PostJob />
      <Footer />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  ${Flex("", "column", "flex-start")};
  position: relative;

  @media screen and (max-width: 1128px) {
    > section {
      padding: 0 15px;
    }
  } ;
`;





