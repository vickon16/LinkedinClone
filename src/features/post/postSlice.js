import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collectionRef, storage } from "../../firebase-config";

export const postArticleAPI = createAsyncThunk(
  "post/postArticleAPI",
  (payload, thunkAPI) => {
    thunkAPI.dispatch(setPostIsLoading(true));
    const { image, video, user, description, timestamp } = payload;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    if (image !== "") {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          if (snapshot.state === "running") {
            console.log("Running, Upload is " + progress + "% done");
            thunkAPI.dispatch(upDateTask(progress));
          }
        },
        (err) => {
          thunkAPI.dispatch(setPostError(err.message));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            addDoc(collectionRef, {
              actor: {
                email: user.email,
                name: user.displayName,
                date: timestamp,
                image: user.photoURL,
              },
              video, description, shareImg: downloadUrl, comments: 0, shares: 0, reactions: 0, 
              likes: ["Another user"],
            })
              .then(() => {
                thunkAPI.dispatch(setPostIsLoading(false));
                thunkAPI.dispatch(setPostSuccess("Completed Successfully"));
              })
              .catch((err) => {
                thunkAPI.dispatch(setPostIsLoading(false));
                thunkAPI.dispatch(setPostError(err.message));
              });
          });
        }
      );
    } else {
      addDoc(collectionRef, {
      actor: {
        email: user.email,
        name: user.displayName,
        date: timestamp,
        image: user.photoURL,
      },
      video, description, shareImg: image, comments: 0, shares: 0, reactions: 0, 
      likes: ["Another user"],
    })
      .then(() => {
        thunkAPI.dispatch(setPostIsLoading(false));
        thunkAPI.dispatch(setPostSuccess("Completed Successfully"));
      })
      .catch((err) => {
        thunkAPI.dispatch(setPostIsLoading(false));
        thunkAPI.dispatch(setPostError(err.message));
      });
    }
  }
);

const initialState = {
  articles: [],
  taskProgress: "",
  postError: { state: false, errorMsg: "" },
  postSuccess: { state: false, successMsg: "" },
  postIsLoading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    upDateTask: (state, action) => {
      state.taskProgress = action.payload;
    },
    setPostError: (state, action) => {
      state.postError.state = true;
      state.postError.errorMsg = action.payload;
    },
    setPostIsLoading: (state, action) => {
      state.postIsLoading = action.payload;
    },
    setPostSuccess: (state, action) => {
      state.postSuccess.state = true;
      state.postSuccess.successMsg = action.payload;
    },
    resetPostErrorSuccess: (state) => {
      state.postSuccess.state = false;
      state.postError.state = false;
      state.postSuccess.successMsg = "";
      state.postError.errorMsg = "";
    },
  },
});

export const {
  upDateTask,
  setArticles,
  setPostError,
  setPostSuccess,
  setPostIsLoading,
  resetPostErrorSuccess,
} = postSlice.actions;

export default postSlice.reducer;
