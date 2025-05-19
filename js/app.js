// let todos = [];
// let loginForm = document.getElementById("todoForm"); // récupère l'ID todoForm dans le HTML //
// let todoInput = document.getElementById("title"); // récupère l'ID title dans le HTML //
// let todosContainer = document.querySelector(".list-group"); // récupère la classe list-group du HTML ; TOUJOURS METTRE UN POINT DEVANT LES CLASS AVEC LE QUERY SELECTOR //

// loginForm.addEventListener("submit", function(e){ //on met sur le loginForm un submit pour envoyer le contenu, on met la fonction e et on lui applique en dessous un preventDefault//
//     e.preventDefault();
//     const todoTitle = todoInput.value.trim(); // on récupère la constante créee au dessus et on vérifie qu'il n'y est pas d'espace vide dans le champ //
//     if (todoTitle !== ""){ // si todoTitle est STRICTEMENT vide (avec le "" qui est vide du coup) //
//         const tache = { // on crée une tâche et on lui importe : //
//             id: Date.now(), // récupère la date du jour pour avoir un id unique //
//             title: todoTitle,
//             done: false
//         };

//         todos.push(tache); // on ajoute au tableau la tâche qu'on vient de créer //
//         todoInput.value = ""; //quand la tâche est envoyé on remet la valeur a O "" ce qui enlève le texte qui a été mis dans le champ de texte juste avant //
//         updateDisplay();
//     }
// });

// function updateDisplay(){
//     todosContainer.innerHTML = null;
//     todos.forEach(function(tache){ //on boucle sur le tableau TODO et on récupère chaques taches du tableau TODO //
//         addTodoToDom(tache) // il va boucler autant de fois que tu as de tâches (la fonction est juste en dessous //
//     }) 
// }

// function addTodoToDom(tache){
//     const li = document.createElement("li"); // on crée une balise li qui n'est pas injécté et on va lui donner du HTML par la suite //
//     li.className = "todo list-group-item d-flex align-items-center justify-content-between" // le HTML est donné ici //
//     li.innerHTML = `
//     <div class="form-check">
//         <input class="form-check-input" type="checkbox" id="${tache.id}" ${tache.done ? "checked" : ""}> 
//             <label class="form-check-label ms-2" for="${tache.id}">
//                 ${tache.title}
//             </label>
//     </div>
//         <button class="btn btn-danger btn-sm" aria-label="Supprimer">
//             <i class="bi-trash"></i>
//         </button>`

//         const checkboxInput = li.querySelector("input[type=checkbox]"); // récupère un champ HTML directement sans spécifier de classe directement avec des points //
//         checkboxInput.addEventListener("click", function(){ // function sans rien dans les parenthèses = fonction autonome //
//             setCheckedTodo(tache.id); // on appelle une fonction qui va s'occuper de mettre toute 

//         });
//         if (tache.done === true){
//             li.classList.add("opacity-50");
//             li.querySelector("label").classList.add("text-decoration-line-through")
//         }

//         const deleteBtn = li.querySelector(".btn-danger");
//         deleteBtn.addEventListener("click", function(){
//             deleteTodo(tache.id);
//         });

//     todosContainer.prepend(li); // prepend permet d'ajouter le 'li' avant, donc on le voit en haut de la liste sur la page web //
// }
    
// function setCheckedTodo(id){ // on gère dans cette fonction la case à cocher //
//     let todo = todos.find(function(todo){
//         return todo.id === id; //stop la ligne si elle trouve une tâche avec un id identique avec celui qu'on vient de cocher// 
//     });

//     if (todo){
//         if (todo.done === true){ // quand on arrive pour savoir si la tâche est effectué ou non on inverse l'état coché //
//             todo.done = false;
//         } else {
//             todo.done = true;
//         }
//     }
//     updateDisplay(); // on appelle la fonction qui met à jour l'affichage //
// }

// function deleteTodo(id){
//     todos = todos.filter(function(todo){
//         return todo.id !== id; 
//     });
    
//     updateDisplay();
// }
 















// CORRECTION LAURENT //

        // 1) Créer un tableau de tâches
        let todos = [];

        // Ajout du container qui contient les todos
        const todosContainer = document.querySelector('.list-group');

        // Ajout du champs input qui contient le titre de la toto
        const todoInput = document.querySelector('#title')

        // Soumettre le formulaire
        const loginForm = document.getElementById("todoForm");

        // 2) Ajouter une tâche
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Todo Dom Purify
            const todoTitle = todoInput.value.trim();

            // 2) Ajouter une tâche
            if (todoTitle !== "") {
                const tache = {
                    id: Date.now(),
                    title: todoTitle,
                    done: false
                };

                // 2) Ajouter une tâche
                // Reset input
                todoInput.value = "";

                // 2) Ajouter une tâche
                // Ajoute au tableau
                todos.push(tache);

                // 3.1) Afficher les tâches dans le DOM
                // Réaffiche tout
                updateDisplay();
            }
        });


        // 3) Afficher les tâches dans le DOM
        // Fonction qui met à jour l'affichage du DOM
        function updateDisplay() {
            // 3.1
            // On vide le container
            todosContainer.innerHTML = ""; // ou null;

            // 3.1
            // On boucle sur chaque todo
            todos.forEach(function(tache) {
                // On ajoute chaque tache dans le DOM
                addTodoToDom(tache);
            });
        }

        // 3.2) Afficher les tâches dans le DOM
        function addTodoToDom(tache) {

            // 3.2) Afficher les tâches dans le DOM
            const li = document.createElement('li');

            li.className = "todo list-group-item d-flex align-items-center justify-content-between";
            li.innerHTML = `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="${tache.id}" ${tache.done ? "checked" : ""}>
                        <label class="form-check-label ms-2" for="${tache.id}">
                            ${tache.title}
                        </label>
                    </div>
                    <button class="btn btn-danger btn-sm" aria-label="Supprimer">
                        <i class="bi-trash"></i>
                    </button>`;

            // 4) Gérer la tâche cochée
            // Sélectionne le champs input[type="checkbox"]
            const checkBoxInput = li.querySelector('input[type="checkbox"]');
            
            // Ajoute l'event "checked"
            checkBoxInput.addEventListener('click', function() {
                setCheckedTodo(tache.id);
            });

            // Si la tâche est effectuée, on la coche visuellement
            if (tache.done) {
                // Opacité
                li.classList.add("opacity-50");

                // texte barré sur label
                li.querySelector('label').classList.add("text-decoration-line-through");
            }

            // 5) Supprimer une tâche
            // Sélectionner le bouton supprimer
            const deleteBtn = li.querySelector('.btn-danger');
            // Ajoute l'event click sur le bouton delete
            deleteBtn.addEventListener('click', function() {
                deleteTodo(tache.id);
            });

            // 2) Ajouter une tâche
            // Ajoute au DOM en haut de la liste
            todosContainer.prepend(li);

            // ou Ajoute au DOM en base de la liste
            // todosContainer.appendChild(li);
        }

        // 4) Gérer la tâche cochée
        // Gérer la case à cocher des todos
        function setCheckedTodo(id) {
            // Find, c’est une méthode qui parcourt le tableau et renvoie le premier élément qui correspond à un test.
            // La fonction autonome à l'intérieur teste chaque élément du tableau, et dit :
            // “Est-ce que l’id de cette tâche est égal à celui que je cherche ?”
            // Si elle trouve une tâche avec le bon id, elle la renvoie (stockée dans la variable todo).
            // Sinon, todo vaudra undefined.
            const todo = todos.find(function(todo) {
                return todo.id === id;
            });

            if (todo) {

                // Trouver le <li> associé dans le DOM pour le cocher visuellement
                // const li = document.querySelector(`li input[id="${todo.id}"]`).closest('li');
                
                // On inverse l'état (coché ou non)
                if (todo.done === true) {
                    todo.done = false;
                } else {
                    todo.done = true;
                }

                // identique à faire ça
                // todo.done = !todo.done;
                
                // On met à jour l'affichage
                updateDisplay();
            }
        }

        // 5) Supprimer une tâche
        // Fonction qui supprime une tâche du DOM et du tableau
        function deleteTodo(id) {

            // Crée un nouveau tableau sans la tâche à supprimer
            todos = todos.filter(function(todo) {
                return todo.id !== id;
            });

            // Réaffiche la liste mise à jour
            updateDisplay();
        }