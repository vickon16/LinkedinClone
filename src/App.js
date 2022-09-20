/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignedUpUser} from "./features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Loader from "./components/Loader";


function App() {
  const [appLoading, setAppLoading] = useState(true);
  const { userCredentials } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setAppLoading(true);
    const onSub = onAuthStateChanged(auth, user => {
      if (user) {
        const {email, displayName, photoURL} = user
        dispatch(setSignedUpUser({email, displayName, photoURL }));
        setAppLoading(false);
      }
    })
    return onSub;
  }, [])

  if(appLoading) {
    return <Loader />
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/home"
            element={userCredentials ? <Navigate to="/feed" /> : <Home />}
          />
          <Route path="/feed"
            element={userCredentials ? <Feed /> : <Navigate to="/home" />}
          />
          <Route path="/signin"
            element={userCredentials ? <Navigate to="/feed" /> : <Signin />}
          />
          <Route path="/signup" element={<Signup />} />

          <Route path="/*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
