import { dropDownProjectFn } from "./project";
import { allTodos } from "./todos";

function createEditForm() {
    const template = document.createElement('template');
    template.innerHTML = `<form action="#" class="editForm">
            <div class="priorityList">
                <input class="pList nil" type="radio" value="nil" name="pList" title="No Priority">
                <input class="pList low" type="radio" value="low" name="pList" title="Low Priority">
                <input class="pList med" type="radio" value="med" name="pList" title="Medium Priority">
                <input class="pList high" type="radio" value="high" name="pList" title="High Priority">
            </div>
            <div class="editCtrl">
                <input class="nameEdit" type="text" placeholder="Task Name" autofocus>
                <textarea class="noteEdit" placeholder="Notes"></textarea>
                <input class="dateEdit" type="date" required>
                <select class="projectEdit">
                    <option value="General">General</option>
                    <optgroup label="Projects" class="projectsSegEdit"></optgroup>
                </select>
                <div class="editAction">
                    <button type="submit" class="saveEdit">Save</button>
                    <button class="delete">Delete Task</button>
                    <button class="cancelEdit">Cancel</button>
                </div>
            </div>
        </form>`;

    return template.content.cloneNode(true);
}


function removeActiveEdit() {
    const activeCheck = document.querySelector('.active');
    if (activeCheck) {
        const editFormExists = document.querySelector('.editForm');
        const wrapperEditing = document.querySelector('.editing');
        wrapperEditing.style.display = "grid";
        activeCheck.classList.remove('active');
        wrapperEditing.classList.remove('editing');
        editFormExists.remove();
    }
}

function presetEditForm(outerWrapper, priority, title, notes, dueDate, project) {
    const editForm = createEditForm();
    outerWrapper.appendChild(editForm);
    const checkPriority = document.querySelector(`.pList.${priority}`);
    checkPriority.checked = true;
    const newName = document.querySelector('.nameEdit');
    newName.value = title;
    const newNotes = document.querySelector('.noteEdit');
    newNotes.value = notes;
    const newDate = document.querySelector('.dateEdit');
    newDate.value = dueDate;
    const projectEdit = document.querySelector('.projectEdit');
    const newProject = document.querySelector('.projectsSegEdit');
    // projectEdit.addEventListener('click', () => {
    //     newProject.innerHTML = dropDownProjectFn().innerHTML;
    // })
    newProject.innerHTML = dropDownProjectFn().innerHTML;
    projectEdit.value = project;

    return {newName, newNotes, newDate, projectEdit}
}

function displayEditForm(targetElement) {
    targetElement.addEventListener('click', (e) => {
        if (e.target.closest('.editLogo')) {
            const editLogo = e.target.closest('.editLogo');
            const outerWrapper = editLogo.closest('.outerWrapper');
            const wrapper = outerWrapper.querySelector('.wrapperTodo');
            const activeObjGeneral = allTodos.find((obj) => obj.uuid === editLogo.id);
            removeActiveEdit();
    
            editLogo.classList.add('active');
            if (editLogo.classList.contains('active')){
                wrapper.style.display = "none";
                wrapper.classList.add('editing');
                const presets = presetEditForm(outerWrapper, activeObjGeneral.priority, activeObjGeneral.title, activeObjGeneral.notes, activeObjGeneral.dueDate, activeObjGeneral.project);
                const saveEdit = document.querySelector('.saveEdit')
                saveEdit.addEventListener('click', (e) => {
                    e.preventDefault();
                    const selectedPriority = document.querySelector('input[name="pList"]:checked')
                    activeObjGeneral.title = presets.newName.value; 
                    activeObjGeneral.notes = presets.newNotes.value;
                    activeObjGeneral.priority = selectedPriority.value;
                    activeObjGeneral.dueDate = presets.newDate.value;
                    activeObjGeneral.project = presets.projectEdit.value;
                    removeActiveEdit();
                    displayTodos(displayPage(activeObjGeneral.dueDate, activeObjGeneral.project).map , displayPage(activeObjGeneral.dueDate, activeObjGeneral.project).header)
                })
    
                const deleteEdit = document.querySelector('.delete')
                deleteEdit.addEventListener('click', (e) => {
                    e.preventDefault();
                    // const toDel = allTodos.find((obj) => obj.uuid === elementId);
                    const index = allTodos.indexOf(activeObjGeneral);
                    allTodos.splice(index, 1);
                    // displayTodos(displayTask, displayPage(activeObjGeneral.dueDate, activeObjGeneral.project).header)
                    displayTodos(displayPage(activeObjGeneral.dueDate, activeObjGeneral.project).map, menuTitle.textContent);
    
                })
    
                const cancelEdit = document.querySelector('.cancelEdit')
                cancelEdit.addEventListener('click', (e) => {
                    e.preventDefault();
                    removeActiveEdit();
                })
            }
        }
        
    })
}


export {createEditForm, removeActiveEdit, presetEditForm, displayEditForm};