import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import GetAllUsers from "../components/GetAllUsers";
import BusinessUnits from "../components/BusinessUnits";
import Clients from "../components/Clients";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div className="bg-gray-800">
    <Layout>
      <GetAllUsers />
      <BusinessUnits />
     <Clients /> 
    </Layout>
    </div>
  );
};

export default Dashboard;