import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from 'uuid';
import LandingsCard from '../LandingsCard/LandingsCard';
import { Scroll } from 'react-scroll-component';
import { scrollConfig } from '../../../../../utils/scroll_config';
import { sortNameArrayAscendent, sortMassArrayAscendent, sortDateArrayAscendent, sortNameArrayDescendent, sortMassArrayDescendent, sortDateArrayDescendent } from "../../../../../utils/sort_array_of_objects";


const Pagination = (props) => {

  const [landings, setLandings] = useState(props.landings)//recibe landings como props
  const totalPagesForLandings = Math.ceil(landings.length / 10) //crea un número de páginas para los landings recibidos//este numero lo debe importar del meta de la bbdd
  const [activePage, setActivePage] = useState(1);//establece la página activa
  const [landingsToDisplay, setLandingsToDisplay] = useState([]);//contiene los landings que se muestran en la página activa
  const [nameOrder, setNameOrder] = useState("");
  const [massOrder, setMassOrder] = useState("");
  const [dateOrder, setDateOrder] = useState("")


  useEffect(() => {
    setLandings(props.landings);
    setLandingsToDisplay(landings.slice((activePage * 10) - 10, activePage * 10));
    // eslint-disable-next-line
  }, [])

  useEffect(() => {//actualiza el estado landings cada vez que se modifican los landings del padre
    setLandings(props.landings)
  }, [props.landings])

  useEffect(() => {//actualiza los landings to display cada vez que se actualizan los landings
    setLandingsToDisplay(landings.slice((activePage * 10) - 10, activePage * 10))
    // eslint-disable-next-line
  }, [landings])


  useEffect(() => {//Actualiza los landings a mostrar cada vez que se cambia de pagina
    setLandingsToDisplay(landings.slice((activePage * 10) - 10, activePage * 10))
    // eslint-disable-next-line
  }, [activePage])


  const handlePrevious = () => activePage !== 1 ? setActivePage(activePage - 1) : "";

  const handleNext = () => {
    if (activePage === totalPagesForLandings) {

    } else {
      setActivePage(activePage + 1);
    }
  }

  const handleNameOrder = () => {
    if (nameOrder === "descendent") {
      setLandingsToDisplay(landingsToDisplay.sort(sortNameArrayAscendent))
      setNameOrder("ascendent")
      setDateOrder("")
      setMassOrder("")
    } else if (nameOrder === "ascendent") {
      setLandingsToDisplay(landingsToDisplay.sort(sortNameArrayDescendent))
      setNameOrder("descendent")
      setDateOrder("")
      setMassOrder("")
    } else {
      setLandingsToDisplay(landingsToDisplay.sort(sortNameArrayAscendent))
      setNameOrder("ascendent")
      setDateOrder("")
      setMassOrder("")
    }
  }

  const handleMassOrder = () => {
    if (massOrder === "descendant") {
      setLandingsToDisplay(landingsToDisplay.sort(sortMassArrayAscendent))
      setMassOrder("ascendent")
      setDateOrder("")
      setNameOrder("")
    } else if (massOrder === "ascendent") {
      setLandingsToDisplay(landingsToDisplay.sort(sortMassArrayDescendent))
      setMassOrder("descendent")
      setDateOrder("")
      setNameOrder("")
    } else {
      setLandingsToDisplay(landingsToDisplay.sort(sortMassArrayAscendent))
      setMassOrder("ascendent")
      setDateOrder("")
      setNameOrder("")
    }
  }

  const handleDateOrder = () => {
    if (dateOrder === "descendent") {
      setLandingsToDisplay(landingsToDisplay.sort(sortDateArrayAscendent));
      setDateOrder("ascendent");
      setNameOrder("")
      setMassOrder("")
    } else if (dateOrder === "ascendent") {
      setLandingsToDisplay(landingsToDisplay.sort(sortDateArrayDescendent));
      setDateOrder("descendent");
      setNameOrder("")
      setMassOrder("")
    } else {
      setLandingsToDisplay(landingsToDisplay.sort(sortDateArrayAscendent));
      setDateOrder("ascendent");
      setNameOrder("")
      setMassOrder("")
    }
  }

  //Comprobar remove landing
  //iluminar numero de pagina activa


  return <section className="pagination">
    {landingsToDisplay.length !== 0 ? <>
      <h1>order your landings</h1>
      <section className="pagination__button-box__filters">
        <button className="button1" onClick={handleNameOrder}>By name {nameOrder}</button>
        <button className="button1" onClick={handleDateOrder}>By date {dateOrder}</button>
        <button className="button1" onClick={handleMassOrder}>By mass {massOrder}</button>
      </section>
      <section className="page-box-container">
        {activePage > 1 ? <button className="button1" onClick={handlePrevious}>Previous</button> : ""}
        {landings.map((landings, i) => i % 10 === 0 ? <div className="page-box" key={uuidV4()}>{(i / 10) + 1}</div> : "")}
        {activePage < totalPagesForLandings ? <button className="button1" onClick={handleNext}>Next</button> : ""}
      </section>

      <Scroll {...scrollConfig}>

        <section className="pagination__page">
          {landings/* .length > 0  */ ? landingsToDisplay.map((landing, i) => <LandingsCard className="landings-card" data={landing} key={uuidV4()} remove={() => props.remove(i, landing.id)} />) : ""}
        </section>

      </Scroll>

      <section className="page-box-container">
        {activePage > 1 ? <button className="button1" onClick={handlePrevious}>Previous</button> : ""}
        {landings.map((landings, i) => i % 10 === 0 ? <div className="page-box" key={uuidV4()}>{(i / 10) + 1}</div> : "")}
        {activePage < totalPagesForLandings ? <button className="button1" onClick={handleNext}>Next</button> : ""}
      </section>
    </> : ""}
  </section>;

};

export default Pagination;
