const todoLists = document.querySelector(".todoLists");
        const listValue = document.querySelector(".todoValue");

        // Retrieve todos from localStorage or return an empty array if none exist
        const getTodosFromLocalStorage = () => {
            return JSON.parse(localStorage.getItem("todos")) || [];
        };

        // Save todos to localStorage
        const saveTodosToLocalStorage = (todos) => {
            localStorage.setItem("todos", JSON.stringify(todos));
        };

        // Render todos from localStorage
        const renderTodoList = () => {
            const todos = getTodosFromLocalStorage();
            todoLists.innerHTML = ''; // Clear existing list
            todos.forEach((todo, index) => {
                const liElement = document.createElement("li");
                liElement.textContent = todo;
                
                // Add click event to delete the todo item
                liElement.addEventListener("click", () => {
                    deleteTodo(index);
                });

                todoLists.appendChild(liElement);
            });
        };

        // Add a new todo
        const addTodo = () => {
            const todoText = listValue.value.trim();
            if (todoText !== "") {
                const todos = getTodosFromLocalStorage();

                // Check for duplicates
                if (todos.includes(todoText)) {
                    // Set placeholder to show duplicate message
                    listValue.value = "";
                    listValue.placeholder = "This todo already exists!";

                    // Reset placeholder after 2 seconds
                    setTimeout(() => {
                        listValue.placeholder = "Enter a todo";
                    }, 2000);

                    return;
                }

                todos.push(todoText);

                // Save updated todos to localStorage
                saveTodosToLocalStorage(todos);

                // Render the updated todo list
                renderTodoList();

                // Clear input field
                listValue.value = "";
            }
        };

        // Delete a todo by its index
        const deleteTodo = (index) => {
            const todos = getTodosFromLocalStorage();
            todos.splice(index, 1); // Remove the selected todo
            saveTodosToLocalStorage(todos); // Save updated todos
            renderTodoList(); // Re-render the todo list
        };

        // Event listener for the "Add Todo" button
        document.querySelector('.btn').addEventListener("click", addTodo);

        // Load and render todos from localStorage when the page loads
        window.onload = renderTodoList;