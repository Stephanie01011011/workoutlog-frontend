import React, { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
//components
import WorkoutsDetails from '../components/WorkoutsDetails'
import WorkoutsForm from '../components/WorkoutsForm'
//must add cors proxy info or else you wont be able to text
//"proxy": "http://localhost:4000", <-- add this to top of package.json
//get rid of http:localhost:4000 in fetch request.
const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()
    //Should not make useEffect asynchronous, but a function inside can be
    useEffect(() => {
        const fetchWorkouts = async () => {
            //get rid of /api/workouts, replace with address of web service
            const response = await fetch('https://workoutlog-4z21.onrender.com/');
            //turn the response into a json object
            console.log(response);
            const json = await response.json();

            //make sure the response came through ok
            if (response.ok) {
                //dispatch fires off the reducer function using the type and action to decide what to do with the data
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    }, [])
  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
            <WorkoutsDetails key={workout.id} workout={workout}/>
        ))}
      </div>
      <WorkoutsForm />
    </div>
  )
}

export default Home
