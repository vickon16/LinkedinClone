import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from '../../globalFunctions';
import { ArticleIcon, EventIcon, PhotoImageIcon, VideoIcon } from "../../svgs";
import PostModal from './PostModal';

const CreatePost = () => {
  const { userCredentials } = useSelector((store) => store.user);
  const { postIsLoading } = useSelector((store) => store.post);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Container>
        <StartPost>
          <img src={userCredentials?.photoURL || "/images/john-doe.png"} alt="user-img" />
          <button disabled={postIsLoading} onClick={() => setIsModalOpen(true)}><b>Start a post</b></button>
        </StartPost>
        <PostFunctions>
          <Link to="/feed">
            <PhotoImageIcon />
            <span>Photo</span>
          </Link>
          <Link to="/feed">
            <VideoIcon />
            <span>Video</span>
          </Link>
          <Link to="/feed">
            <EventIcon />
            <span>Event</span>
          </Link>
          <Link to="/feed">
            <ArticleIcon />
            <span>Write article</span>
          </Link>
        </PostFunctions>
      </Container>
      {isModalOpen && <PostModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default CreatePost;

const Container = styled.section`
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  padding: 5px 12px 0px;
  ${Flex("", "column", "flex-start")};
`;

const StartPost = styled.div`
  width: 100%;
  ${Flex()};
  gap: 1rem;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  button {
    margin: 0.4rem 0;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 35px;
    padding: 1rem;
    ${Flex("flex-start")}

    b {
      color: rgba(0, 0, 0, 0.5);
      font-size: .9rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    &:disabled {
      cursor : not-allowed
    }
  }
`;

const PostFunctions = styled.div`
  ${Flex("space-between")};
  width: 100%;
  flex-wrap: wrap;

  > a {
    ${Flex()};
    padding: 12px 5px 12px 3px;
    border-radius: 4px;

    svg {
      width: 45px;
    }

    span {
      font-size: .9rem;
      color: var(--gray);
      font-weight: 500;
    }

    &:hover {
      text-decoration: none;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
