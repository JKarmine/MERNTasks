import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    PROJECT_FORM,
    GET_PROJECT,
    ADD_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = (props) => {
    const initialState = {
        form: false,
        projects: [],
        errorForm: false,
        project: null,
        message: null
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
            const alert = {
                msg: 'A error occurred',
                category: 'alerta-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
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
            const alert = {
                msg: 'A error occurred',
                category: 'alerta-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
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

    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            });
        } catch (error) {
            const alert = {
                msg: 'A error occurred',
                category: 'alerta-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    return (
        <projectContext.Provider
            value={{
                form: state.form,
                projects: state.projects,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
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