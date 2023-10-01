//Define UI Elements variables
const form              =   document.querySelector("#task-form");
const taskList         =   document.querySelector("#collection-list");
const clearBtn         =   document.querySelector(".clear-tasks");  
const filter              =   document.querySelector("#filter");
const taskInput       =   document.querySelector("#task");

loadEvents();
function loadEvents() {
    //Window Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    //FORM SUBMIT EVENT
    form.addEventListener('submit',addTask);
    
    //remove task event
    taskList.addEventListener('click', removeTask);
    
    //clear all task events
    clearBtn.addEventListener('click',clearTasks);
    
    //filter task event
    filter.addEventListener('keyup', filterTasks);
}
function createAndAddItemToTaskList(task){
    //We have to create a new 'li' and insert it in 'ul'
    
    //create li element
    const li = document.createElement('li');
    
    //add class names
    li.className="collection-item";
    
    //add text in li
    li.appendChild(
    document.createTextNode(task));
    
    //create a link for deleting
    const deleteLink = document.createElement('a');
    
    //add attribute to link
    
    deleteLink.setAttribute('href','#');
    
    //add class
    deleteLink.className="delete-item secondary-content";
    
    //add 'x' as button in a
     deleteLink.innerHTML="<i class='fa fa-remove'></i>";
    
    //append link to li
    li.appendChild(deleteLink);
    
    //create a link for updating
     const updateLink = document.createElement('a');
    
    //add attribute to link
    updateLink.setAttribute('href','#');
    
    //add class
    updateLink.className="update-item secondary-content";
    
    //add  pencil icon as button in a
     updateLink.innerHTML="<i class='fa fa-pencil'></i>";
    
    //append link to li
    li.appendChild(updateLink);  
    
    //append li to the task list (ul)
    taskList.appendChild(li);
}
function addTask(e) {
    e.preventDefault();
    if(taskInput.value == '') {
        alert("Please do insert any task!");
    } else {
        createAndAddItemToTaskList(taskInput.value);
        
        //Store to LocalStorage
        storeTaskInLocalStorage(taskInput.value);
        
        //clear the task input
        taskInput.value = "";
    }
}
function removeTask(e) {
    if(e.target.classList.contains('delete-item') || e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure you want to delete?')) {
            let taskValue;
            
            if(e.target.parentElement.nodeName === 'LI') {
                taskValue = e.target.parentElement.textContent;
                e.target.parentElement.remove();
            } else {
                taskValue = e.target.parentElement.parentElement.textContent;
                e.target.parentElement.parentElement.remove();
            }
            removeTaskFromLocalStorage(taskValue);
        } 
    } else if(e.target.classList.contains('update-item') || e.target.parentElement.classList.contains('update-item')){
        let taskToBeUpdated;
        
        if(e.target.parentElement.classList.contains('update-item')){
            taskToBeUpdated = e.target.parentElement.parentElement;   
        }
        else if(e.target.classList.contains('update-item')){
            taskToBeUpdated = e.target.parentElement;
        }
        let oldTask = taskToBeUpdated.firstChild.textContent;
        let newTask = window.prompt("Enter new name for task");
        if(newTask === null || newTask === ''){
            alert('Pls enter something')
        }else{
            taskToBeUpdated.replaceChild(document.createTextNode(newTask),taskToBeUpdated.firstChild);
        }
        updateTaskInLocalStorage(oldTask,newTask);  
    }
}
function clearTasks(e){
    e.preventDefault();
    //slower method 
    //taskList.innerHTML ='';
    
    //FasterMethod
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    
    //remove all from localStorage
    let tasks = [];
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function filterTasks(e) {
    const key = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(key) == -1) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
}
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function getTasks(e) {
    //retrive all the task from storage and display
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        createAndAddItemToTaskList(task);
    }); 
}
function removeTaskFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(taskValue, index) {
        if(taskValue === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function updateTaskInLocalStorage(oldTask,newTask){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task,index){
        if(task === oldTask ){
            tasks[index] = newTask;
        }
    });
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
}