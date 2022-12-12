import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAuthStatus = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
        setUser(currentUser);
      } else {
        setLoggedIn(false);
        setUser({});
      }
    });
    return () => {
      checkAuthStatus();
    };
  }, []);

  return { loggedIn, user };
};
