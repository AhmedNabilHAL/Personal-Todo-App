import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth({ setUser }) {
    const [authMode, setAuthMode] = useState('signin');
    const navigate = useNavigate();

    const authRequest = async (raw, headers, path) => {
      var requestOptions = {
        credentials: "include",
        method: 'POST',
        headers: headers,
        body: raw,
      };

      return fetch(`http://localhost:8888/api/v1/${path}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    }

    const handleSignIn = async (evt) => {
      evt.preventDefault();

      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      var raw = JSON.stringify({"username": evt.target.username.value,"password": evt.target.password.value});
      authRequest(raw, headers, "login")
      .then(result => {
        setUser(result);
        navigate("/");
      })
      .catch(error => console.log('error', error));
    }

    const handleRegister = async (evt) => {
      evt.preventDefault();

      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      var raw = JSON.stringify({"username": evt.target.username.value,
      "email": evt.target.email.value,
      "password": evt.target.password.value,
      "role": "client"
    });

      authRequest(raw, headers, "users")
      .then(result => {
        setUser(result);
        navigate("/");
      })
      .catch(error => console.log('error', error));
    }

    if (authMode === 'signin'){
      return (
        <form className='bg-black bg-opacity-40 px-1 sm:px-4 py-4 flex flex-col justify-between
        h-[60vh] rounded-lg' onSubmit={handleSignIn} >
          <div className="text-center">
            Not registered yet?{" "}
            <span className="hover:cursor-pointer" onClick={() => setAuthMode('register')}>
              Sign Up
            </span>
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
            <label>Username</label>
            <input
              type="username"
              name="username"
              className='flex-1 w-full text-sm sm:text-base md:text-lg lg:text-2xl bg-black p-1 md:p-2
              bg-opacity-40 placeholder:text-gray-400 placeholder:italic overflow-hidden resize-none
              focus:bg-black focus:bg-opacity-60 outline-none'
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className='flex-1 w-full text-sm sm:text-base md:text-lg lg:text-2xl bg-black p-1 md:p-2
              bg-opacity-40 placeholder:text-gray-400 placeholder:italic overflow-hidden resize-none
              focus:bg-black focus:bg-opacity-60 outline-none'
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="/#">password?</a>
          </p>
        </form>
      );
    }

    return (    
        <form className='bg-black bg-opacity-40 px-1 sm:px-4 py-4 flex flex-col justify-between
        rounded-lg' onSubmit={handleRegister} >
          <div className="text-center">
              Already registered?{" "}
              <span className="hover:cursor-pointer" onClick={()=>setAuthMode('signin')}>
                  Sign In
              </span>
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
              <label>Username</label>
              <input
              type="username"
              name="username"
              className='flex-1 w-full text-sm sm:text-base md:text-lg lg:text-2xl bg-black p-1 md:p-2
              bg-opacity-40 placeholder:text-gray-400 placeholder:italic overflow-hidden resize-none
              focus:bg-black focus:bg-opacity-60 outline-none'
              placeholder="e.g Jane Doe"
              />
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
              <label>Email address</label>
              <input
              type="email"
              name="email"
              className='flex-1 w-full text-sm sm:text-base md:text-lg lg:text-2xl bg-black p-1 md:p-2
              bg-opacity-40 placeholder:text-gray-400 placeholder:italic overflow-hidden resize-none
              focus:bg-black focus:bg-opacity-60 outline-none'
              placeholder="Email Address"
              />
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
              <label>Password</label>
              <input
              type="password"
              name="password"
              className='flex-1 w-full text-sm sm:text-base md:text-lg lg:text-2xl bg-black p-1 md:p-2
              bg-opacity-40 placeholder:text-gray-400 placeholder:italic overflow-hidden resize-none
              focus:bg-black focus:bg-opacity-60 outline-none'
              placeholder="Password"
              />
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
              <button type="submit" className="btn btn-primary">
                  Submit
              </button>
          </div>
          <p className="text-center mt-2">
              Forgot <a href="/#">password?</a>
          </p>
        </form>
    );
}

export default Auth;