import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    TASK_STATE,
    CURRENT_TASK,
    UPDATE_TASK
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                projectTasks: state.tasks.filter(task => task.projectId  === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                taskError: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                taskError: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case UPDATE_TASK:
        case TASK_STATE:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
                selectedTask: null
            }
        case CURRENT_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        default:
            return state;
    }
};