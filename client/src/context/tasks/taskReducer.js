import {
    TASKS_PROJECT
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                projectTasks: state.tasks.filter(task => task.projectId === action.payload)
            }
        default:
            return state;
    }
};