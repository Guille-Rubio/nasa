import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const LandingsCard = (props) => {

  const [showDetail, setShowDetail] = useState(false)

  const { id, name, year, geolocation, mass, date, fall, recclass, nametype } = props.data
  //const [params, setParams] = useSearchParams();

  const removeLanding = () => {
    axios({
      method: 'delete',
      url: "http://localhost:5000/api/astronomy/landings/delete",
      data: { id: id },
    })
    props.remove();
  }


  return <article className="landing-card">
    <h3>name: {name}</h3>
    {id ? <p>landing id#{id}</p> : ""}
    {year ? <p>date: {year}</p> : ""}
    {date ? <p>date: {date}</p> : ""}
    {mass ? <p>mass: {mass}</p> : ""}
    {showDetail ? <p>fall: {fall}</p> : ""}
    {showDetail ? <p>recclass: {recclass}</p> : ""}
    {showDetail ? <p>name type: {nametype}</p> : ""}
    {showDetail ? <p>geolocation: lat:{geolocation.latitude} lon: {geolocation.longitude} </p> : ""}
    {showDetail ? <button className="button1" onClick={() => setShowDetail(!showDetail)}>Hide details</button> : <button className="button1" onClick={() => setShowDetail(!showDetail)}>See details</button>}


    <button className="button1">Add to cart</button>
    {showDetail ? <Link to={`/landingsform/${id}`}><button className="button1">Edit landing</button></Link> : ""}
    {showDetail ? <button className="button1">Detail</button> : ""}
    {showDetail ? <button className="button1" onClick={removeLanding}>Remove landing</button> : ""}

  </article>;
};

export default LandingsCard;
