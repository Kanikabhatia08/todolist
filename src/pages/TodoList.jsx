import React, { useState } from 'react'

export const TodoList = () => {
    const [val, setVal] = useState({
        name:"",
        complete: false

    }); //name : input tag

    const [tasks, setTasks] = useState([]) // all the tasks

    console.log(tasks)
    const addTaskHandler =(event)=>{
        event.preventDefault();
        setTasks([...tasks, val]);
        setVal({...val,name:""});
    }


    const deleteTaskHandler =(index)=>{
        
        // let arr = []
        // tasks.filter(function(task,i) {
        //     if(i !== index){
        //         console.log(task,"tasssssskkkkkk iiiiiiii")
        //         arr.push(task)
        //     }
        //     return arr;
        // });
        // setTasks(arr)
        setTasks(tasks.filter((task, i) => i !== index))
        // console.log(tasks,"taskskkskkskksksksks")
        // console.log(index,"arrrrrrrrr")
    }

    const checkTaskHandler = (event,index)=>{
        const {checked} = event.target;
        console.log(event.target.checked,"kar");
        // setTasks(tasks.map((task,i) =>{
        //     if(i === index){
        //         task.complete = !checked
        //     }
        // }))
    }
    
    const toggleHandler = () =>{
        
    }

    function changeHandler(event){
        setVal( (prevdata) => (
            {
                ...prevdata,
                [event.target.name] : event.target.value
            }
        ))
    }


    return (
        <div className=''>
            <h1 className=' text-3xl '>TODO List</h1>
            <form onSubmit={addTaskHandler}>
                <input 
                    type='text'
                    name='name'
                    value={val.name}
                    placeholder='Enter a task'
                    onChange={changeHandler}
                /><br/>
                <button>Add Task</button>
            
            </form>
            {
                tasks.map((task, index)=>(
                    <div key={index} className=''>
                        <input type='checkbox' id='complete' name='complete'  onChange={(e) =>checkTaskHandler(e,index)}/>
                        <label htmlFor='checked'>{task.name} </label>
                        <button onClick={toggleHandler}>Edit </button>
                        <button onClick={()=>deleteTaskHandler(index)}>Delete </button>
                    </div>
                ))
            }
        </div>
        
    )
}
