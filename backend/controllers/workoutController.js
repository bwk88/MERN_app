const Workout = require('../models/workoutsModel')
const mongoose = require('mongoose');

//GET all workouts
const getWorkouts = async (req,res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1}); // find all workouts and sort it based on the date of creation

    res.status(200).json(workouts);
}

//Get single workout
const getSingleWorkout = async (req,res) =>{
    const { id } = req.params // the id is stored in a params propperty
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error : "No such workout"});
    }

    res.status(200).json(workout);
}

//Create a new workout
const createWorkout = async (req,res) =>{
    const { title,load, reps } = req.body

    //add to DB
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout);

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//Delete a workout
const deleteWorkout = async (req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout) {
        return res.status(404).json({error : "No such workout"});
    }

    res.status(200).json(workout)
}


//Update a workout

const updateWorkout = async (req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body}) // 1st argument:- the id of data which we want ot update, 2nd :- the object data with which we want to update(since it is a object we suse spread operator)

    if(!workout) {
        return res.status(400).json({error : "No such workout"});
    }

    res.status(200).json(workout)

}


module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}