import React from 'react'
import { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext()
    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workout',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json();
        // console.log(json)

        if(!response.ok){
            console.log(json.error);
            setError(json.error)
        }
            
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            // console.log('New Workout Added' , json)
            dispatch({type:'CREATE_WORKOUT', payload: json})
        }
    }
  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>

        <label>Exercise Title:</label>
        <input 
            type='text'
            onChange={(e)=> setTitle(e.target.value) }
            value={title}
        />

        <label>Load (in kg):</label>
        <input 
            type='number'
            onChange={(e)=> setLoad(e.target.value) }
            value={load}
        />

        <label>Reps:</label>
        <input 
            type='number'
            onChange={(e)=> setReps(e.target.value) }
            value={reps}
        />
        <button>Add Workout</button>
        {error && <div className='error'>{error} </div>}
    </form>
  )
}

export default WorkoutForm