import { parseISO, formatDistanceToNow } from "date-fns";
import {resetPostErrorSuccess, setPostError } from "./features/post/postSlice";
import { resetUserErrorSuccess, setSignedUpUser, setUserError } from "./features/user/userSlice";

export const Flex = (content, direction, items) => `
  display: flex;
  align-items: ${items || "center"};
  ${content && `justify-content: ${content}`};
  ${direction && `flex-direction: ${direction}`};
`;

export const formatEmail = (value) => {
  const symbolIndex = value.indexOf("@");
  const arr = value.split("");
  if (symbolIndex > 6) {
    arr.splice(symbolIndex - 6, 5, "*", "*", "*", "*", "*");
    return arr.join("");
  } else if (symbolIndex > 10) {
    arr.splice(
      symbolIndex - 10, 9, "*", "*", "*", "*", "*", "*", "*", "*", "*"
    );
    return arr.join("");
  }
  return value;
};

export const formatDate = (timeStamp) => {
  const fireBaseTime = new Date(
    timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000
  );
  const date = fireBaseTime.toISOString();
  const parsed = parseISO(date);
  const timePeriod = formatDistanceToNow(parsed);
  return `${timePeriod} ago`;

  // or
  // const date = fireBaseTime.toDateString();
  // const atTime = fireBaseTime.toLocaleTimeString();
  // return `${date} at ${atTime}`
};

export const successResponseEmailPsw = (response, dispatch, navigate) => {
  const { email, displayName, photoURL } = response.user;
  console.log(response.user);
  dispatch(setSignedUpUser({ email, displayName, photoURL }));
  localStorage.tempUser = JSON.stringify({
    email,
    displayName: "User Name",
    photoURL: "/images/john-doe.png",
  });
  navigate("/feed");
};

export const successResponseGoogle = (response, dispatch, navigate) => {
  const { email, displayName, photoURL } = response.user;
  dispatch(setSignedUpUser({ email, displayName, photoURL }));
  localStorage.tempUser = JSON.stringify({ email, displayName, photoURL });
  navigate("/feed");
};

export const errorResponse = (error, dispatch, slice) => {
  slice === "user"
    ? dispatch(setUserError(error.message))
    : dispatch(setPostError(error.message));

  setTimeout(() => {
    slice === "user" 
    ? dispatch(resetUserErrorSuccess()) 
    : dispatch(resetPostErrorSuccess())
  }, 4000);
};
