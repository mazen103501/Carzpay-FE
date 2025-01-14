import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add authentication logic here
    navigate("/dashboard");
  };

  return (
    <div className="login-container bg-primary">
      <div className="box-container pt-10 px-14 pb-32">
        <div className="text-center text-darkGray">
          <div>
            <img className="m-auto" src="/logo.svg" />
          </div>
          <div className="w-[512px]">
            <h1 className="font-medium text-3xl mt-4">Login to Account</h1>
            <p className="text-sm mt-4">
              Please enter your email and password to continue
            </p>
          </div>
          <form className="text-left">
            <div className="mt-7">
              <div className="flex flex-col">
                <label for="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="border border-[#D8D8D8] p-4 rounded-lg bg-[#F1F4F9] mt-1"
                  placeholder="esteban_schiller@gmail.com"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border border-[#D8D8D8] p-4 rounded-lg bg-[#F1F4F9] mt-1"
                  placeholder="* * * * * *"
                />
              </div>
            </div>
            <div className="mt-16 flex">
              <button
                className="text-center bg-primary w-80 p-4 max-w-full rounded-lg text-white text-xl font-medium m-auto"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  );
}

export default Login;
