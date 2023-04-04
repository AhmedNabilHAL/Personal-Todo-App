import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';


function TodoInput({ initialTodoValue = '', handleBlur = null, handleSubmit, autoFocus=false }) {
    let stopBlurFlag = false;
    const [todoValue, setTodoValue] = useState(initialTodoValue);
    const [windowSize, setWindowSize] = useState([0, 0]);

    const textAreaRef = useRef(null);
    const myFormRef = useRef(null);

    useLayoutEffect(() => {

        window.addEventListener('resize', () => setWindowSize([window.innerWidth, window.innerHeight]));

        return () => window.removeEventListener('resize', () => setWindowSize([window.innerWidth, window.innerHeight]));
    }, []);

    useEffect(() => {
        calculateTextAreaHeight(textAreaRef.current);
    }, [todoValue, windowSize]);

    function handleChange(event) {
        const val = event.target?.value;

        setTodoValue(val);
    };

    function onEnterPress(event) {
        if(myFormRef.current !== null && event.key === 'Enter' && event.shiftKey === false) {
            event.preventDefault();
            myFormRef.current?.requestSubmit();
        }
    }

    function calculateTextAreaHeight(textAreaRef){
        if (textAreaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;
    
            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            textAreaRef.style.height = scrollHeight + "px";
        }
    }

    function handleSubmitAndPrevendDefault(e) {
        console.log('submission in progress');
        e.preventDefault(); 
        setTodoValue('');

        if (todoValue === '') return;

        handleSubmit(todoValue);
    }

    return (
        <form ref={myFormRef} onSubmit={handleSubmitAndPrevendDefault} className='flex flex-row w-full items-center'>

            <div className='rounded-full bg-black bg-opacity-40 px-2 mr-2 md:mr-4'>
                <button type='submit'
                onMouseDown={() => stopBlurFlag = true }
                onMouseUp={() => stopBlurFlag = false }
                className="fa text-sm md:text-lg lg:text-2xl text-gray-400">
                    &#xf107;
                </button>
            </div>

            <textarea value={todoValue} name='todo' placeholder='E.g. What needs to be done?'
            onChange={handleChange} onKeyDown={onEnterPress}
            rows={1} ref={textAreaRef} autoComplete='off' autoFocus={autoFocus}
            onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            onBlur={() => { if (!stopBlurFlag && handleBlur !== null) handleBlur(todoValue);}}
            className='flex-1 w-full text-sm sm:text-base md:text-lg lg:text-2xl bg-white p-1 md:p-2
            bg-opacity-0 placeholder:text-gray-400 placeholder:italic overflow-hidden resize-none
            focus:bg-black focus:bg-opacity-40 outline-none' />
        </form>
    );
}

export default TodoInput;