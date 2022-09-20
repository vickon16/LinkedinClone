import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Flex, formatDate} from "../../globalFunctions";
import {
  CommentIcon,
  DotDot,
  LikeIcon,
  PlusIcon,
  ReactionLike,
  ReactionLove,
  SendIcon,
  ShareIcon,
  WorldIcon,
} from "../../svgs";

const PostCard = ({ actor, video, reactions, likes, comments, description, shareImg }) => {
  return (
    <Container>
      {likes?.length && (
        <PostTopReaction>
          <div>
            <img src="/images/feed-img2.jpg" alt="1" />
            <p className="post-reaction-text">{likes.join()}</p>
            <small>Likes this</small>
          </div>
          <DotDot />
        </PostTopReaction>
      )}
      <MainPostContent>
        <PostHeader>
          <Link to="/feed">
            <img src={actor?.image || "/images/feed-img2.jpg"} alt="2" />
          </Link>

          <PostHeaderContent>
            <h4 className="post-name">
              <Link to="/feed">{actor.name}</Link>
              <span> &#8226; 3rd +</span>
            </h4>
            <p className="post-desc">
              Law Student || International Trade Law || Negotiation ||
              Continuation || and Protocol ||
            </p>
            <span className="post-time">
              <small>
                {actor?.date ? formatDate(actor.date) : "1yr"} &#8226;
              </small>{" "}
              <span>Edited &#8226; </span>
              <WorldIcon />
            </span>
          </PostHeaderContent>
          <PostHeaderFollowButton>
            <PlusIcon />
            Follow
          </PostHeaderFollowButton>
        </PostHeader>

        <PostBody>
          <p className="post_body-p">
            {description}
            <span> #Ministry</span> <span> #justice</span>.
          </p>
          {shareImg && (
            <div className="post-image">
              <img src={shareImg || "/images/feed-img3.jpg"} alt="post-img" />
            </div>
          )}
          {video && (
            <div className="post-video">
              <ReactPlayer width={"100%"} url={video} />
            </div>
          )}

          <div className="post-reactions">
            <div className="svgs">
              <ReactionLike />
              <ReactionLove />
              <Link to="/feed">{reactions}</Link>
            </div>
            <div className="comments-shares">
              <Link to="/feed">{comments} comment </Link>
              &#8226;
              <Link to="/feed"> 2 shares</Link>
            </div>
          </div>
        </PostBody>
      </MainPostContent>

      <PostFooter>
        <Link to="/feed">
          <LikeIcon />
          <span>Like</span>
        </Link>
        <Link to="/feed">
          <CommentIcon />
          <span>Comment</span>
        </Link>
        <Link to="/feed">
          <ShareIcon />
          <span>Share</span>
        </Link>
        <Link to="/feed">
          <SendIcon />
          <span>Send</span>
        </Link>
      </PostFooter>
    </Container>
  );
};

export default PostCard;

const Container = styled.section`
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  padding: 5px 12px 0px;
  ${Flex("", "column", "flex-start")};
  gap: 0.5rem;

  > article {
    width: 100%;
    ${Flex("space-between")};
    padding: 6px 0;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

const PostTopReaction = styled.article`
  > div {
    ${Flex()};
    gap: 0.5rem;
    width: 100%;

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    p {
      font-weight: 500;
      width: fit-content;
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    small {
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const MainPostContent = styled.article`
  ${Flex("", "column", "flex-start")};
  gap: 0.3rem;
`;

const PostHeader = styled.div`
  ${Flex("", "row", "flex-start")};
  gap: 0.5rem;
  width: 100%;

  > a img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const PostHeaderContent = styled.div`
  width: 100%;
  overflow: hidden;

  .post-name {
    a {
      color: rgba(0, 0, 0, 0.7);

      &:hover {
        color: var(--link);
      }
    }

    span {
      color: rgba(0, 0, 0, 0.7);
      font-weight: 400;
    }
  }

  .post-desc {
    font-size: 0.75rem;
    color: var(--gray);
    font-weight: 400;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .post-time {
    ${Flex()};
    font-size: 0.75rem;
    color: var(--gray);
    gap: 0.3rem;
  }
`;

const PostHeaderFollowButton = styled.button`
  ${Flex()};
  gap: 0.3rem;
  color: var(--link);
  font-weight: 700;
  border-radius: 4px;
  font-size: 1rem;
  opacity: 0.85;
  padding: 8px 4px;
  align-self: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const PostBody = styled.div`
  ${Flex("", "column", "flex-start")};
  row-gap: 0.8rem;
  width: 100%;

  .post_body-p {
    font-size: 0.9rem;

    span {
      color: var(--link);
      font-weight: 500;
    }
  }

  .post-image, .post-video {
    width: 100%;
    min-height: 350px;
  }

  .post-reactions {
    ${Flex("space-between")};
    width: 100%;

    .svgs {
      ${Flex()};

      svg {
        border-radius: 50%;

        &:nth-child(1) {
          background-color: #1b74e4;
        }

        &:nth-child(2) {
          background-color: red;
        }
      }
    }

    a {
      color: var(--gray);
      margin-left: 0.3rem;
      font-size: 0.85rem;

      &:hover {
        color: var(--link);
      }
    }
  }
`;

const PostFooter = styled.article`
  justify-content: space-around !important;
  padding: 0;
  flex-wrap: wrap;

  > a {
    ${Flex()};
    padding: 12px;
    border-radius: 4px;
    gap: 0.4rem;

    svg,
    span {
      color: var(--gray);
    }

    span {
      font-size: 0.95rem;
      font-weight: 500;
    }

    &:hover {
      text-decoration: none;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }

  @media screen and (max-width: 425px) {
    justify-content: flex-start !important;
  } ;
`;
