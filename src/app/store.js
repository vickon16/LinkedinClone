import { configureStore} from '@reduxjs/toolkit';
import UserReducer from "../features/user/userSlice";
import PostReducer from "../features/post/postSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    post: PostReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
});
