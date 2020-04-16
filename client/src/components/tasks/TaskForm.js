import React, { useState, useContext, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { addTask, taskError, selectedTask, getTasks, validateTask, updateTask } = tasksContext;

    const [task, setTask] = useState({
        name: ''
    });

    const { name } = task;

    // useEffect to detect the selected task
    useEffect(() => {
        if (selectedTask) {
            setTask(selectedTask);
        } else {
            setTask({
                name: ''
            });
        }
    }, [selectedTask]);

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

        if (selectedTask) {
            // Update existing task
            updateTask(task);
        } else {
            // Add the new task to task state
            task.projectId = currentProject.id;
            task.state = false;
            addTask(task);
        }

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
                        value={selectedTask ? "Edit Task" : "Add Task"}
                    />
                </div>
            </form>
            { taskError && <p className="mensaje error">Task name is required.</p> }
        </div>
    );
}
 
export default TaskForm;