/* eslint-disable react-hooks/exhaustive-deps */
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setArticles, setPostIsLoading } from "../../features/post/postSlice";
import { collectionRef } from "../../firebase-config";
import { Flex } from "../../globalFunctions";
import { DownIcon, LoaderIcon } from "../../svgs";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import {initialArticles} from "../../data/InitialArticles"

const MainAside = () => {
  const { articles, postIsLoading } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [initialArticleData] = useState(initialArticles);

  useEffect(() => {
    dispatch(setPostIsLoading(true));
    const orderByDate = query(collectionRef, orderBy("actor.date", "desc"));
    onSnapshot(orderByDate, (snapshot) => {
      const payload = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setArticles(payload))
      dispatch(setPostIsLoading(false));
    });
  }, []);

  return (
  <Container>
    <CreatePost />
    <SortBy>
      Sort by: <b>Top<DownIcon /></b>
    </SortBy>
    {postIsLoading ? (<LoaderIcon className="spinner-loader" />) : (
      <PostContent>
        {articles.map(items => (
          <PostCard key={items.id} {...items} />
      ))}
      {initialArticleData.map(items => (
          <PostCard key={items.id} {...items} />
      ))}
      </PostContent>
    )}
  </Container>
  );
};

export default MainAside;

const rotate = keyframes`
 from {
  transform: rotate(0deg);
 }
 to {
  transform : rotate(360deg);
 }
`

const Container = styled.aside`
  grid-area: "main";
  ${Flex("", "column", "flex-start")};
  gap: 0.5rem;

  .spinner-loader {
    width: 40px;
    height: 40px;
    fill : rgba(0, 0, 0, 0.4);
    animation: ${rotate} 1s linear infinite;
    margin: 30px auto 10px;
  }
`;

const SortBy = styled.p`
  width: 100%;
  ${Flex("flex-end")};
  color: var(--gray);
  position: relative;
  width: 100%;

  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.2);
    height: 1px;
    width: 82%;
  }

  b {
    gap: 0.2rem;

    svg {
      vertical-align: middle;
      margin-left: 0.2rem;
    }
  }
`;

const PostContent = styled.div`
  ${Flex("", "column", "flex-start")};
  width: 100%;
  row-gap: .8rem;
`