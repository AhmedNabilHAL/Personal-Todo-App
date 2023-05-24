import React, { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import TodoList from './todo_list';
import { getTodoLists, addTodoList, deleteTodoList } from '../controllerAPI/API';
import NavButton from './navButton';
import { ReactComponent  as ReactLogoAdd } from '../assets/plus-solid.svg'
import { useUserContext } from './user_context';
import { useNavigate } from 'react-router-dom';


function TodoLists() {
  const [todoLists, setTodoLists] = useState([]);
  const listRef = useRef(null);
  const user = useUserContext();
  const navigate = useNavigate();

  const disabled = (todoLists.length === 0)

  function handleAddTodoList(listName){
    console.log('new todo list');

    const newTodoList = {
      creatorId: user,
      id: todoLists.length + 1,
      listName,
    }

    addTodoList(newTodoList);

    flushSync(() => setTodoLists(prevTodoLists => [...prevTodoLists, newTodoList]));

    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  function handleDeleteTodoList(todoListId){
    console.log('delete todo list: ' + todoListId);
    // scrollToNextPage();

    const status = deleteTodoList(todoListId);
    if (status){
      setTodoLists(prevtodoLists => prevtodoLists.filter((todoList) => todoList.id !== todoListId));
    }
  }

  function scrollToNextPage(){
    const gallery_item_size = listRef.current.querySelector('div').clientWidth;
    listRef.current.scrollTo({left: listRef.current.scrollLeft + gallery_item_size,
      behavior: 'smooth'});
  }

  function scrollToPrevPage(){
    const gallery_item_size = listRef.current.querySelector('div').clientWidth;
    listRef.current.scrollTo({left: listRef.current.scrollLeft - gallery_item_size,
      behavior: 'smooth'})  
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetched_todo_lists = await getTodoLists(user);
      setTodoLists(fetched_todo_lists);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (user === null)
      navigate("/auth");
  }, [user, navigate]);
  

  return (
    <div className='bg-black bg-opacity-40 px-1 sm:px-4 py-4 grid grid-cols-3 grid-rows-6
    h-[50vh] rounded-lg'>
      <NavButton direction={'left'} handleScroll={scrollToPrevPage} disabled={disabled} />
      <ul ref={listRef} className='row-span-full col-span-full overflow-y-hidden overflow-x-auto grid grid-flow-col
      auto-cols-[100%] gap-[15%] px-[10%] pb-4 snap-x snap-mandatory 
      scrollbar-thin scrollbar-track-zinc-700  scrollbar-thumb-zinc-500 scrollbar-thumb-rounded-full'>
        {todoLists.map(todoList => 
          <TodoList key={todoList.id} listId={todoList.id} handleDeleteTodoList={handleDeleteTodoList} />
        )}
      </ul>
      <NavButton direction={'right'} handleScroll={scrollToNextPage} disabled={disabled} />
      <button type='submit' 
      onClick={handleAddTodoList}
      className='group rounded-lg bg-black hover:bg-blue-700 w-[25%]
      bg-opacity-40 h-[16%] z-50 ml-auto sticky top-[30%] row-span-full col-start-3 col-end-3 duration-150'>
        <ReactLogoAdd className='w-2 sm:w-4 h-4 md:h-5 mx-auto
        fill-white group-hover:fill-black opacity-40 group-hover:opacity-60 duration-150' />
      </button>
    </div>
    
    
  );
}

export default TodoLists;