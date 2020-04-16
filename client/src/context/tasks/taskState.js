import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    TASKS_PROJECT
} from '../../types';

const TaskState = (props) => {
    const initialState = {
        tasks: [
            { name: 'Elegir plataforma', state: true, projectId: 1 },
            { name: 'Elegir colores', state: false, projectId: 2 },
            { name: 'Elegir formas de pago', state: true, projectId: 3 },
            { name: 'Elegir hosting', state: false, projectId: 4 },
            { name: 'Elegir plataforma', state: true, projectId: 1 },
            { name: 'Elegir colores', state: false, projectId: 2 },
            { name: 'Elegir formas de pago', state: true, projectId: 3 },
            { name: 'Elegir plataforma', state: true, projectId: 4 },
            { name: 'Elegir colores', state: false, projectId: 2 },
            { name: 'Elegir formas de pago', state: true, projectId: 1 },
            { name: 'Elegir plataforma', state: true, projectId: 3 },
            { name: 'Elegir colores', state: false, projectId: 4 },
            { name: 'Elegir formas de pago', state: true, projectId: 3 },
        ]
    };

    // create dispatch

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Functions

    const getTasks = projectId => {
        dispatch({
            type: TASKS_PROJECT,
            payload: projectId
        });
    };

    return(
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                getTasks
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
 
export default TaskState;