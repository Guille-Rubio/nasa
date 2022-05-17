import React, { useState } from "react";
import axios from 'axios';
import { Scroll } from 'react-scroll-component';
import { scrollConfig } from '../../../utils/scroll_config';

function NeasForm(props) {

  const [designation, setDesignation] = useState("")
  const [discovery_date, setDiscovery_date] = useState("")
  const [h_mag, setH_mag] = useState("")
  const [moid_au, setMoid_au] = useState("")
  const [q_au_1, setQ_au_1] = useState("")
  const [q_au_2, setQ_au_2] = useState("")
  const [period_yr, setPeriod_yr] = useState("")
  const [i_deg, setI_deg] = useState("")
  const [pha, setPha] = useState("")
  const [orbit_class, setOrbit_class] = useState("")


  const handleDesignation = (event) => setDesignation(event.target.value)
  const handleDiscovery_date = (event) => setDiscovery_date(event.target.value)
  const handleH_mag = (event) => setH_mag(event.target.value);
  const handleMoid_au = (event) => setMoid_au(event.target.value);
  const handleQ_au_1 = (event) => setQ_au_1(event.target.value);
  const handleQ_au_2 = (event) => setQ_au_2(event.target.value);
  const handlePeriod_yr = (event) => setPeriod_yr(event.target.value);
  const handleI_deg = (event) => setI_deg(event.target.value);
  const handlePha = (event) => setPha(event.target.value);
  const handleOrbit_class = (event) => setOrbit_class(event.target.value);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/api/astronomy/neas/create`,
        data: {
          designation: designation,
          discovery_date: discovery_date,
          h_mag: h_mag,
          moid_au: moid_au,
          q_au_1: q_au_1,
          q_au_2: q_au_2,
          period_yr: period_yr,
          i_deg: i_deg,
          pha: pha,
          orbit_class: orbit_class
        }
      })

      setDesignation("")
      setDiscovery_date("")
      setH_mag("");
      setMoid_au("");
      setQ_au_1("");
      setQ_au_2("");
      setPeriod_yr("");
      setI_deg("");
      setPha("");
      setOrbit_class("");
      alert(`Se ha añadido ${designation} a la base de datos`)

    } catch (err) {
      console.log(err)
    }
  }

  return <section className="neas-form">
    <h1 className="neas-form__h1">Add your near Earth Asteroid</h1>
    <Scroll {...scrollConfig}>
      <form className="neas-form__form" onSubmit={handleSubmit}>

        <div className="input__group">
          <label className="input__label" htmlFor="designation">designation</label>
          <input className="input__field" type="text" name="designation" placeholder="designation" id="designation" value={designation} onChange={handleDesignation} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="discovery_date">discovery date</label>
          <input className="input__field" type="text" name="discovery_date" placeholder="discovery_date" id="discovery_date" value={discovery_date} onChange={handleDiscovery_date} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="h_mag">h_mag</label>
          <input className="input__field" type="text" name="h_mag" placeholder="h_mag" id="h_mag" value={h_mag} onChange={handleH_mag} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="moid_au">moid_au</label>
          <input className="input__field" type="text" name="moid_au" placeholder="moid_au" id="moid_au" value={moid_au} onChange={handleMoid_au} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="q_au_1">q_au_1</label>
          <input className="input__field" type="text" name="q_au_1" placeholder="q_au_1" id="q_au_1" value={q_au_1} onChange={handleQ_au_1} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="q_au_2">q_au_2</label>
          <input className="input__field" type="text" name="q_au_2" placeholder="q_au_2" id="q_au_2" value={q_au_2} onChange={handleQ_au_2} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="period_yr">period_yr</label>
          <input className="input__field" type="text" name="period_yr" placeholder="period_yr" id="period_yr" value={period_yr} onChange={handlePeriod_yr} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="i_deg">i_deg</label>
          <input className="input__field" type="text" name="i_deg" placeholder="i_deg" id="i_deg" value={i_deg} onChange={handleI_deg} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="pha">pha</label>
          <input className="input__field" type="text" name="pha" placeholder="pha" id="pha" value={pha} onChange={handlePha} />
        </div>
        <div className="input__group">
          <label className="input__label" htmlFor="orbit_class">orbit_class</label>
          <input className="input__field" type="text" name="orbit_class" placeholder="orbit_class" id="orbit_class" value={orbit_class} onChange={handleOrbit_class} />
        </div>
        <div>
          <button className="button1" type="submit">Añadir/editar</button>
        </div>
      </form>

    </Scroll>
  </section>;
}

export default NeasForm;

