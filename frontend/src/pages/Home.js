import React from 'react'
import { useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()

    useEffect(()=>{
        const fetchWorkouts = async () =>{
            const response = await fetch('http://localhost:4000/api/workout')
            const json = await response.json();
            // console.log(json)

            if(response.ok){
                // setWorkouts(json);
                dispatch({type:'SET_WORKOUTS', payload:json})
                // workouts.map((workout)=>(
                //     console.log(workout)
                // ))
            }
        }

        fetchWorkouts();
    },[])

    return (
    <div className='home'>
        <div className='workouts'>
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout = {workout} />
            ))}
        </div>
        <WorkoutForm />

    </div>
    )
}

export default Home