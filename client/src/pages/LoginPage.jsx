import React, { useState } from "react";
import "./LoginPage.css";
import { ReactTyped } from "react-typed";

const LoginPage = () => {
  const [isRegActive, setIsRegActive] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    instituteName: "",
    location: "",
    email: "",
    mnemonic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegActive) {
      console.log("Registeration Info:", loginInfo);
    } else {
      console.log("Login Info:", loginInfo);
    }

    setLoginInfo({
      instituteName: "",
      location: "",
      email: "",
      mnemonic: "",
    });
  };

  const handleRegister = () => {
    setIsRegActive(true);
  };

  const handleLogin = () => {
    setIsRegActive(false);
  };

  return (
    <div className={`container ${isRegActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Institute Login</h1>
          <nospan>or use your email for registration</nospan>
          <input
            type="text"
            name="instituteName"
            value={loginInfo.instituteName}
            onChange={handleChange}
            placeholder="Institute Name"
          />
          <input
            type="text"
            name="location"
            value={loginInfo.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="mnemonic"
            value={loginInfo.mnemonic}
            onChange={handleChange}
            placeholder="Mnemonic"
          />
          <button>Login</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Student Login</h1>
          <nospan>or use your email password</nospan>
          <input
            type="text"
            name="instituteName"
            value={loginInfo.instituteName}
            onChange={handleChange}
            placeholder="Institute Name"
          />
          <input
            type="text"
            name="location"
            value={loginInfo.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="mnemonic"
            value={loginInfo.mnemonic}
            onChange={handleChange}
            placeholder="Mnemonic"
          />
          <a href="#">Forget Your Password?</a>
          <button onClick={handleLogin}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 className="text-4xl md:text-5xl font-bold">
            <div style={{ content: "Welcome Back!" }}>
              <ReactTyped
                className="text-white"
                strings={["Hola!", "Glad to see you!", "Welcome Back!"]}
                typeSpeed={80}
                loop
                backDelay={950}
                showCursor={true}
              />
            </div>
            </h1>
            <p>You are a Student?</p>
            <button
              className={isRegActive ? "" : "hidden"}
              id="login"
              onClick={handleLogin}
            >
              Click here
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            {/* <h1>Welcome Back!</h1> */}
            <h1 className="text-4xl md:text-5xl font-bold">
              <div style={{ content: "Welcome Back!" }}>
                <ReactTyped
                  className="text-white"
                  strings={["Hola!", "Glad to see you!", "Welcome Back!"]}
                  typeSpeed={80}
                  loop
                  backDelay={950}
                  showCursor={true}
                />
              </div>
            </h1>
            <p>You are an Institute?</p>
            <button
              onClick={handleRegister}
              className={!isRegActive ? "" : "hidden"}
              id="register"
            >
              Click here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
