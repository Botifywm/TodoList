import "./style.css";
import { displayTask } from "./displayTask";
import { displayTodos, restrictDisplay, presetSelection } from "./displayTodos";
import { createProjectFn, dropDownProjectFn, renameP } from "./project";
import { allTodos, createTodo } from "./todos";
import { formatDate, startOfToday } from "date-fns";
import { displayEditForm } from "./editForm";
import { countExecutor } from "./taskCounter";
import { webStorage } from "./storage";
import { projectLabelsFn } from "./project";
import { checklistEvent } from "./checklist";

// PLACEHOLDER FOR FORM IN HTML
const placeHolder = document.querySelector('#placeHolder')

// MENU ADD TASK FORM
const createTaskMenu = document.querySelector('.menuLogo');
const formContainerMenu = document.querySelector('.formMenu');

// MAIN CONTENT ADD TASK FORM
const date = document.querySelector('.dateInput');
const formContainerMain = document.querySelector('.formMain');
const createTask = document.querySelector('#addIcon');
const closeForm = document.querySelector('.closeForm');
const addTodoForm = document.querySelector('.addTodoForm');
const all = document.querySelector('.all');
const today = document.querySelector('.today');
const overdue = document.querySelector('.overdue');
const completed = document.querySelector('.completed');
const titleInput = document.querySelector('.titleInput');

// PROJECT-RELATED SELECTORS
const createProject = document.querySelector('#createProject');
const projectDialog = document.querySelector('#projectDialog');
const ProjectTitleInput = document.querySelector('#ProjectTitleInput');
const projectInputOption = document.querySelector('.projectInput');
const cancelProject = document.querySelector('#cancelProj');
const projectLabels = document.querySelector('.projectLabels');

const renameProjForm = document.querySelector('.renameProjForm');

// DISPLAY TODO LIST
const todoList = document.querySelector('.todoList');
const menuTitle = document.querySelector('.menuTitle');

// COUNT TRACKER
// let allCount = document.querySelector('.all .count');
// let todayCount = document.querySelector('.today .count');
// let overdueCount = document.querySelector('.overdue .count');
// let completedCount = document.querySelector('.completed .count');

// INTIALIZER
displayTodos(displayTask, "All");
projectLabelsFn();
dropDownProjectFn();
countExecutor();
displayEditForm(todoList);
checklistEvent(todoList, menuTitle);



// MAIN CODE BODY
document.addEventListener('DOMContentLoaded', function(){
    const observer = new MutationObserver(() => {
        restrictDisplay(menuTitle.textContent);
        projectInputOption.value = presetSelection(menuTitle.textContent);
    })
    observer.observe(menuTitle, {childList: true})

    const observerTwo = new MutationObserver(() => {
        // FOR CHECKLIST
        checklistEvent(todoList, menuTitle);

        // FOR COUNTING LIST
        countExecutor();
    })
    observerTwo.observe(todoList, {childList:true});
    observerTwo.observe(projectLabels, {childList:true});
})

createTaskMenu.addEventListener('click', () => {
    const today = formatDate(startOfToday(), 'yyyy-MM-dd')
    date.setAttribute('min', today);
    formContainerMenu.appendChild(addTodoForm);
    addTodoForm.style.display = "grid";
    if (menuTitle.textContent === "Today") {
        date.value = today;
    }
    titleInput.focus();
})

createTask.addEventListener('click', () => {
    const today = formatDate(startOfToday(), 'yyyy-MM-dd')
    date.setAttribute('min', today);
    // projectInputOption.value = presetSelection(menuTitle.textContent);
    formContainerMain.appendChild(addTodoForm);
    addTodoForm.style.display = "grid";
    if (menuTitle.textContent === "Today") {
        date.value = today;
    }
    titleInput.focus();
})

closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    addTodoForm.reset();
    placeHolder.appendChild(addTodoForm);
    addTodoForm.style.display = "none";
})

addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const viewTodo = createTodo();
    addTodoForm.style.display = "none";
    placeHolder.appendChild(addTodoForm);
    displayTodos(viewTodo.map, viewTodo.header);
    addTodoForm.reset();

    displayEditForm(todoList);
})

all.addEventListener('click', () => {
    displayTodos(displayTask, "All");
})

today.addEventListener('click', () => {
    displayTodos(displayTask, "Today");
})

overdue.addEventListener('click', () => {
    displayTodos(displayTask, "Overdue");
})

completed.addEventListener('click', () => {
    displayTodos(displayTask, "Completed");
    restrictDisplay(menuTitle.textContent);
})

createProject.addEventListener('click', () => {
    projectDialog.style.display = "grid";
    ProjectTitleInput.focus();
    projectDialog.reset();
})

projectDialog.addEventListener('submit', (e) => {
    e.preventDefault();
    placeHolder.appendChild(renameProjForm);
    createProjectFn();
    projectDialog.style.display = "none";
    webStorage();
})

cancelProject.addEventListener('click', (e) => {
    e.preventDefault();
    projectDialog.style.display = "none";
})

renameProjForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const preProjName = document.querySelector('.hiddenRenameForm');
    const newName = renameP(preProjName).newName;
    placeHolder.appendChild(renameProjForm);
    preProjName.classList.remove('hiddenRenameForm');
    dropDownProjectFn();
    displayTodos(allTodos, newName);
    webStorage();
})
