import React from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import "./Login.css";

function Login() {

  let {
    register,
    handleSubmit,
    reset
  } = useForm();

  let navigate = useNavigate();

  let loginLogics = (loginData) => {

    const registeredUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const validUser =
      registeredUsers.find(
        (user) =>
          user.email === loginData.email &&
          user.password === loginData.password
      );

    if (validUser) {

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(validUser)
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${validUser.name}`,
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {

        navigate("/");

        window.location.reload();

      }, 2000);

    }

    else {

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid Email or Password",
      });

    }

    reset();
  };

  return (

    <div className="login-page">

      <form
        onSubmit={handleSubmit(loginLogics)}
        className="login-box"
      >

        <h1 className="bitezy-title">
          Bitezy
        </h1>

        <h2>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <button type="submit">
          Login
        </button>

        <p className="switch-text">

          Don't have an account?

          <span
            onClick={() => navigate("/register")}
            className="switch-link"
          >
            Register Now
          </span>

        </p>

      </form>

    </div>
  );
}

export default Login;