import React, { useState } from 'react';

function Auth() {
    const [authMode, setAuthMode] = useState('signin');
    console.log(authMode)
    if (authMode === 'signin'){
      return (
        <form className='bg-black bg-opacity-40 px-1 sm:px-4 py-4 flex flex-col justify-between
        h-[60vh] rounded-lg'>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="hover:cursor-pointer" onClick={() => setAuthMode('register')}>
              Sign Up
            </span>
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="rounded-sm mt-1 w-full h-4 sm:h-6 md:h-8 lg:h-10"
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
            <label>Password</label>
            <input
              type="password"
              className="rounded-sm mt-1 w-full h-4 sm:h-6 md:h-8 lg:h-10"
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
        rounded-lg'>
          <div className="text-center">
              Already registered?{" "}
              <span className="hover:cursor-pointer" onClick={()=>setAuthMode('signin')}>
                  Sign In
              </span>
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
              <label>Full Name</label>
              <input
              type="email"
              className="rounded-sm mt-1 w-full h-4 sm:h-6 md:h-8 lg:h-10"
              placeholder="e.g Jane Doe"
              />
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
              <label>Email address</label>
              <input
              type="email"
              className="rounded-sm mt-1 w-full h-4 sm:h-6 md:h-8 lg:h-10"
              placeholder="Email Address"
              />
          </div>
          <div className="flex flex-col items-start w-1/2 mx-auto mt-3">
              <label>Password</label>
              <input
              type="password"
              className="rounded-sm mt-1 w-full h-4 sm:h-6 md:h-8 lg:h-10"
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