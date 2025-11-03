import React, { useEffect } from "react";
import NavBar from "./Header/NavBar";
import Footer from "./Footer/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    if (location.pathname === "/login") return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      const status = error.response?.status;
      if (status === 401) {
        navigate("/login");
        return;
      }
      console.error("Failed to fetch profile:", error.message || error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
