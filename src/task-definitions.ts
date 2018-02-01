import Task from './tasks';

const availableTasks = [
    new Task(
        "Bag of Words",
        function(r) { console.log("succeeded"); },
        ['field', 'value']
    )
];

export default availableTasks;
