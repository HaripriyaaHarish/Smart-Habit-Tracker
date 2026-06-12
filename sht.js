document.addEventListener("DOMContentLoaded", () => {

    const goalInput = document.getElementById("goalInput");
    const addGoal = document.getElementById("addGoal");
    const daySelect = document.getElementById("daySelect");
    const goalList = document.getElementById("goalList");
    const progressBar = document.getElementById("progressBar");
    const percentage = document.getElementById("percentage");

    addGoal.addEventListener("click", addTask);


    loadTasks();

    function addTask() {

        const goalText = goalInput.value.trim();
        const day = daySelect.value;

        if (goalText === "") {
            alert("Please enter a goal");
            return;
        }
        if (day === selectedDay) {
            addTaskToDOM(goalText, day, false);
        }
        goalInput.value = "";

        saveTasks();
        updateProgress();
    }

    daySelect.addEventListener("change", () => {
        
        localStorage.setItem("selectedDay", daySelect.value)


        const selectedDay =
            localStorage.getItem("selectedDay") || "Monday";
console.log(selectedDay)
        daySelect.value = selectedDay
    })


    function addTaskToDOM(goalText, day, completed = false) {

        const li = document.createElement("li");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("task-info");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("custom-checkbox");
        checkbox.checked = completed;


        const taskText = document.createElement("span");
        taskText.innerText = `${day} : ${goalText}`;

        if (completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        checkbox.addEventListener("change", () => {

            if (checkbox.checked) {
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "gray";
            } else {
                taskText.style.textDecoration = "none";
                taskText.style.color = "black";
            }

            updateProgress();
            saveTasks();
        });

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(taskText);


        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", () => {

            if (editBtn.innerText === "Edit") {

                const inputBox = document.createElement("input");
                inputBox.type = "text";
                inputBox.value = taskText.innerText;

                leftDiv.replaceChild(inputBox, taskText);

                editBtn.innerText = "Save";

            } else {

                const inputBox =
                    leftDiv.querySelector("input[type='text']");

                taskText.innerText = inputBox.value;

                leftDiv.replaceChild(taskText, inputBox);

                editBtn.innerText = "Edit";

                saveTasks();
            }
        });


        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "X";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {

            li.remove();

            updateProgress();
            saveTasks();
        });

        const buttonGroup = document.createElement("div");

        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(leftDiv);
        li.appendChild(buttonGroup);

        goalList.appendChild(li);
    }

    function updateProgress() {

        const totalTasks =
            document.querySelectorAll("#goalList li").length;

        const completedTasks =
            document.querySelectorAll(
                "#goalList input[type='checkbox']:checked"
            ).length;

        let progress = 0;

        if (totalTasks > 0) {
            progress = Math.round(
                (completedTasks / totalTasks) * 100
            );
        }

        progressBar.style.width = progress + "%";
        percentage.innerText = progress + "% Completed";
    }


    function saveTasks() {

        const tasks = [];

        document.querySelectorAll("#goalList li").forEach(li => {

            const checkbox =
                li.querySelector("input[type='checkbox']");

            const text =
                li.querySelector("span");

            if (text) {

                tasks.push({
                    text: text.innerText,
                    completed: checkbox.checked
                });
            }
        });

        localStorage.setItem(
            "weeklyTasks",
            JSON.stringify(tasks)
        );
    }


    function loadTasks() {

        const savedTasks =
            JSON.parse(
                localStorage.getItem("weeklyTasks")
            ) || [];

        savedTasks.forEach(task => {

            const parts = task.text.split(" : ");

            const day = parts[0];
            const goal =
                parts.slice(1).join(" : ");

            addTaskToDOM(
                goal,
                day,
                task.completed
            );
        });

        updateProgress();
    }


    const quotes = [
        "Believe in yourself and all that you are.",
        "Success is the sum of small efforts repeated daily.",
        "Do something today that your future self will thank you for.",
        "Dream big. Start small. Act now.",
        "Stay positive, work hard, make it happen.",
        "Consistency is more important than perfection.",
        "Every day is a chance to improve.",
        "Small progress is still progress.",
        "Your only limit is your mind.",
        "Don't stop until you're proud."
    ];

    const quoteElement =
        document.getElementById("quote");

    let currentQuote = 0;

    function changeQuote() {

        currentQuote++;

        if (currentQuote >= quotes.length) {
            currentQuote = 0;
        }

        quoteElement.innerText =
            quotes[currentQuote];
    }

    setInterval(changeQuote, 3000);

});