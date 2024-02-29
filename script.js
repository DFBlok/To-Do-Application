//CRUD

let getData = JSON.parse(localStorage.getItem('todos'));

let todos = getData;

/* let todos = [
            {id:1, title: "lets go walk", dueDate: "2024-02-28"}, 
            {id:2, title: "lets go shoping", dueDate: "2024-02-29"},
]; */


//add
let btn = document.getElementById("btn");

btn.addEventListener("click", addTodo);

function storeData(){
    localStorage.setItem('todos', JSON.stringify(todos))
}

function addTodo(){
    let title = document.getElementById("title").value;
    let dueDate = document.getElementById("dueDate").value;
    //save info to todo function
    let id = new Date().getTime();
    todos.push({ id: id, title: title, dueDate: dueDate});
    storeData();
    render();
}

//update
let indexValue;

function updateTodo(e){
    e.preventDefault();
    let id = Number(e.target.id);
    let data = todos.filter((todo, index)=>{
        indexValue = index;
        return todo.id === id;
    });
    document.getElementById("title").value = data[0].title;
    //hide save button and bring up update button
    document.getElementById("btn");
    document.getElementById("btn").style = "display:none";
    let ubtn = document.createElement("button");
    ubtn.textContent = "Save Update"; 
    ubtn.id = "updateId";
    ubtn.style = "margin-left:12px; margin-top:12px";
    ubtn.onclick = saveTodo;
    
    //call button after save hidden
    let form = document.getElementById("form");
    form.append(ubtn);
}

function saveTodo(){
    document.getElementById("updateId").style = "display:none";
    document.getElementById("btn").style = "display:block";
    let title = document.getElementById("title").value;
    let obj = todos[indexValue]

    todos[indexValue] = {...obj, title:title}
    storeData();
    document.getElementById("title").value = "";
    render();
}

//delete
function deleteTodo(e){
    let id = Number(e.target.id);
    todos = todos.filter((todo)=>todo.id !== id)
    storeData();
    render();
}


//view-read-display
const render = function(){
    document.getElementById('render').innerHTML = ""; //wipeout everthing displaying in box
    todos.map((todo)=>{
        let div = document.createElement("div");
        div.textContent  = todo.title + " " + todo.dueDate;
        let render = document.getElementById('render');
        //update button
        let updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.id = todo.id;
        updateBtn.style = "margin-left:12px; margin-top:12px";
        updateBtn.onclick = updateTodo;
        div.append(updateBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = todo.id;
        deleteBtn.style = "margin-left:12px; margin-top:12px";
        deleteBtn.onclick = deleteTodo;
        div.append(deleteBtn);

        render.append(div);
    });
};

render();