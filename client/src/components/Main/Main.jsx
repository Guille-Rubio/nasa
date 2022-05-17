import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import LandingsForm from './LandingsForm/LandingsForm';
import Landings from './Landings/Landings';
import NeasForm from './NeasForm/NeasForm';
import NeasList from './NeasList/NeasList';
import Cart from "./Cart/Cart";


function Main(props) {

  return <main className="main">

    <Routes>
        <Route element={<Home />} path="/"/>
        <Route element={<LandingsForm/>} path="/landingsform/:paramsId"/>
        <Route element={<LandingsForm/>} path="/landingsform"/>
        <Route element={<Landings />} path="/landings"/>
        <Route element={<NeasForm />} path="/createneas"/>
        <Route element={<NeasList />} path="/neas"/>
        <Route element={<Cart />} path="/cart"/>
    </Routes>
  </main>;
}


export default Main;
