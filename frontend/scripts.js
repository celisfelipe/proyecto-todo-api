const API_URL = 'https://proyecto-todo-api-ko0b.onrender.com';

const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasks');

async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/api/tasks`);
    const tasks = await response.json();

    tasksContainer.innerHTML = '';

    if (tasks.length === 0) {
      tasksContainer.innerHTML = '<p>No hay tareas todavía.</p>';
      return;
    }

    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task';

      taskElement.innerHTML = `
        <h3>${task.title}</h3>

        <p>${task.description || 'Sin descripción'}</p>

        <p>
          Estado:
          ${task.completed ? 'Completada ✅' : 'Pendiente ⏳'}
        </p>

        <button onclick="toggleTask('${task._id}', ${task.completed})">
          ${task.completed ? 'Marcar pendiente' : 'Completar tarea'}
        </button>

        <button
          class="delete-btn"
          onclick="deleteTask('${task._id}')"
        >
          Eliminar
        </button>
      `;

      tasksContainer.appendChild(taskElement);
    });

  } catch (error) {
    tasksContainer.innerHTML =
      '<p>Error al cargar las tareas.</p>';

    console.error(error);
  }
}


taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    });

    if (!response.ok) {
      throw new Error('No se pudo crear la tarea');
    }

    taskForm.reset();

    loadTasks();

  } catch (error) {
    console.error(error);
    alert('Error al crear la tarea');
  }
});


async function toggleTask(id, completed) {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: !completed
      })
    });

    if (!response.ok) {
      throw new Error('No se pudo actualizar la tarea');
    }

    loadTasks();

  } catch (error) {
    console.error(error);
    alert('Error al actualizar la tarea');
  }
}


async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('No se pudo eliminar la tarea');
    }

    loadTasks();

  } catch (error) {
    console.error(error);
    alert('Error al eliminar la tarea');
  }
}


loadTasks();