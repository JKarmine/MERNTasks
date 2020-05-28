import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({ task }) => {
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { getTasks, deleteTask, changeTaskState, saveCurrentTask } = tasksContext;

    const [currentProject] = project;

    // Function to delete task
    const taskDelete = id => {
        deleteTask(id, currentProject._id);
        getTasks(currentProject._id);
    };

    // Function to change task state
    const changeState = task => {
        task.state = !task.state;
        changeTaskState(task);
    };

    // Add a current task when user wants to edit
    const selectTask = task => {
        saveCurrentTask(task);
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
                <button type="button" className="btn btn-primario" onClick={() => selectTask(task)}>Editar</button>
                <button type="button" className="btn btn-secundario" onClick={() => taskDelete(task._id)}>Eliminar</button>
            </div>
        </li>
    );
}
 
export default Task;