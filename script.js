let submit = document.querySelector('#submit');
let userInput = document.getElementById('user-input');
let displayTask = document.querySelector('.display-task');
let taskLeft = document.getElementById('task-left');
let tasks = [];
let totalCountPending
let checkboxes
let divEle
let faPlus = document.querySelector('.fa-plus');
let index;

let completeAllTask = document.querySelector('.complete-all-task');


// call submitFunction() on click of plus icon
submit.addEventListener('click', submitFunction);

// call submitFunction() on click of enter button
userInput.addEventListener('keyup', (event)=>{
    if(event.key === 'Enter'){ // check if the event is enter
        submitFunction();
    }
});

// capture the value entered in the i/p box
function submitFunction(){
// create object, add user i/p and it's status in it
    let pertask = {
        name: userInput.value,
        status: 'pending',
    }

// created array named "tasks" and pushed the object "pertask" in it
    tasks.push(pertask);

    // call rendertask() to display i/p value
    renderTask();
}

// it will create div that will display the checkbox and values
function renderTask(){
    // empty the array, so that there is no repetition of entered values
    displayTask.innerHTML = '';

    //loop thru array, create div and add each value of array inside the div
    for(let i=0; i< tasks.length; i++){
        let taskName = tasks[i].name;

        //Note-dataIndex will be used to identify each value seperately
        divEle = `<div class="task">
        <input type="checkbox" class="checkbox" id="task${i}" data-index="${i}">
        <label for="task${i}">${taskName}</label>
        </div>`;
        // add the "divEle" div inside the "display-task" div of html
        displayTask.insertAdjacentHTML('beforeEnd', divEle);
    }

    // func to display total count
    pendingTaskCount();

    // Add event listeners to all the checkboxes with class checkbox
    checkboxes = document.querySelectorAll('.checkbox'); 
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });


}

// changes the display of total count on left side of footer 
function pendingTaskCount(){
    let pendingTasks = tasks.filter(task => task.status === 'pending');
    totalCountPending = pendingTasks.length;
    taskLeft.innerHTML = `${totalCountPending} task left`;
}

// Handles the changes made to checkboxes
function handleCheckboxChange(event){
    //get the index value of the checkbox in the array that is clicked
    index = event.target.getAttribute('data-index');

    // change the status of the task acc to checkbox state
    tasks[index].status = event.target.checked ? 'completed' : 'pending';
    
    // get the label according to the index value on which click was made
    let label = displayTask.querySelector(`label[for="task${index}"]`);

    // change the css of the task according to status
    if (tasks[index].status === 'completed') {
        label.style.textDecoration = "line-through";
    } else {
        label.style.textDecoration = "none";
    }

    //shows total in footer
    pendingTaskCount();
  
}

completeAllTask.addEventListener('click', (event) => {
// here status of all event should get converted to completed and all the checkboxes should get tick mark in it, as is the case when individial checkboxes are getting ticked
    for(let j = 0; j<tasks.length; j++){
        tasks[j].status = 'completed';
    }

    checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
    });
    console.log(tasks);
})