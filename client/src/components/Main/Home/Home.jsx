import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home(props) {

  const [apod, setApod] = useState();

  useEffect(() => {
    async function getApod() {
      try {
        const request = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const picture = await request.data.hdurl||request.data.url;
        setApod(picture)
      } catch (err) {
        throw err
      }
    }
    getApod()
  }, [])


  return <section className='home'>
    <div  className="home__nasa-image" style={{ 
      backgroundImage: `url(${apod})`,
      backgroundSize:"cover",backgroundPosition: "center"
    }}>
      <h1>Welcome to the NASA app</h1>
  
      <div className="home__button-container">
      <Link to="/landings"><button className="button1">Asteroids</button></Link>
      <Link to="/neas"><button className="button1">Neas</button></Link>
      </div>
    </div>
  </section>
;
}

export default Home;
