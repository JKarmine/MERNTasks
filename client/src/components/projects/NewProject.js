import React, { Fragment, useState } from 'react'

const NewProject = () => {
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

        // Add to state

        // Reset form
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >
                New Project
            </button>

            <form
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
            </form>
        </Fragment>
    );
}
 
export default NewProject;