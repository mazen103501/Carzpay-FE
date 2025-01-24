import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    login(email, password).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="login-container bg-primary">
      <div className="box-container pt-10 px-14 pb-32">
        <div className="text-center text-darkGray">
          <div>
            <img className="m-auto" src="/logo.svg" alt="Logo" />
          </div>
          <div className="w-[512px]">
            <h1 className="font-medium text-3xl mt-4">Login to Account</h1>
            <p className="text-sm mt-4">
              Please enter your email and password to continue
            </p>
          </div>
          <form className="text-left" onSubmit={handleLogin}>
            <div className="mt-7">
              <div className="flex flex-col">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="border border-[#D8D8D8] p-4 rounded-lg bg-[#F1F4F9] mt-1"
                  placeholder="esteban_schiller@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-5">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border border-[#D8D8D8] p-4 rounded-lg bg-[#F1F4F9] mt-1"
                  placeholder="* * * * * *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-16 flex">
              <button
                className={`text-center bg-primary w-80 p-4 max-w-full rounded-lg text-white text-xl font-medium m-auto ${
                  loading && "loading-spinner"
                }`}
                type="submit"
                disabled={loading || !email || !password}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
