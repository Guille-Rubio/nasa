import React from "react";
import axios from "axios";
import { baseUrl } from "../../../../utils/base_url";


const NeasCard = (props) => {
const {designation, discovery_date,h_mag, i_deg, moid_au, orbit_class, period_yr, pha, q_au_1, q_au_2 }= props.data

const removeNea = () => {
    axios({
      method:'delete',
      url:`${baseUrl}/api/astronomy/neas/delete`,
      data:{designation:designation},
    })
    props.remove();
}

  return <div className="neas-card">
    <p>Designation: {designation}</p>
    <p>Discovery date: {discovery_date}</p>
    <p>Absolute magnitude: {h_mag}</p>
    <p>Degrees: {i_deg}</p>
    <p>Minimum orbit intersection distance: {moid_au}</p>
    <p>Orbit class: {orbit_class}</p>
    <p>Period year: {period_yr}</p>
    <p>Potentially hazardous asteroid:{pha}</p>
    <p>Astronomic units 1: {q_au_1}</p>
    <p>Astronomic units 2: {q_au_2}</p>
    <button className="button1" onClick={removeNea}>Borrar</button>
    <button className="button1">Añadir a carrito</button>
  </div>;
  
};

export default NeasCard;
