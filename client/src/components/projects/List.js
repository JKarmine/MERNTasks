import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';

const List = () => {
    // Projects from state
    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    useEffect(() => {
        getProjects();
    }, []);

    // Validation
    if (projects.length === 0) return 0;

    return (
        <ul className="listado-proyectos">
            {projects.map(project => (
                <Project
                    key={project.id}
                    project={project}
                />
            ))}
        </ul>
    );
}
 
export default List;