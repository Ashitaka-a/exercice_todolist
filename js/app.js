let todos = [];
let loginForm = document.getElementById("todoForm"); // récupère l'ID todoForm dans le HTML //
let todoInput = document.getElementById("title"); // récupère l'ID title dans le HTML //
let todosContainer = document.querySelector(".list-group"); // récupère la classe list-group du HTML ; TOUJOURS METTRE UN POINT DEVANT LES CLASS AVEC LE QUERY SELECTOR //

loginForm.addEventListener("submit", function(e){ //on met sur le loginForm un submit pour envoyer le contenu, on met la fonction e et on lui applique en dessous un preventDefault//
    e.preventDefault();
    const todoTitle = todoInput.value.trim(); // on récupère la constante créee au dessus et on vérifie qu'il n'y est pas d'espace vide dans le champ //
    if (todoTitle !== ""){ // si todoTitle est STRICTEMENT vide (avec le "" qui est vide du coup) //
        const tache = { // on crée une tâche et on lui importe : //
            id: Date.now(), // récupère la date du jour pour avoir un id unique //
            title: todoTitle,
            done: false
        };

        todos.push(tache); // on ajoute au tableau la tâche qu'on vient de créer //
        todoInput.value = ""; //quand la tâche est envoyé on remet la valeur a O "" ce qui enlève le texte qui a été mis dans le champ de texte juste avant //
        updateDisplay();
    }
});

function updateDisplay(){
    todosContainer.innerHTML = null;
    todos.forEach(function(tache){ //on boucle sur le tableau TODO et on récupère chaques taches du tableau TODO //
        addTodoToDom(tache) // il va boucler autant de fois que tu as de tâches (la fonction est juste en dessous //
    }) 
}

function addTodoToDom(tache){
    const li = document.createElement("li"); // on crée une balise li qui n'est pas injécté et on va lui donner du HTML par la suite //
    li.className = "todo list-group-item d-flex align-items-center justify-content-between" // le HTML est donné ici //
    li.innerHTML = `
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="${tache.id}" ${tache.done ? "checked" : ""}> 
            <label class="form-check-label ms-2" for="${tache.id}">
                ${tache.title}
            </label>
    </div>
        <button class="btn btn-danger btn-sm" aria-label="Supprimer">
            <i class="bi-trash"></i>
        </button>`

        const checkboxInput = li.querySelector("input[type=checkbox]"); // récupère un champ HTML directement sans spécifier de classe directement avec des points //
        checkboxInput.addEventListener("click", function(){ // function sans rien dans les parenthèses = fonction autonome //
            setCheckedTodo(tache.id); // on appelle une fonction qui va s'occuper de mettre toute 

        });
        if (tache.done === true){
            li.classList.add("opacity-50");
            li.querySelector("label").classList.add("text-decoration-line-through")
        }

        const deleteBtn = li.querySelector(".btn-danger");
        deleteBtn.addEventListener("click", function(){
            deleteTodo(tache.id);
        });

    todosContainer.prepend(li); // prepend permet d'ajouter le 'li' avant, donc on le voit en haut de la liste sur la page web //
}
    
function setCheckedTodo(id){ // on gère dans cette fonction la case à cocher //
    let todo = todos.find(function(todo){
        return todo.id === id; //stop la ligne si elle trouve une tâche avec un id identique avec celui qu'on vient de cocher// 
    });

    if (todo){
        if (todo.done === true){ // quand on arrive pour savoir si la tâche est effectué ou non on inverse l'état coché //
            todo.done = false;
        } else {
            todo.done = true;
        }
    }
    updateDisplay(); // on appelle la fonction qui met à jour l'affichage //
}

function deleteTodo(id){
    todos = todos.filter(function(todo){
        return todo.id !== id; 
    });
    
    updateDisplay();
}