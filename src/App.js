import React, { useEffect, useState } from 'react'
import { UserContext } from './contexts/UserContext';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import axios from 'axios';
import Destinations from './components/Destinations/Destinations';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Form from './components/Form.js/Form';
import { DestinationsContext } from './contexts/DestinationsContext';
import UserDestinations from './pages/UserDestinations/UserDestinations';
import Home from './pages/Home/Home';
import GoogleMapPage from './pages/GoogleMapPage/GoogleMapPage';

function App() {
  const baseUrl = 'https://kommahem-c964735bdd3e.herokuapp.com'
  
  const [destinations, setDestinations] = useState([])
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return savedIsLoggedIn === 'true' ? true : false;
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <DestinationsContext.Provider value={{ destinations, setDestinations }}>
        <BrowserRouter>
          <Header baseUrl={baseUrl} />
          <Routes>
            {/* <Route path="/" element={<Destinations destinations={destinations} />} /> */}
            <Route index element={<Home />} />
            <Route path="/add-destination" element={<Form baseUrl={baseUrl} />} />
            <Route path="/my-destinations" element={<UserDestinations />} />
            <Route path="/googledestination" element={<GoogleMapPage /> } />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DestinationsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
