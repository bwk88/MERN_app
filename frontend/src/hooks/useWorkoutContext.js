import { WorkoutsContext } from "../context/WorkoutContext";

import { useContext } from "react";

export const useWorkoutContext = () =>{
    const context = useContext(WorkoutsContext);

    if(!context) {
        throw Error("Use Context inside WorkoutsContextProvider")
    }

    return context;
}