import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

const ProjectState = (props) => {
    const projects = [
        { id: 1, name: 'Tienda' },
        { id: 2, name: 'Intranet' },
        { id: 3, name: 'Diseño' },
        { id: 4, name: 'MERN' }
    ];

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

    const getProjects = () => {
        dispatch({
            type: GET_PROJECT,
            payload: projects
        });
    };

    const addProject = project => {
        project.id = uuidv4();
        dispatch({
            type: ADD_PROJECT,
            payload: project
        });
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