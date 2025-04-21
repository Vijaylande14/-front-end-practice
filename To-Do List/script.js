function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText === '') return;
  
    const task = { text: taskText, done: false };
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    input.value = '';
  }
  
  function removeTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  
  function toggleDone(index) {
    const tasks = getTasks();
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      if (task.done) li.classList.add('done');
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="actions">
          <button class="done-btn" onclick="toggleDone(${index})">Done</button>
          <button onclick="removeTask(${index})">Delete</button>
        </div>
      `;
      list.appendChild(li);
    });
  }
  
  // Dark mode toggle
  const toggle = document.getElementById('darkModeToggle');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });
  
  // Initialize app
  window.onload = () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.body.classList.add('dark');
      toggle.checked = true;
    }
    renderTasks();
  };
  