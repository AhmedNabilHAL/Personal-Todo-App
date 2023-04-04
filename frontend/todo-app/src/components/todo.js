import React, { useState } from 'react';
import TodoInput from './todo_input';

function Todo({ todoId, todo, handleSubmit }) {
  const [viewInputElem, setViewInputElem] = useState(false);
  const [isDone, setIsDone] = useState(false);

  function handleSubmitAndChangeView(todo) {
    setViewInputElem(false);
    handleSubmit(todoId, todo);
  }

  return (
    viewInputElem ? <TodoInput initialTodoValue={todo} handleSubmit={handleSubmitAndChangeView} autoFocus={true}
    handleBlur={(todo) => {
      setViewInputElem(false);
      handleSubmitAndChangeView(todo);
    }
  } /> :
    <li className='group w-full flex flex-row items-center py-1 md:py-2'>
      <input type="checkbox" checked={isDone} onChange={() => setIsDone(!isDone)} className='ml-2 mr-4 md:mr-6'/>

      <div className='cursor-pointer flex-1 w-full text-sm sm:text-base md:text-lg lg:text-2xl
      text-start overflow-auto pb-1 rounded-lg scrollbar-thin group-hover:opacity-60
      scrollbar-track-zinc-700 scrollbar-thumb-zinc-500 scrollbar-thumb-rounded-full duration-150'
      onDoubleClick={()=>setViewInputElem(true)}
      style={{textDecoration: isDone ? 'line-through': ''}}
      >{todo}</div>
    </li>
    
  );
}

export default Todo;