import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import Pagination from "./Pagination/Pagination";



function LandingsList(props) {

    const [landings, setLandings] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterSelector, setFilterSelector] = useState("class");
    const [soughtLanding, setSoughtLanding] = useState({})

    const from = useRef()
    const to = useRef()
    const landingNameForSearch = useRef()
    const selector = useRef("mass");

    const position = [40.4168, -3.7038];

    /* const rockIcon = {
        iconUrl: '../../../../assets/img/rock.png',
        shadowUrl: null,
        iconSize: [38, 95], 
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [0,0],  // the same for the shadow
        popupAnchor: [-3, -76]
    } */

    useEffect(() => {

        const fetchLandings = async () => {
            try {
                const request = await axios.get(`/api/astronomy/landings/${filter}`);
                const response = await request.data;

                const locatedLandings = response.filter(landing => landing.geolocation !== "")

                const landingsCoordinates = locatedLandings.map(landing => landing.geolocation ? [landing.geolocation.latitude, landing.geolocation.longitude] : [0, 0])
                setCoordinates(landingsCoordinates)
                setLandings(response)
            } catch (error) {
                throw error
            }
        }
        fetchLandings()

    }, [filter])


    useEffect(() => {



    }, [soughtLanding])


    const handleClass = (event) => {
        event.preventDefault();

        if (!event.target.value) {
            return
        }

        setFilter(`class/${event.target.value}`)
    }

    const handleMass = (event) => {
        event.preventDefault();
        if (!event.target.value) {
            return
        }

        setFilter(`mass/${event.target.value}`)
    }

    const handleDate = (event) => {
        event.preventDefault();

        setFilter(`?from=${from.current.value}&to=${to.current.value}`)
    }


    const handleSearchLandingByName = async (event) => {
        event.preventDefault();
        const params = landingNameForSearch.current.value;
        try {


            //Capitalize params to prevent request errors
            const request = await axios({
                url: `/api/astronomy/landings/name/${params}`,
                method: 'get'
            })
            const response = await request.data[0];
            if (response !== undefined) {
                setSoughtLanding(response)
                setTimeout(() => { setSoughtLanding({}) }, 5000)
            } else {
                setSoughtLanding("n/a")
                setTimeout(() => { setSoughtLanding({}) }, 3000)
            }
        } catch (error) {
            throw error;
        }
    }



    const removeLanding = (i, id) => {
        try {
            axios({
                url: `/api/astronomy/landings/delete`,
                method: 'delete',
                data: { id: id },
                headers: {//SORT OUT CORS TO FIX IT

                }
            })
        } catch (error) {
            throw error
        }
        const remainingLandings = landings.filter((landing, j) => i !== j)
        setLandings(remainingLandings);
    }

    const selectFilter = (event) => {
        const filterSelectorValue = selector.current.value;
        setFilterSelector(filterSelectorValue);
    }



    return (<div className="landing-list">

        <section>
            <h2>Find the landings registered by the NASA</h2>
            <select className="input__field" name="selector" id="selector" defaultValue="class" ref={selector} onChange={selectFilter}>
                <option value="class">Class</option>
                <option value="mass">Mass</option>
                <option value="dates">Dates</option>
                {/* <option value="name">Name</option> */}
            </select>
        </section>

        <section className="landing-list__form-container">
            <form>
                {filterSelector === "class" ?
                    <div className="input__group">
                        <label className="input__label" htmlFor="class">class</label>
                        <select className="input__field" type="text" name="class" placeholder="class" id="class" onChange={handleClass} >
                            <option value="Acapulcoite">Acapulcoite</option>
                            <option value="Angrite">Angrite</option>
                            <option value="Aubrite">Aubrite</option>
                            <option value="C2-ung">C2-ung</option>
                            <option value="CI1">CI1</option>
                            <option value="CM2">CM2</option>
                            <option value="CO3.3">CO3.3</option>
                            <option value="CR2-an">CR2-an</option>
                            <option value="CV3">CV3</option>
                            <option value="Diogenite-pm">Diogenite-pm</option>
                            <option value="EH3/4-an">EH3/4-an</option>
                            <option value="EH4">EH4</option>
                            <option value="Eucrite-mmict">Eucrite-mmict</option>
                            <option value="H">H</option>
                            <option value="H3">H3</option>
                            <option value="H3-5">H3-5</option>
                            <option value="H3.7">H3.7</option>
                            <option value="H4">H4</option>
                            <option value="H5">H5</option>
                            <option value="H5-6">H5-6</option>
                            <option value="H6">H6</option>
                            <option value="Howardite">Howardite</option>
                            <option value="Iron, IAB-sLL">Iron, IAB-sLL</option>
                            <option value="Iron, IIAB">Iron, IIAB</option>
                            <option value="Iron, IIE">Iron, IIE</option>
                            <option value="Iron, IIIAB">Iron, IIIAB</option>
                            <option value="Iron, IVA">Iron, IVA</option>
                            <option value="Iron, ungrouped">Iron, ungrouped</option>
                            <option value="L">L</option>
                            <option value="L/LL4">L/LL4</option>
                            <option value="L/LL5">L/LL5</option>
                            <option value="L3">L3</option>
                            <option value="L4">L4</option>
                            <option value="L5">L5</option>
                            <option value="L6">L6</option>
                            <option value="LL3-6">LL3-6</option>
                            <option value="LL5">LL5</option>
                            <option value="LL6">LL6</option>
                            <option value="Mesosiderite-A3/4">Mesosiderite-A3/4</option>
                            <option value="OC">OC</option>
                            <option value="Stone-uncl">Stone-uncl</option>
                            <option value="Unknown">Unknown</option>
                            <option value="Ureilite-an">Ureilite-an</option>
                        </select>
                    </div>

                    : ""}
                {filterSelector === "mass" ?
                    <div className="input__group">
                        <label className="input__label" htmlFor="mass">mass</label>
                        <input className="input__field" type="text" name="mass" placeholder="mass" onChange={handleMass} />
                    </div>
                    : ""}
                {filterSelector === "dates" ?
                    <>
                        <div className="input__group">
                            <label className="input__label" htmlFor="from">date from</label>
                            <input className="input__field" type="text" name="from" placeholder="date from" ref={from} />
                        </div>
                        <div className="input__group">
                            <label className="input__label" htmlFor="to">date to</label>
                            <input className="input__field" type="text" name="to" placeholder="date to" ref={to} />
                            <button className="button1" onClick={handleDate}>Search by date</button>
                        </div>
                    </> : ""}




            </form>
            <div>
                {landings ? <p>{landings.length} landings displayed </p> : ""}
            </div>


        </section>
        {coordinates.length !== 0 ? <>
            <section>
                <div className="map" id="map">

                    <MapContainer
                        center={position} zoom={2} /* scrollWheelZoom={true} */ >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {coordinates ? coordinates.map(location => <Marker position={location} key={uuidV4()}></Marker>) : ""}

                    </MapContainer>
                </div>
            </section>

            <Pagination remove={removeLanding} landings={landings} />
        </> : ""}
        <section className="landings-list__search-by-name-section">

            <form className="landings-list__search-by-name-form" onSubmit={handleSearchLandingByName}>
                <div className="input__group">
                    <label className="input__label" htmlFor="search">search your landing by name</label>
                    <input className="input__field" type="text" name="search" placeholder="landing name" ref={landingNameForSearch} />
                    {soughtLanding === "n/a" ? <p>No saved landing under {landingNameForSearch.current.value}</p> : ""}
                </div>

                <button className="button1">Search landing</button>
            </form>
            <div>
                <Link to="/landingsform"><button className="button1">Add new landing</button></Link>
            </div>

            {soughtLanding.name ? <>
                <article className="landing-list__landing-card">
                    <h3>{soughtLanding.name}</h3>
                    <p>landing id#{soughtLanding.id}</p>
                    <p>date: {soughtLanding.year}</p>
                    <p>date: {soughtLanding.date}</p>
                    <p>mass: {soughtLanding.mass}</p>
                    <p>fall: {soughtLanding.fall}</p>
                    <p>name type: {soughtLanding.nametype}</p>
                    <p>recclass: {soughtLanding.recclass}</p>
                    <p>geolocation: lat:{soughtLanding.reclat} lon: {soughtLanding.reclon} </p>
                    <div className="map2" id="map">

                        <MapContainer
                            center={[soughtLanding.geolocation.latitude, soughtLanding.geolocation.longitude]} zoom={5} scrollWheelZoom={true} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={[soughtLanding.geolocation.latitude, soughtLanding.geolocation.longitude]}></Marker>

                        </MapContainer>
                    </div>
                </article> </> : ""}

        </section>





    </div >)
}

export default LandingsList;