import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import auth from "../Firebase/Firebase.Config";
import {
  logoutUser,
  setUser,
  toggleLoading,
} from "../Redux/features/userSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // if the user is available then dispatch will update the user
      // or else it will just update the loading state false because initialy we have been set the isLoading true and clearing the user data

      if (currentUser) {
        // console.log("current user:", currentUser);
        dispatch(
          setUser({
            userName: currentUser.displayName,
            userPhoto: currentUser.photoURL,
            userEmail: currentUser.email,
          }),
        );
        dispatch(toggleLoading(false));
      } else {
        dispatch(logoutUser());
        dispatch(toggleLoading(false));
      }
    });

    return () => unSubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
