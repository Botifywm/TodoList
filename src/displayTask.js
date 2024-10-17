import { allTodos } from "./todos";
import {isPast, isToday } from "date-fns";
import { allTodoSession } from "./storage";

function filterTasks () {
    const allTask = () => allTodoSession.filter((obj) => obj.checklist === false);
    const todayTask = () => allTodoSession.filter((obj) => isToday(obj.dueDate) && obj.checklist === false);
    const overdueTask = () => allTodoSession.filter((obj) => isPast(obj.dueDate) && !isToday(obj.dueDate) && obj.checklist === false);
    const completedTasks = () => allTodoSession.filter((obj) => obj.checklist === true);
    const projectTasks = (header) => allTodoSession.filter((obj) => obj.project === header && obj.checklist === false);

    return {allTask, todayTask, overdueTask, completedTasks, projectTasks}

}


let displayTask = new Map();
displayTask.set('All', filterTasks().allTask);
displayTask.set('Today', filterTasks().todayTask);
displayTask.set('Overdue', filterTasks().overdueTask);
displayTask.set('Completed', filterTasks().completedTasks);

export {displayTask, filterTasks};

