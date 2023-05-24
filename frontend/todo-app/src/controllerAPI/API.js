let todoLists = [
    {
        creatorId: 0,
        id: 1,
        listName: 'first list'
    },
    {
        creatorId: 0,
        id: 2,
        listName: 'second list'
    },
    {
        creatorId: 0,
        id: 3,
        listName: 'third list'
    },
    {
        creatorId: 0,
        id: 4,
        listName: 'fourth list'
    },
    {
        creatorId: 0,
        id: 5,
        listName: 'fifth list'
    },
]
let todos = [
    {
        id: 1,
        creatorId: 0,
        listId: 1,
        todo: 'Lorem ipsum dolor sit amet'
    },
    {
        creatorId: 0,
        id: 2,
        listId: 1,
        todo: "consectetur adipiscing elit"
    },
    {
        creatorId: 0,
        id: 3,
        listId: 1,
        todo: "sed do eiusmod tempor incididunt ut labore"
    },
    {
        creatorId: 0,
        id: 4,
        listId: 2,
        todo: 'et dolore magna aliqua. In fermentum posuere urna nec tincidunt. Cursus turpis massa tincidunt dui. Morbi non arcu risus quis varius.'
    },
    {
        creatorId: 0,
        id: 5,
        listId: 2,
        todo: 'Laoreet suspendisse interdum consectetur'
    },
    {
        creatorId: 0,
        id: 6,
        listId: 2,
        todo: 'liberobus nisl. Metus aliquam eleifend mi in'
    },
    {
        creatorId: 0,
        id: 7,
        listId: 3,
        todo: "Vestibulum rhoncus est pellentesque elit ullamcorper"
    },
    {
        creatorId: 0,
        id: 8,
        listId: 3,
        todo: "Egestas maecenas pharetra convallis"
    },
    {
        creatorId: 0,
        id: 9,
        listId: 3,
        todo: "osuere morbi leo urna. Magna eget est lorem ipsum dolor sit."
    }, 
    {
        creatorId: 0,
        id: 10,
        listId: 3,
        todo: "Metus dictum at tempor commodo ullamcorper"
    }, 
    {
        creatorId: 0,
        id: 11,
        listId: 3,
        todo: "a lacus vestibulum"
    }, 
    {
        creatorId: 0,
        id: 12,
        listId: 3,
        todo: "do"
    }, 
    {
        creatorId: 0,
        id: 13,
        listId: 3,
        todo: "Lacus viverra vitae congue eu consequat ac felis donec"
    }, 
    {
        creatorId: 0,
        id: 14,
        listId: 3,
        todo: "Purus ut faucibus pulvinar elementum integer enim"
    },
    {
        creatorId: 0,
        id: 15,
        listId: 4,
        todo: "Purus ut faucibus pulvinar elementum integer enim"
    }
]

export async function getTodos(){
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    // var raw = JSON.stringify({"username": evt.target.username.value,"password": evt.target.password.value});
   
    var requestOptions = {
        credentials: "include",
        method: 'GET',
        headers: headers
    };
    try{
        const response = await fetch(`http://localhost:8888/api/v1/todos`, requestOptions)
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error){
        console.log('error', error);
    }
}

export function getTodosByListId(listId){
    return todos.filter((todo) => todo.listId === listId);
}

export function getTodo(todoId){
    const filtered = todos.filter((todo) => todo.id === todoId);

    if (filtered.length) return filtered[0];
    return null;
}

export function addTodo(todo){

    todos.push(todo);
    return todo;
}

export function updateTodo(todoId, updatedTodo){
    todos = todos.map((todo) => todo.id === todoId ? updatedTodo : todo);
    return updatedTodo;
}

export function deleteTodo(todoId){
    todos = todos.filter((todo) => todo.id !== todoId);
    return true;
}

/******************************************************************************/

export async function getTodoLists(){
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    // var raw = JSON.stringify({"username": evt.target.username.value,"password": evt.target.password.value});
   
    var requestOptions = {
        credentials: "include",
        method: 'GET',
        headers: headers
    };
    try{
        const response = await fetch(`http://localhost:8888/api/v1/todo_lists`, requestOptions)
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error){
        console.log('error', error);
    }
    // return todoLists.filter((todoList) => todoList.creatorId === creatorId);
}

export function getTodoList(listId){
    const filtered = todoLists.filter((todoList) => todoList.id === listId);
    
    if (filtered.length) return filtered[0];
    return null;
}

export function addTodoList(todoList){
    todoLists.push(todoList);
    return todoList;
}

export function updateTodoList(todoListId, updatedTodoList){
    todoLists = todoLists.map((todoList) => todoList.id === todoListId ? updatedTodoList : todoList);
    return updatedTodoList;
}

export function deleteTodoList(todoListId){
    todoLists = todoLists.filter((todoList) => todoList.id !== todoListId);
    return true;
}

