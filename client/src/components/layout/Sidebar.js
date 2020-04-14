import React from 'react';
import NewProject from '../projects/NewProject';

const SideBar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>

            <NewProject />

            <div className="proyectos">
                <h2>Your projects</h2>
            </div>
        </aside>
    );
}
 
export default SideBar;