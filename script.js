const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.text;
        if (task.done) li.classList.add("completed");

        li.onclick = () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            renderTasks();
        };

        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.className = "delete-btn";

        delBtn.onclick = (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

addBtn.onclick = () => {
    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        done: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
};

renderTasks();
