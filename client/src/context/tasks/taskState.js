import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK
} from '../../types';

const TaskState = (props) => {
    const initialState = {
        tasks: [
            { id: 1, name: 'Elegir plataforma', state: true, projectId: 1 },
            { id: 2, name: 'Elegir colores', state: false, projectId: 2 },
            { id: 3, name: 'Elegir formas de pago', state: true, projectId: 3 },
            { id: 4, name: 'Elegir hosting', state: false, projectId: 4 },
            { id: 5, name: 'Elegir framework', state: true, projectId: 1 },
            { id: 6, name: 'Elegir libreria', state: false, projectId: 2 },
            { id: 7, name: 'Elegir balanceador de carga', state: true, projectId: 3 },
            { id: 8, name: 'Elegir servidor', state: true, projectId: 4 },
            { id: 9, name: 'Elegir logo', state: false, projectId: 2 },
            { id: 10, name: 'Elegir puestos', state: true, projectId: 1 },
            { id: 11, name: 'Elegir presupuesto', state: true, projectId: 3 },
            { id: 12, name: 'Elegir base de datos', state: false, projectId: 4 },
            { id: 13, name: 'Elegir IDE', state: true, projectId: 3 },
        ],
        projectTasks: null,
        taskError: false
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

    const addTask = task => {
        dispatch({
            type: ADD_TASK,
            payload: task
        });
    };

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        });
    };

    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        });
    };

    return(
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                getTasks,
                addTask,
                validateTask,
                deleteTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
 
export default TaskState;