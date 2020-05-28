import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK
} from '../../types';
import axiosClient from '../../config/axios';

const TaskState = (props) => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    };

    // create dispatch

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Functions

    const getTasks = async project => {
        const response = await axiosClient.get('/api/tasks', { params: { project } });

        try {
            dispatch({
                type: TASKS_PROJECT,
                payload: response.data.tasks
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async task => {
        try {
            const response = await axiosClient.post('/api/tasks', task);
            console.log(response);

            dispatch({
                type: ADD_TASK,
                payload: task
            });
        } catch (error) {
            console.log(error);
        }
    };

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        });
    };

    const deleteTask = async (id, project) => {
        await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });

        try {
            dispatch({
                type: DELETE_TASK,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async task => {
        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
            
            dispatch({
                type: UPDATE_TASK,
                payload: response.data.task
            });
        } catch (error) {
            console.log(error);
        }
    };

    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        });
    };

    return(
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                saveCurrentTask,
                updateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
 
export default TaskState;