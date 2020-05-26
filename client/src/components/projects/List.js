import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const List = () => {
    // Projects from state
    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    useEffect(() => {
        // If error
        if (message) {
            showAlert(message.msg, message.category);
        }

        getProjects();
        //eslint-disable-next-line
    }, [message]);

    // Validation
    if (projects.length === 0) return <p>No projects. Start creating one.</p>;

    return (
        <ul className="listado-proyectos">
            { alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div> }
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project
                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default List;