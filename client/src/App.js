import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/styles.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;