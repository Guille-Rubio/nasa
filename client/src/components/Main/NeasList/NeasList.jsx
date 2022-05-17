import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import NeasCard from "./NeasCard/NeasCard";
import { Scroll } from 'react-scroll-component';
import { scrollConfig } from '../../../utils/scroll_config';


function NeasList(props) {

  const [neas, setNeas] = useState([]);

  const removeNeas = (i) => {
    const remainingNeas = neas.filter((neas, j) => i !== j)
    setNeas(remainingNeas);
  }


  useEffect(() => {

    const fetchNeas = async () => {
      try {
        const request = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/astronomy/neas`);
        const response = await request.data;


        setNeas(response)
      } catch (error) {
        throw error
      }
    }
    fetchNeas()


  }, [])





  return <section className="neas-list">NeasList
    <h1 className="neas-list__h1">NeasList</h1>
    <Link to="/createneas"><button className="button1">Add new neas</button></Link>
    <Scroll {...scrollConfig}>
      <section className="neas-list__card-container">
        {neas.map((nea, i) => <NeasCard data={nea} remove={() => removeNeas(i)} />)}
      </section>
    </Scroll>

  </section>;
}

export default NeasList;
