import React, { useState } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!username||!pwd){
      setError("all fields are required!!");
      return;
    }
    try {
      const response= await axios.post("https://reqres.in/api/login", {username: username.trim(), password: pwd} );
      login(response.data.token)
      sessionStorage.setItem("user", JSON.stringify(response.data))
      navigate("/dashboard")
    } 
    catch (err) {
      setError(err.response?.data?.message|| "invalid cred!!")
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      {error&& <p style={{ color: "red" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </div>
        <button type="submit"> Login </button>
      </form>
      <p>uname: eve.holt@reqres.in  <br /> pwd: pistol  or  cityslicka</p>
    </div>
  );
};

export default Login;
