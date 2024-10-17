import { isToday } from "date-fns";
import { displayTask } from "./displayTask";
import { allTodos } from "./todos";
import { allTodoSession } from "./storage";

function displayPage(date, projectKey) {
    let header = 'All';
    let map = displayTask;
    const dueDateBool = isToday(date);
    if (projectKey === 'General'){
        if (dueDateBool) {
            header = 'Today';
        }
    }
    else {
        header = projectKey;
        map = allTodoSession;
    }
    return {header, map};
}

export {displayPage};