// DOM elements
const taskForm = document.getElementById('task-form');
const confirmCloseDialog = document.getElementById('confirm-close-dialog');
const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById('close-task-form-btn');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const cancelBtn = document.getElementById('cancel-btn');
const discardBtn = document.getElementById('discard-btn');
const tasksContainer = document.getElementById('tasks-container');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');

// Global variables
const taskData = JSON.parse(localStorage.getItem('data')) || [];
let currentTask = {};

// Add or Update Task
const addOrUpdateTask = () => {
	addOrUpdateTaskBtn.innerText = 'Add Task';
	const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
	const taskObj = {
		id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
		title: titleInput.value,
		date: dateInput.value,
		description: descriptionInput.value,
	};

	if (dataArrIndex === -1) {
		taskData.unshift(taskObj);
	} else {
		taskData[dataArrIndex] = taskObj;
	}

	localStorage.setItem('data', JSON.stringify(taskData));
	updateTaskContainer();
	reset();
};

// Update Task Container
const updateTaskContainer = () => {
	tasksContainer.innerHTML = '';

	taskData.forEach(({ id, title, date, description }) => {
		tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Description:</strong> ${description}</p>
                <button onclick="editTask(this)" type="button" class="btn">Edit</button>
                <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
            </div>
        `;
	});
};
