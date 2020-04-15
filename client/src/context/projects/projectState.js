import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    PROJECT_FORM,
    GET_PROJECT
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
        projects: []
    };

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // CRUD functions

    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    };

    const getProjects = () => {
        dispatch({
            type: GET_PROJECT,
            payload: projects
        })
    };

    return (
        <projectContext.Provider
            value={{
                form: state.form,
                projects: state.projects,
                showForm,
                getProjects
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}
 
export default ProjectState;