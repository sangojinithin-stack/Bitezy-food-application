import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  let registerLogics = (userdata) => {

    let users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    users.push(userdata);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration Successful");

    reset();

    navigate("/login");
  };

  return (

    <div className="register-page">

      <form
        onSubmit={handleSubmit(registerLogics)}
        className="register-box"
      >

        <h1 className="bitezy-title">
          Bitezy
        </h1>

        <h2>
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Enter Full Name"
          {...register("name", { required: true })}
        />

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: true })}
        />

        <input
          type="email"
          placeholder="Enter Email Address"
          {...register("email", { required: true })}
        />

        <input
          type="number"
          placeholder="Phone Number"
          {...register("phone", { required: true })}
        />

        <button type="submit">
          Register
        </button>

        <p className="switch-text">

          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="switch-link"
          >
            Login
          </span>

        </p>

      </form>

    </div>
  );
}

export default Register;