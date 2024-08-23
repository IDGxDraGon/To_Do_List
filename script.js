document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const formatText = (text) => {
    const maxCharsPerLine = 30;
    const maxLines = 5;

    // Split the text into lines of maxCharsPerLine length
    let formattedText = "";
    for (let i = 0; i < text.length; i += maxCharsPerLine) {
      formattedText += text.substring(i, i + maxCharsPerLine) + "\n";
    }

    // Truncate to maxLines
    const lines = formattedText.split("\n").slice(0, maxLines);
    return lines.join("\n");
  };

  const renderTasks = () => {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.toggle("complete", task.completed);

      // Format the task text
      const formattedText = formatText(task.text);

      li.innerHTML = `
                  <span>${formattedText}</span>
                  <div>
                      <button class="complete-btn">Complete</button>
                      <button class="delete-btn">Delete</button>
                  </div>
              `;

      li.classList.add("hidden");
      setTimeout(() => li.classList.remove("hidden"), 10);

      li.querySelector(".complete-btn").addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      list.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      input.value = "";
    }
  });

  renderTasks();
});
