import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../../globalFunctions";
import { ArrowRight, DotDot, InfoIcon, PlusIcon } from "../../svgs";
import FeedFooter from "./FeedFooter";

const RightAside = () => {
  const { userCredentials } = useSelector((store) => store.user);

  return (
    <Container>
      <CardTop>
        <div className="header">
          <h4>Add to your feed</h4>
          <InfoIcon />
        </div>
        <FollowContainer>
          <FollowCard>
            <img src="/images/feed-img3.jpg" alt="feed-img1" />
            <div>
              <Link to="/feed">
                <h4>Accenture</h4>
                <p>Company &#8226; Information Technology and Services</p>
              </Link>
              <button>
                <PlusIcon />
                Follow
              </button>
            </div>
          </FollowCard>
          <FollowCard>
            <img src="/images/feed-img2.jpg" alt="feed-img2" />
            <div>
              <Link to="/feed">
                <h4>IBM</h4>
                <p>Company &#8226; Human Resources</p>
              </Link>
              <button>
                <PlusIcon />
                Follow
              </button>
            </div>
          </FollowCard>
          <FollowCard>
            <img src="/images/feed-img3.jpg" alt="feed-img3" />
            <div>
              <Link to="/feed">
                <h4>LinkedIn</h4>
                <p>Company &#8226; Computer Software</p>
              </Link>
              <button>
                <PlusIcon />
                Follow
              </button>
            </div>
          </FollowCard>
        </FollowContainer>

        <Recommendations>
          View All Recommendations <ArrowRight />
        </Recommendations>
      </CardTop>
      <CardMiddle>
        <div className="header">
          <h4>Ad</h4>
          <DotDot />
        </div>
        <CardMiddleContent>
          <Link to="/feed">
            <span>
              Username, Unlock your full potential with Linkedin Premium
            </span>
            <div className="profile-key">
              <img
                src={userCredentials?.photoURL || "/images/john-doe.png"}
                alt="profile-img"
              />
              <img src="/images/key-img.jpg" alt="profile-img" />
            </div>
          </Link>

          <p>See who's viewed your profile in the last 90 days.</p>
        </CardMiddleContent>
      </CardMiddle>
      <FeedFooter />
    </Container>
  );
};

export default RightAside;

const Container = styled.aside`
  grid-area: "right";
  width: 100%;
  ${Flex("", "column", "flex-start")};
  gap: 0.5rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 990px) {
    display: none;
  } ;
`;

const CardTop = styled.article`
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  padding: 12px;
  ${Flex("", "column", "flex-start")};
  gap: 0.8rem;

  .header {
    width: 100%;
    ${Flex("space-between")};

    h4 {
      font-weight: 500;
    }

    svg {
      color: var(--gray);
    }
  }
`;

const FollowContainer = styled.div`
  ${Flex("", "column", "flex-start")};
  gap: 1rem;
`

const FollowCard = styled.div`
  ${Flex("space-between", "row", "flex-start")};
  gap: .7rem;

  img {
    width: 50px;
    height: 50px;
    margin-top: .2rem;
    border-radius: 50%;
  }

  > div {
    ${Flex("space-between", "column", "flex-start")};
    gap: 0.4rem;

    > a {
      ${Flex("space-between", "column", "flex-start")};
      color: var(--gray);

      h4 {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.9);
        font-size: 0.9rem;
      }

      p {
        font-size: .75rem;
      }

      &:hover {
        text-decoration: none;
      }
    }

    button {
      ${Flex()};
      gap: .2rem;
      padding: 6px 16px;
      border-radius: 1.5rem;
      max-width: 480px;
      text-align: center;
      border: 1px solid var(--gray);
      color: var(--gray);
      transition: background-color .1s, border .1s;
      transition-timing-function: ease-in-out;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        border: 2px solid var(--gray);
      }

    }
  }
`;

const Recommendations = styled.div`
  ${Flex()};
  gap: .3rem;
  color: var(--gray);
  font-size: .9rem;

  &:hover {
    background-color: var(--grayBg);
  }
`;

const CardMiddle = styled(CardTop)`
  position: sticky;
  top: 1rem;
  padding-top: 8px;
  gap: 0;

  .header {
    justify-content: flex-end;
    gap: 0.5rem;

    h4,
    svg {
      font-size: 0.8rem;
      width: 15px;
    }
  }
`;

const CardMiddleContent = styled.div` 
  ${Flex("", "column")};
  text-align: center;

  > a {
    color: var(--gray);

    span {
      font-size: .78rem;
    }

    .profile-key {
      ${Flex("center")};
      gap: .5rem;
      padding: 7px 0 10px;

      img {
        width: 70px;

        &:first-child {
          border-radius: 50%;
        }
      }
    }

    &:hover {
      text-decoration: none;
    }
  }

  > p {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.7);
  }
`
