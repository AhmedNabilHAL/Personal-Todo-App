export async function getTodos(){
    try{
        const todos = await sendRequest(`http://localhost:8888/api/v1/todos`, 'GET');
        return todos;
    }
    catch (error){
        return null;
    }
}

export async function getTodosByListId(list_id){
    try{
        const todos = await getTodos();
        return todos.filter((todo) => todo.todo_list_id === list_id);
    }
    catch(error){
        return null;
    }

}

export async function getTodo(todo_id){
    try{
        const todo = await sendRequest(`http://localhost:8888/api/v1/todos/${todo_id}`, 'GET');
        return todo;
    }
    catch (error){
        return null;
    }
}

export async function addTodo(todo_body){

    try{
        const todo = await sendRequest(`http://localhost:8888/api/v1/todos`, 'POST', todo_body);
        return todo;
    }
    catch (error){
        return null;
    }
}

export async function updateTodo(todo_id, updatedTodo){
    try{
        const todo = await sendRequest(`http://localhost:8888/api/v1/todos/${todo_id}`, 'PUT', updatedTodo);
        return todo;
    }
    catch (error){
        return null;
    }
}

export async function deleteTodo(todo_id){
    try{
        const reply = await sendRequest(`http://localhost:8888/api/v1/todos/${todo_id}`, 'DELETE');
        return reply;
    }
    catch (error){
        return null;
    }
}

/******************************************************************************/

export async function getTodoLists(){
    try{
        const todo_lists = await sendRequest(`http://localhost:8888/api/v1/todo_lists`, 'GET');
        return todo_lists;
    }
    catch (error){
        return null;
    }
}

export async function getTodoList(list_id){
    try{
        const todo_list = await sendRequest(`http://localhost:8888/api/v1/todo_lists/${list_id}`, 'GET');
        return todo_list;
    }
    catch (error){
        return null;
    }
}

export async function addTodoList(todo_list_body){
    try{
        const todo_list = await sendRequest(`http://localhost:8888/api/v1/todo_lists`, 'POST', todo_list_body);
        return todo_list;
    }
    catch (error){
        console.log(error);
        return null;
    }
}

export async function updateTodoList(todo_list_id, updated_todo_list){
    try{
        const todo_list = await sendRequest(`http://localhost:8888/api/v1/todo_lists/${todo_list_id}`,
         'POST', updated_todo_list);
        return todo_list;
    }
    catch (error){
        return null;
    }
}

export async function deleteTodoList(todoListId){
    try{
        const reply = await sendRequest(`http://localhost:8888/api/v1/todo_lists/${todoListId}`, 'DELETE');
        return reply;
    }
    catch (error){
        return null;
    }
}

async function sendRequest(url, method, body=null) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    var requestOptions = {
        credentials: "include",
        method: method,
        headers: headers,
    };
    if (body != null) {
        body = JSON.stringify(body);
        requestOptions['body'] = body;
    }
    

    try{
        const response = await fetch(url, requestOptions)
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error){
        console.log('error ', error);
    }
}