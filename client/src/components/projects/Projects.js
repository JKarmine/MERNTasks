import React, { useContext, useEffect } from 'react';
import SideBar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';
import AuthContext from '..//../context/auth/authContext';

const Projects = () => {

    // Get auth info
    const authContext = useContext(AuthContext);
    const { userAuth } = authContext;

    useEffect(() => {
        userAuth();
    }, []);

    return (
        <div className="contenedor-app">
            <SideBar />
            <div className="seccion-principal">
                <Bar />

                <main>
                    <TaskForm />

                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projects;