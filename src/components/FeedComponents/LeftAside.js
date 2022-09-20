import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Flex } from "../../globalFunctions";
import {ItemIcon,PlusIcon,WidgetIcon} from "../../svgs";

const LeftAside = () => {
  const {userCredentials } = useSelector(store => store.user);

  return (
    <Container>
      <CardTop>
        <ProfileCard>
          <div className="background-card"></div>
          <img
            src={userCredentials?.photoURL || "/images/john-doe.png"}
            alt="me"
          />

          <div className="profile-content">
            <Link to="/feed">
              {userCredentials?.displayName || "User Name"}
            </Link>
            <p>Current User works at Linkedin</p>
          </div>
        </ProfileCard>
        <ConnectionCard>
          <div className="connections">
            <div>
              <p>Connections</p>
              <b>Grow your network</b>
            </div>
            <WidgetIcon />
          </div>
          <div className="invitations">
            <p>Invitations</p>
            <b>1</b>
          </div>
        </ConnectionCard>
        <AccessCard>
          <p>Access exclusive tools & insights</p>
          <Link to="/feed">Get Hired Faster, Try Premium Free</Link>
        </AccessCard>
        <ItemCard>
          <ItemIcon />
          <Link to="/feed">My Item</Link>
        </ItemCard>
      </CardTop>
      <CardBottom>
        <LinkCard>
          <Links>
            <Link to="/feed">Groups</Link>
            <Link to="/feed">Events</Link>
            <Link to="/feed">Followed Hashtags</Link>
          </Links>
          <PlusIcon />
        </LinkCard>
        <Discover>Discover more</Discover>
      </CardBottom>
    </Container>
  );
};

export default LeftAside;

const Container = styled.aside`
  grid-area: "left";
  width: 100%;
  ${Flex("", "column", "flex-start")};
  gap: 0.5rem;
  margin-bottom : 2rem;
`;

const CardTop = styled.div`
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  overflow: hidden;

  > article:not(:first-child) {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    padding: 15px 0;
    width: 100%;
  }
`;

const ProfileCard = styled.article`
  width: 100%;
  position: relative;
  text-align: center;

  .background-card {
    background: url("/images/feed-bgImg.svg") center / cover no-repeat;
    height: 56px;
  }

  img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #fff;
  }

  .profile-content {
    ${Flex("", "column")};
    gap: 0.2rem;
    padding: 2.8rem 0 0.8rem;

    a {
      font-weight: 500;
      font-size: 1.05rem;
      color: inherit;
      display: block;
    }

    p {
      font-size: 0.7rem;
    }
  }
`;

const ConnectionCard = styled.article`
  .connections,
  .invitations {
    ${Flex("space-between")};
    padding: 4px 15px;
    width: 100%;

    &:hover {
      background-color: var(--grayBg);
    }

    b {
      font-weight: 500;
    }

    > div {
      line-height: 1rem;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  } ;
`;

const AccessCard = styled.article`
  padding: 15px !important;

  > a {
    color: inherit;
    text-decoration: underline;
    font-weight: 500;
  }

  &:hover {
    background-color: var(--grayBg);
  }

  @media screen and (max-width: 768px) {
    display: none;
  } ;
`;

const ItemCard = styled(AccessCard)`
  ${Flex()};
  gap: 0.2rem;

  > a {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    display: none;
  } ;
`;

const CardBottom = styled(CardTop)`
  position: sticky;
  top: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
  } ;
`;

const LinkCard = styled.article`
  ${Flex("space-between")};
  padding: 15px;

  svg {
    border-radius: 50%;
    padding: 0.3rem;
    box-sizing: content-box;

    &:hover {
      background-color: var(--grayBg);
    }
  }
`;

const Links = styled.div`
  ${Flex("", "column", "flex-start")};
  gap: 0.8rem;

  a {
    font-weight: 500;
    color: var(--link);
  }
`;

const Discover = styled(AccessCard)`
  padding: 10px !important;
  text-align: center;
`
