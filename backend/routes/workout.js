const express = require('express')
const Workout = require('../models/workoutsModel')
const {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout

 } = require('../controllers/workoutController');

const router = express.Router();


//GET all workouts
router.get('/',getWorkouts)

//GET a single workout
router.get('/:id',getSingleWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)

//POST a workout
router.post('/', createWorkout )

//UPDATE a workout
router.patch('/:id',updateWorkout)

module.exports = router