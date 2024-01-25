import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DestinationsContext } from '../../contexts/DestinationsContext';
import { UserContext } from '../../contexts/UserContext';

const UserDestinations = () => {
    // const { destinations, setDestinations } = useContext(DestinationsContext)
   

    const [destinations, setDestinations] = useState([])
    const { user, setUser } = useContext(UserContext)
    const baseUrl = 'https://kommahem-c964735bdd3e.herokuapp.com'


    console.log(destinations)
    console.log(user)
    useEffect(() => {
        if (user && user.id) {
            axios.get(`${baseUrl}/users/${user.id}/destinations`)
                .then(res => {
                    console.log(res.data)
                    setDestinations(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [user]);


    return (
        <>
            {destinations.map((destination) => {
                return ( 
                <div key={destination.DestinationId}>
                    <p>{destination.DestinationTitle}</p>
                    <p>{destination.DestinationDescription}</p>
                    {/* <img src={destination.UserImage} alt={destination.UserImage} /> */}
                    </div>
                )
            })}
        </>
    )
}

export default UserDestinations