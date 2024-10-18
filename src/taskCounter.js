import { allTodos } from "./todos";
import { allProjects } from "./project";
import { filterTasks } from "./displayTask";
// import { allProjectSession, allTodoSession } from "./storage";

function countList() {
    const countTracker = new Map();
    const allLength = filterTasks().allTask().length;
    const todayLength = filterTasks().todayTask().length;
    const overdueLength = filterTasks().overdueTask().length;
    const completedLength = filterTasks().completedTasks().length;
    countTracker.set('All', allLength);
    countTracker.set('Today', todayLength);
    countTracker.set('Overdue', overdueLength);
    countTracker.set('Completed', completedLength);

    allProjects.forEach((project) => {
        const projectLength = filterTasks().projectTasks(project).length;
        countTracker.set(project, projectLength);
    })

    return {countTracker};
}

function countExecutor() {
    let allCount = document.querySelector('.all .count');
    let todayCount = document.querySelector('.today .count');
    let overdueCount = document.querySelector('.overdue .count');
    let completedCount = document.querySelector('.completed .count');

    const track = countList().countTracker;
    allCount.textContent = track.get('All');
    todayCount.textContent = track.get('Today');
    overdueCount.textContent = track.get('Overdue');
    completedCount.textContent = track.get('Completed');

    const allProjectList = document.querySelectorAll('.projLabel .count');
    allProjectList.forEach((projCount, index) => {
        projCount.textContent = track.get(allProjects[index]);
    })
}

export {countList, countExecutor};