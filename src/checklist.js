import { allTodos } from "./todos";
import { displayTodos } from "./displayTodos";
import { displayPage } from "./dynamicSwitch";
import { webStorage } from "./storage";

function checklistEvent(targetElement, menuTitle) {
    targetElement.querySelectorAll('.checklist').forEach(checklist => {
        checklist.addEventListener('click', (e) => {
            const checkbox = e.target.closest('.checklist');
            if (checkbox) {
                const editLogo = checkbox.parentElement.querySelector('.editLogo');
                const activeObjGeneral = allTodos.find((obj) => obj.uuid === editLogo.id);
    
                checkbox.setAttribute('aria-checked', 'true');
                activeObjGeneral.checklist = true;
                webStorage();
                displayTodos(displayPage(activeObjGeneral.dueDate, activeObjGeneral.project).map, menuTitle.textContent)
            }
        })
    })
}


export {checklistEvent}