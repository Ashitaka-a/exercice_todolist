// js/app.js

let todos = [];
let currentFilter = 'all'; // Valeur initiale du filtre

const form = document.querySelector('form');
const input = form.querySelector('input[name="title"]');
const list = document.querySelector('ul.list-group');
const filterButtons = document.querySelectorAll('[data-filter]');

// 🔧 Génère un ID unique
const generateId = () => Date.now().toString();

// 🔄 Met à jour l'affichage des tâches
function updateDisplay() {
    list.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'todo') return !todo.done;
        if (currentFilter === 'done') return todo.done;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo list-group-item d-flex align-items-center justify-content-between';

        const checkWrapper = document.createElement('div');
        checkWrapper.className = 'form-check';

        const checkbox = document.createElement('input');
        checkbox.className = 'form-check-input';
        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;
        checkbox.id = `todo-${todo.id}`;

        checkbox.addEventListener('change', () => {
            todo.done = checkbox.checked;
            updateDisplay();
        });

        const label = document.createElement('label');
        label.className = 'form-check-label ms-2';
        label.setAttribute('for', `todo-${todo.id}`);
        label.textContent = todo.title;

        if (todo.done) {
            label.classList.add('text-decoration-line-through', 'opacity-50');
        }

        checkWrapper.appendChild(checkbox);
        checkWrapper.appendChild(label);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.setAttribute('aria-label', 'Supprimer');
        deleteBtn.innerHTML = '<i class="bi-trash"></i>';

        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            updateDisplay();
        });

        li.appendChild(checkWrapper);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// ➕ Ajouter une nouvelle tâche
form.addEventListener('submit', event => {
    event.preventDefault();
    const title = input.value.trim();
    if (title === '') return;

    const newTodo = {
        id: generateId(),
        title: title,
        done: false
    };

    todos.push(newTodo);
    input.value = '';
    updateDisplay();
});

// 🎛 Gérer les filtres
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        updateDisplay();
    });
});

// Initialisation de l'affichage (optionnel si todos est vide)
updateDisplay();
