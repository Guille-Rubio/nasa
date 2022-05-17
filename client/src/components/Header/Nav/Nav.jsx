import React, { useState } from "react";
import { Link } from 'react-router-dom'
import burger from '../../../assets/img/burger.png';

function Nav(props) {
  const [visible, setVisible] = useState("hidden")

  const open = () => {
    visible === "visible" ? setVisible("hidden") : setVisible("visible")
  }


  return <nav className="navbar">
    <img src={burger} className="burger" onClick={open} alt="burger icon"></img>
    <ul className={`${visible} navbar__list`}>
      <li><Link className="button1" to="/">Home</Link></li>
      <li><Link className="button1" to="/landings">Asteroids</Link></li>
      <li><Link className="button1" to="/neas">Neas</Link></li>
    </ul>
  </nav>;
}


export default Nav;
