import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutsForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    //when users submit form, do this
    const handleSubmit = async (e) => {
        //prevent the page from refreshing
        e.preventDefault()

        //create object to send new workout
        const workout = {title, reps, load}
        
        
        const response = await fetch('https://workoutlog-4z21.onrender.com/', {
            //define the method for calling api
            method: 'POST',
            //define the body of the request and turn into JSON, from an object
            body: JSON.stringify(workout),
            //do not forget the s in headers
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            //gets the error property from backend
            setError(json.error)
            //use this empty fields array to style the form inputs
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            console.log("new workout added", json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

  return (
  <form className='create' onSubmit={handleSubmit}>
    <h3>Add a new workout</h3>

    <label>Exercise Title:</label>
    <input type="text" 
    onChange={(e) => {setTitle(e.target.value)}}
    value={title} className={emptyFields.includes('title') ? 'error' : ''}/>

    <label>Load (in KG):</label>
    <input type="number" 
    onChange={(e) => {setLoad(e.target.value)}}
    value={load} className={emptyFields.includes('load') ? 'error' : ''}/>

    <label>Reps:</label>
    <input type="number" 
    onChange={(e) => {setReps(e.target.value)}}
    value={reps} className={emptyFields.includes('reps') ? 'error' : ''}/>

    <button>Add Workout</button>
    {error && <div className='error'>{error}</div>}
  </form>
  )
}

export default WorkoutsForm
