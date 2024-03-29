import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import './form.css'
import { UserContext } from '../../contexts/UserContext';
import { DestinationsContext } from '../../contexts/DestinationsContext';
import { useNavigate } from 'react-router-dom';


export default function Form({ baseUrl }) {

     const [formVisible, setFormVisible] = useState(true); // add this line
     const navigate = useNavigate()
     const [title, setTitle] = useState('')
     const [description, setDescription] = useState('')
     const [imageUrl, setImageUrl] = useState('')
     const { user, setUser } = useContext(UserContext)
     const { destinations, setDestinations } = useContext(DestinationsContext)

     const addNewDestination = async (e) => {
          e.preventDefault();
          if (!user || !user.id) {
               console.error('User or user ID is undefined');
               return;
          }
          try {
               const res = await axios.post(`${baseUrl}/users/${user.id}/destinations`, {
                    title,
                    description,
                    imageUrl
               });
               console.log(res.data);
               setDestinations([...destinations, res.data]);
               setFormVisible(false);
               navigate('/my-destinations/');
          } catch (err) {
               console.log(err);
          }
     }

     return (

          formVisible ? (
               <div className='add-form-container'>
                    <form className="add-destination-form" onSubmit={addNewDestination}>
                         <h1>Add new destination</h1>
                         <div className='input-container'>
                              <label>Destination</label>
                              <input value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter destination' />
                         </div>
                         <div className='input-container'>
                              <label>Description</label>
                              <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Enter description'></textarea>
                         </div>
                         <div className='input-container'>
                              <label>Add Image</label>
                              <input value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} placeholder='Enter image url' />
                         </div>
                         <button type="submit">Submit</button>
                      {/* '   <button onClick={() => {
                              setFormVisible(false);
                              navigate('/my-destinations/');
                         }}>Cancel</button>' */}
                    </form>
               </div>
          ) : null
     )
}
