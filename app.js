document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => renderTask(task.text, task.completed));
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll(".todo-item").forEach(item => {
            tasks.push({
                text: item.querySelector(".task-text").textContent,
                completed: item.classList.contains("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const renderTask = (text, completed = false) => {
        const li = document.createElement("li");
        li.className = `todo-item ${completed ? "completed" : ""}`;

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = text;
        span.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(span);
        li.appendChild(button);
        todoList.appendChild(li);
    };

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            renderTask(taskText);
            saveTasks();
        }
        todoInput.value = "";
    });

    loadTasks();
});
