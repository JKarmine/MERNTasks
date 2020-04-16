import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { getTasks, deleteTask, changeTaskState } = tasksContext;

    const [currentProject] = project;

    // Function to delete task
    const taskDelete = id => {
        deleteTask(id);
        getTasks(currentProject.id);
    };

    // Function to change task state
    const changeState = task => {
        task.state = !task.state;
        changeTaskState(task);
    };

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                { task.state
                ? <button type="button" className="completo" onClick={() => changeState(task)}>Completo</button>
                : <button type="button" className="incompleto" onClick={() => changeState(task)}>Incompleto</button>
                }
            </div>

            <div className="acciones">
                <button type="button" className="btn btn-primario">Editar</button>
                <button type="button" className="btn btn-secundario" onClick={() => taskDelete(task.id)}>Eliminar</button>
            </div>
        </li>
    );
}
 
export default Task;