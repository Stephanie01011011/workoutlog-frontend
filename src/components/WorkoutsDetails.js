import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const WorkoutsDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()
    const handleClick = async () => {
        const response = await fetch('https://workoutlog-4z21.onrender.com/' + workout._id, {
            method: 'DELETE'
        })
        //going to respond with the object that was just deleted
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load(kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutsDetails
