import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext';
import './UserDestinations.css'

const UserDestinations = () => {
    const [destinations, setDestinations] = useState([])
    const { user, setUser } = useContext(UserContext)
    const baseUrl = 'https://kommahem-c964735bdd3e.herokuapp.com'

    // console.log(destinations)
    // console.log(user)
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

    const handleDelete = (destinationId) => {
        axios.delete(`${baseUrl}/destinations/${destinationId}`)
            .then(res => {
                console.log(res.data)
                setDestinations(destinations.filter(destination => destination.DestinationId !== destinationId));
            })
            .catch(err => console.log(err))
    }

    const handleEdit = () => { }


    return (
        <>
        <div className='destinations-container-user'>
            <p>UserDestinations.js</p>
            {destinations.length > 0 ? (
                destinations.map((destination) => {
                    return (
                        <div key={destination.DestinationId} className='destination-card-user'>
                            <p>UserDestinations map</p>
                            <img className='destination-img-user' src={destination.DestinationImage} alt="destination" />
                            <div className='destination-info-user'>
                                <p>{destination.DestinationTitle}</p>
                                <p>{destination.DestinationDescription}</p>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(destination.DestinationId)}>Delete</button>
                                <button>Edit</button>
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

export default UserDestinations