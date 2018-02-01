class Task {
    taskName: string;
    successHandler: Function;
    getters: string[];

    constructor(
        taskName: string, successHandler: Function, getters: string[]
    ) {
        this.taskName = name;
        this.successHandler = successHandler;
        this.getters = getters;
    }

    getTaskName() {
        return this.taskName;
    }
    
    getSuccessHandler() {
        return this.successHandler;
    }

    // Lovely name :|
    getGetters() {
        return this.taskName;
    }
}

export default Task;

