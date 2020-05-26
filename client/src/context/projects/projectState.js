import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    PROJECT_FORM,
    GET_PROJECT,
    ADD_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = (props) => {
    const initialState = {
        form: false,
        projects: [],
        errorForm: false,
        project: null
    };

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // CRUD functions

    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        });
    };

    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects');
            
            dispatch({
                type: GET_PROJECT,
                payload: response.data.projects
            });
        } catch (error) {
            console.log(error);
        }    
    };

    const addProject = async project => {
        
        try {
            const response = await axiosClient.post('/api/projects', project);

            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };

    const showError = () => {
        dispatch({
            type: VALIDATE_FORM,
        });
    };

    const currentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        });
    };

    const deleteProject = projectId => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        });
    };

    return (
        <projectContext.Provider
            value={{
                form: state.form,
                projects: state.projects,
                errorForm: state.errorForm,
                project: state.project,
                showForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}
 
export default ProjectState;