import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { initAuth } from "../store/slices/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    dispatch(initAuth());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
