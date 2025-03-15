import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const USER_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;

  const {login} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail]= useState("");
  const [emailValid, setEmailValid]= useState(false);
  const [pwd, setPwd]= useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(()=>{
    setEmailValid(USER_REGEX.test(email))
  },[email])

  useEffect(()=>{
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd===matchPwd)
  },[pwd, matchPwd])

  useEffect(()=>{
    setErrMsg('')
  },[email, pwd, matchPwd])
 
  const handleSubmit= async (e) => {
    e.preventDefault();
    if (!emailValid) {
      setErrMsg('enter a valid email address');
      return;
    }
    if (!validPwd) {
      setErrMsg('try a strong password');
      return;
    } 
    if (!validMatch) {
      setErrMsg('passwords do not match');
      return;
    }
    
    try {
      const response= await axios.post("https://reqres.in/api/register", {username, email, password: pwd })
      login(response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/dashboard")
    } catch(error) {
      setErrMsg(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sign Up</h2>
      {errMsg && <div className="text-red-500 text-sm">{errMsg}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 mt-4">
        <div>
          <label className="block text-gray-800 dark:text-gray-200">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-800 dark:text-gray-200">
            Enter your Mail id:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="pwd" className="block text-gray-800 dark:text-gray-200">
            Enter your password
          </label>
          <input
            type="password"
            id="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="rePwd" className="block text-gray-800 dark:text-gray-200">
            Retype your password
          </label>
          <input
            type="password"
            id="rePwd"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {!validMatch && <p className="text-red-500">Passwords do not match!</p>}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup;