/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components'
import { Flex } from '../../globalFunctions'
import { CloseIcon, DownIcon, PhotoImageIcon, VideoIcon, WorldIcon } from '../../svgs';
import ReactPlayer from "react-player";
import { Timestamp } from 'firebase/firestore';
import { postArticleAPI } from '../../features/post/postSlice';

const PostModal = ({ setIsModalOpen }) => {
  const { userCredentials } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [editorText, setEditorText] = useState("");
  const [shareImg, setShareImg] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [asset, setAsset] = useState("");


const handleSubmit = (e) => {
  e.preventDefault();
  
  dispatch(postArticleAPI({
    image: shareImg,
    video: videoLink,
    user: userCredentials,
    description: editorText,
    timestamp: Timestamp.now(),
  }));

  setEditorText("");
  setIsModalOpen(false);
}

const switchAssets = () => {
  if (asset === "photo") {
    return (<>
      <input 
          type="file" 
          accept="image/gif, image/jpeg, image/png" 
          id="file" 
          onChange={(e) => setShareImg(e.target.files[0])}
        />
        <label htmlFor='file'>Select an image to share.</label>
        {shareImg && <img src={URL.createObjectURL(shareImg)} alt="sharedImg" />}
      </>)
  } else if (asset === "video") {
    return (
      <>
        <input
          type="text"
          placeholder="Please input a video link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
      </>
    );
  }
}

const handleReset = () => {
  setEditorText("");
  setShareImg("");
  setVideoLink("");
  setAsset("");
}

  return (
    <Container onClick={() => setIsModalOpen(false)}>
      <Content onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Create a post</h2>
          <CloseIcon onClick={() => setIsModalOpen(false)} />
        </ModalHeader>
        <SharedContent>
          <UserInfo>
            <img
              src={userCredentials?.photoURL || "/images/john-doe.png"}
              alt="me"
            />
            <div>
              <p>{userCredentials?.displayName || "User Name"}</p>
              <AnyoneButton>
                <WorldIcon />
                <span>Anyone</span>
                <DownIcon />
              </AnyoneButton>
            </div>
          </UserInfo>
          <Editor
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            autoFocus={true}
            required
            placeholder="What do you want to talk about?"></Editor>
        </SharedContent>
        <UploadeImage>
          {switchAssets()}
        </UploadeImage>
        <ModalFooter>
          <a>Add Hastag</a>
          <Assets>
            <PhotoImageIcon title="Add Photo" onClick={() => setAsset("photo")} />
            <VideoIcon title="Add Video" onClick={() => setAsset("video")} />
          </Assets>
          <FooterBottons>
            <AnyoneButton>
              <span onClick={handleReset}>reset</span>
            </AnyoneButton>
            <button onClick={handleSubmit} disabled={!editorText}>
              Post
            </button>
          </FooterBottons>
        </ModalFooter>
      </Content>
    </Container>
  );
};

export default PostModal

const scaleRemove = keyframes`
  from {
    scale: 0;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
`

const Container = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
  animation : ${scaleRemove} .25s ease-in-out;
`

const Content = styled.div`
  width: min(100%, 552px);
  margin: 0 auto;
  background-color: #fff;
  max-height: 90%;
  overflow: auto;
  border-radius: 8px;
  position: relative;
  ${Flex("", "column")};
  top: 40px;
  z-index:6;

  > article {
    padding: 11px 20px;
    width: 100%;
  }
`;
const ModalHeader = styled.article`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  ${Flex("space-between")};

  h2 {
    font-size: clamp(1rem , 1.3vw, 1.3rem);
    font-weight: 400;
  }

  svg {
    fill : rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    padding: 8px;
    box-sizing: content-box;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`

const SharedContent = styled.article`
  ${Flex("", "column", "flex-start")};
  gap: 1rem;
  width: 100%;
`;

const UserInfo = styled.div`
  ${Flex("flex-start")};
  gap: 1rem;

  img {
    width: 50px;
    border-radius: 50%;
  }

  > div {
    ${Flex("", "column", "flex-start")};

    p {
      font-weight: 500;
    }
  }
`

const Editor = styled.textarea`
  resize: none;
  font-size: 1rem;
  padding: 5px;
  width: 100%;
  font-family: inherit;
  height: 130px;
`

const AnyoneButton = styled.div`
  border-radius: 40px;
  padding: 5px 8px;
  ${Flex()};
  gap: 6px;
  color: var(--gray);
  fill: var(--gray);
  border: 1px solid rgba(0, 0, 0, 0.8);
  cursor: pointer;

  span {
    font-size: 0.85rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    border: 2px solid rgba(0, 0, 0, 0.8);
  }
`;

const ModalFooter = styled.article`
  ${Flex("space-between")};

  a {
    font-size: clamp(.9rem, 1.05vw, 1.05rem);
    color: var(--link);
    font-weight: 500;
    padding: 5px 10px;

    &:hover {
      text-decoration: none;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const Assets = styled.div`
  ${Flex()};
  gap: .8rem;

  svg {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
`

const FooterBottons = styled.div`
  ${Flex()};
  gap: 15px;

  button {
    background-color: var(--link);
    border-radius: 40px;
    color: #fff;
    padding: 10px 20px;
    font-size: 1rem;

    &:disabled {
      cursor: not-allowed;
      background-color: rgba(0, 0, 0, 0.09);
      color: var(--gray);
    }
  }
`;

const UploadeImage = styled.article`
  label {
    color: var(--link);
    font-weight: 500;
    display: block;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-height: 350px;
    margin: 15px 0;
  }

  > input[type="file"] {
    display: none;
  }

  > input[type="text"] {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
  }
`;