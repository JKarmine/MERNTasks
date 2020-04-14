import React, { Fragment } from 'react';
import Task from './Task';

const TaskList = () => {
    const projectTasks = [
        { name: 'Elegir plataforma', state: true },
        { name: 'Elegir colores', state: false },
        { name: 'Elegir formas de pago', state: true },
        { name: 'Elegir hosting', state: false },
    ];

    return (
        <Fragment>
            <h2>Project: Tienda</h2>

            <ul className="listado-tareas">
                { projectTasks.length === 0
                ? (<li className="tarea"><p>No tasks</p></li>)
                : projectTasks.map(task => (
                    <Task
                        task={task}
                    />
                ))
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
            >Delete Project &times;
            </button>
        </Fragment>
    );
}
 
export default TaskList;