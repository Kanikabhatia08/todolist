import React from 'react'

export const TodoList = () => {
    return (
        <div className=''>
            <h1 className=' text-3xl '>TODO List</h1>
            <input 
                type='text'
                name='task'
                placeholder='Enter a task'
            /><br/>
            <button>Add Task</button>
        </div>
    )
}
