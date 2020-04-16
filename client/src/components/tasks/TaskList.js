import React, { Fragment, useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskList = () => {
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { projectTasks } = tasksContext;

    if (!project) {
        return <h2>Select a project.</h2>
    }

    const [currentProject] = project;

    return (
        <Fragment>
            <h2>Project: {currentProject.name}</h2>

            <ul className="listado-tareas">
                { projectTasks.length === 0
                ? (<li className="tarea"><p>No tasks</p></li>)
                :
                <TransitionGroup>
                    {projectTasks.map(task => (
                    <CSSTransition
                        key={task.id}
                        timeout={200}
                        classNames="tarea"
                    >
                        <Task
                            task={task}
                        />
                    </CSSTransition>
                    ))}
                </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => deleteProject(currentProject.id)}
            >Delete Project &times;
            </button>
        </Fragment>
    );
}
 
export default TaskList;