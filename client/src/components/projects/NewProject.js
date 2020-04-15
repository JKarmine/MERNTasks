import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
    // Contexto
    const projectsContext = useContext(projectContext);
    const { form, errorForm, showForm, addProject, showError } = projectsContext;

    const [project, setProject] = useState({
        name: ''
    });

    const { name } = project;

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Validation
        if (name === '') {
            showError();
            return;
        }

        // Add to state
        addProject(project);

        // Reset form
        setProject({
            name: ''
        });
    };

    // read inputs
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
            >
                New Project
            </button>

            { form && <form
                className="formulario-nuevo-proyecto"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="input-text"
                    placeholder="Project Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Add Project"
                />
            </form> }
        { errorForm && <p className="mensaje error">El nombre del proyecto es obligatorio.</p> }
        </Fragment>
    );
}
 
export default NewProject;