import React, { useState } from "react";
import { Link } from 'react-router-dom';
import cart from '../../../assets/img/cart.jpg';
import axios from "axios";
import { baseUrl } from "../../../utils/base_url";
import userIcon from '../../../assets/img/userIcon.svg';



const User = () => {

  const [user, setUser] = useState("");
  const [userMode, setUserMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [password2, setPassword2] = useState("");
  const [showUserUi, setShowUserUi] = useState(false);

  const handleSignUp = async (event) => {
    if (password === password2) {
      event.preventDefault();
      console.log(email, password);
      try {
        const request = await axios({
          url: `${baseUrl}/users/signup`,
          method: 'post',
          data: {
            email: email,
            password: password
          }
        })
        alert(`new user ${email} registered`);
        console.log(request);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("passwords don't match");
      //add login function
    }
    //SET ACTIVE USER WITH REDUX

    setUserMode("logged");
    setUser(email);
    setEmail("");
    setPassWord("");
    setPassword2("");
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const request = await axios({
        url: `${baseUrl}/users/login`,
        method: 'post',
        /*  withCredentials:true, */
        data: {
          email: email,
          password: password
        }
      })

      const response = await request.data;
      console.log("response", response);
      setUserMode("logged");
      setUser(email);
      setEmail("");
      setPassWord("");
    } catch (error) {
      console.log(error);

    }

    //SET ACTIVE USER WITH REDUX

  }

  const handleLogout = () => {
    setUser("");
    setPassWord("");
    /* axios({
      url:'http://localhost:5000/users/logout',
      method:'get'
    }) */
    //EMPTY ACTIVE USER WITH REDUX
    setUserMode("login");
  }

  const setSignUpMode = () => {
    setUserMode("signup")
  }

  const setLogInMode = () => {
    setUserMode("login")
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassWord(event.target.value)
  }

  const handlePassword2 = (event) => {
    setPassword2(event.target.value)
  }

  const handleUserUi = () => {
    setShowUserUi(!showUserUi);
  }


  return <div className="user">
    {userMode !== "logged" ? <img className="user__user-icon" src={userIcon} alt="user" onClick={handleUserUi} /> : ""}

    {showUserUi ? <>
      {userMode === "signup" ? <>
        <form className="user__form" onSubmit={handleSignUp}>
          <div className="user__input-box">
            <input type="text" placeholder="email" name="email" onChange={handleEmail} />
            <input type="password" placeholder="password" name="password" onChange={handlePassword} />
            <input type="password" placeholder="confirm password" name="password2" onChange={handlePassword2} />
          </div>
          <div className="user__buttons-box">
            <button className="header__button-container button1" type="submit" value="submit">signup</button>
            <button className="header__button-container button1" onClick={setLogInMode}>login</button>
          </div>

        </form>
      </> : ""}

      {userMode === "login" ? <>
        <form className="user__form" onSubmit={handleLogin}>
          <div className="user__input-box">
            <input type="text" placeholder="email" name="email" onChange={handleEmail} />
            <input type="password" placeholder="password" name="password" onChange={handlePassword} />
          </div>
          <div className="user__buttons-box">
            <button className="header__button-container button1" type="submit">login</button>
            <button className="header__button-container button1" onClick={setSignUpMode}>signup</button>
          </div>
        </form>
      </> : ""}

      {userMode === "logged" ? <>
        <section className="user__form">
          <p>{user}</p>
          <button className="header__button-container button1" onClick={handleLogout}>logout</button>

          <Link to="/cart"><img className="cart-icon" src={cart} alt="cart" /></Link>
        </section>
      </> : ""}
    </> : ""}

  </div>;
};

export default User;
