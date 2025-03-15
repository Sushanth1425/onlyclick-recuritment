import React, { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "./AuthContext";
import {useNavigate} from "react-router-dom";

const Dashboard =() => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if (!storedUser||!storedUser.token) {
          setError("No user data found");
          setLoading(false);
          return;
        }
        const response = await axios.get("https://reqres.in/api/users/2");
        setUserData(response.data.data);
      } catch (err) {
        setError("Failed to load user data!");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);
  
  const handleLogout = () => {
    logout();
    setUserData(null)
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {loading && <p>Loading user data...</p>}
      {error && <p>{error}</p>}
      {userData&&(
        <div>
          <p>Welcome, {userData.first_name} {userData.last_name}!</p>
          <p>Email: {userData.email}</p>
          <img src={userData.avatar} alt="User Avatar" />
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Dashboard