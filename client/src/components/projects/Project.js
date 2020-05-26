import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
    // get Project state
    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;

    // Get Task state
    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext;

    // Function to add the current project

    const selectProject = id => {
        currentProject(id);
        getTasks(id);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            >
                {project.name}
            </button>
        </li>
    );
}
 
export default Project;