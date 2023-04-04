import Todo from './todo';
import TodoInput from './todo_input';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { getTodosByListId, addTodo, updateTodo} from '../controllerAPI/mockAPI';
import { ReactComponent  as ReactLogoTrash } from '../assets/trash-solid.svg'
import { useUserContext } from './user_context';



function TodoList({ listId, handleDeleteTodoList }) {
  const listRef = useRef(null);
  const [todos, setTodos] = useState([]);
  const user = useUserContext();

  function handleAddTodo(todo){
    console.log('new todo');

    const newTodo = {id: todos.length + 1, creatorId: user, listId: listId, todo};
    addTodo(newTodo);

    setTodos(todos => [...todos, newTodo]);
  }

  function handleUpdateTodo(todoId, todo){
    console.log('update todo: ' + todoId);

    const updatedTodo = {id: todoId, creatorId: user, listId: listId, todo};
    updateTodo(todoId, updatedTodo);

    setTodos(todos => todos.map((todo) => todo.id === todoId ? updatedTodo : todo));
  }

  function handleSubmit(todo) {
    flushSync(() => handleAddTodo(todo));

    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  useState(() => {
    const fetchData = async () => {
      setTodos(getTodosByListId(listId));
    };

    fetchData();
  }, []);
    
  return (
    
    <div className='bg-white bg-opacity-10 border-2 md:border-4 border-black border-opacity-20
    pl-2 md:pl-4 pb-2 w-full snap-center
    scrollbar-thin scrollbar-track-zinc-700  scrollbar-thumb-zinc-500 scrollbar-thumb-rounded-full'>
      <TodoInput handleSubmit={handleSubmit} />
      <div className='w-full border-t-2 md:border-t-4 border-black border-opacity-20'></div>
      {todos.length !== 0 && <ul ref={listRef} className='divide-y-2 md:divide-y-4 divide-black divide-opacity-20
      border-b-2 md:border-b-4 border-black border-opacity-20'>
        {todos.map(({ id, todo }) => {
          return <Todo key={id} todoId={id} todo={todo} handleSubmit={handleUpdateTodo} />;
        })}
      </ul>}
      <button type='submit' onClick={() => handleDeleteTodoList(listId)}
      className='group rounded-lg w-1/2 bg-black hover:bg-red-500
      bg-opacity-40 py-1 sm:py-2 mx-auto my-2 md:my-4 grid grid-cols-3 duration-150'>
        <ReactLogoTrash className='w-2 sm:w-4 h-4 md:h-5 mx-4 fill-white 
        group-hover:fill-black opacity-40 group-hover:opacity-60 
        row-span-full col-start-1 col-end-1 duration-150' />
        <p className='text-xs sm:text-base row-span-full col-start-2 
        col-end-3 group-hover:text-black opacity-40 group-hover:opacity-60 
        font-bold duration-150'>Delete</p>
      </button>
    </div>
  );
}

export default TodoList;