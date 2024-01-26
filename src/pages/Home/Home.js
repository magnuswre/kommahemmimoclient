import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'

const Home = () => {
    const baseUrl = 'https://kommahem-c964735bdd3e.herokuapp.com'
    const [destinations, setDestinations] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/destinations`)
          .then(res => {
            console.log(res.data)
            setDestinations(res.data)
          })
          .catch(err => console.log(err))
      }, [])

      return (
        <>
        <div className='destinations-container-home'>
           
            {destinations.length > 0 ? (
                destinations.map((destination) => {
                    return (
                        <div key={destination.id} className='destination-card-home'>
                            <p> Home Destinations map</p>
                            <img className='destination-img-home' src={destination.imageUrl} alt="destination" />
                            <div className='destination-info-home'>
                                <p>{destination.title}</p>
                                <p>{destination.description}</p>
                            </div>
                           
                        </div>
                    )
                })
            ) : (
                <p>No destinations found.</p>
            )}
        </div>
    </>
    )
}

export default Home