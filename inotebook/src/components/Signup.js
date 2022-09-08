import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;
    fetch("");
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect and save auth token
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully","success")
    } else {
      props.showAlert("Invalid Credentials","danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" class="form-label">
            Enter name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5}
            required
            
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
