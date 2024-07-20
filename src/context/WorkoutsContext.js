import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

//action is asking what we want to do with the data
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {

    
    //workoutsReducer is the name of this reducer
    const [state, dispatch] = useReducer(workoutsReducer, {
        //initial state
        workouts: null
    })

    //dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]})

    //Children outputs the app that is provided in index.js where this provider is wrapped.
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}