import React, { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { addTask, taskError, getTasks, validateTask } = tasksContext;

    const [task, setTask] = useState({
        name: ''
    });

    const { name } = task;

    if (!project) return null;

    const [currentProject] = project;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();

        // Validation
        if (name.trim() === '') {
            validateTask();
            return;
        }

        // Add the new task to task state
        task.projectId = currentProject.id;
        task.state = false;
        addTask(task);

        // Get current proyect tasks

        getTasks(currentProject.id);

        // Reset form
        setTask({
            name: ''
        });
    };

    return (
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Add Task"
                    />
                </div>
            </form>
            { taskError && <p className="mensaje error">Task name is required.</p> }
        </div>
    );
}
 
export default TaskForm;