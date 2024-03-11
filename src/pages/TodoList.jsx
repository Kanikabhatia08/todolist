import React, { useEffect, useState } from 'react'
import toast  from 'react-hot-toast';

export const TodoList = () => {

    const [val, setVal] = useState({
        name: "",
        complete: false,

    }); //name : input tag

    const [toggle, setToggle] = useState() //toggle[index] (edit/save)
    // console.log('toggle', toggle)

    const [editName, setEditName] = useState("")

    //storing in local storage
    const storedItems = () => {
        if(stored_tasks){
            return stored_tasks;
        }
        else{
            return [];
        }
    };
    const stored_tasks = JSON.parse(localStorage.getItem("stored_tasks"));
    console.log(stored_tasks,"tskskskk")
    const [tasks, setTasks] = useState(storedItems());

    useEffect (() =>{
        localStorage.setItem("stored_tasks", JSON.stringify(tasks));
    },[tasks])
  


    //Adding a task
    const addTaskHandler = (event) => {
        event.preventDefault();     
        if(val.name.length > 0){
            console.log(val.name.length,"vallllllllllll")
            setTasks([...tasks, val]);
            setVal({ ...val, name: "" });
        }
        else{
            toast.error("Task cannot be empty!")
        }
   
    }

    //Deleting a task
    const deleteTaskHandler = (index) => {
        // let arr = []
        // tasks.filter(function(task,i) {
        //     if(i !== index){
        //         console.log(task,"tasssssskkkkkk iiiiiiii")
        //         arr.push(task)
        //     }
        //     return arr;
        // });
        // setTasks(arr) // tasks.filter(function(task,i) {
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

    //check if the task is complete or not
    const checkTaskHandler = (event, index) => {
        // event.preventDefault();
        const { checked } = event.target;
        // console.log(event.target.checked,"kar");
        setTasks(tasks.map((task, i) => {
            // console.log(i, index, "iiiiiiiii")
            // console.log(task.complete, checked,"checkkkkkkkkkk")
            if (i === index) {
                task.complete = checked;
            }
            return task;
        }))
        console.log(tasks);
    }

    const clearHandler = ()=>{
        setTasks([]);
        localStorage.setItem("stored_tasks", JSON.stringify([]));
        alert("all task cleared")
    }

    function changeHandler(event) {
        setVal((prevdata) => (
            {
                ...prevdata,
                [event.target.name]: event.target.value
            }
        ))
    }

    //To edit a task
    function editHandler(index){
        setToggle(index);
        setEditName(tasks[index]?.name);
        // console.log(setVal)
    }

    //To save a task
    const saveHandler = () => {
        if (editName !== "") {
            setTasks(tasks.map((task, i) => i === toggle ? 
            {...task, name:editName}: {...task}));
            //tasks pe map chalaya, index match karaya fir task to destructure karke name nikal ke vo change kara otherwise vhi task destructure krke return kar dia
            // console.log(editName,"nameeeee")
            // console.log(tasks,"takssk")
            setToggle(null);
            setEditName("")
            setVal({ name: "", complete: false });
        }
        return val;
    }

    return (
        <div className=''>
            <h1 className=' text-4xl font-semibold '>TODO List</h1>
            <form onSubmit={addTaskHandler} className='flex gap-1 my-4'>
                <input
                    type='text'
                    name='name'
                    value={val.name}
                    placeholder='Enter a task'
                    onChange={changeHandler}
                    className='p-2 border-red-200 border-2 w-[80%]'
                /><br />
                <button className=' bg-pink-500 rounded-md p-2 my-1 '>Add Task</button>
                <button onClick={clearHandler} className=' bg-pink-500 rounded-md p-2 my-1 '>Clear all</button>
                

            </form>
        <div className='border-2 w-[80%]'>

            
            {
                tasks.map((task, index) => (
                    <div key={index} className='flex gap-2 items-center'>
                        <input 
                            type='checkbox' 
                            id='complete' 
                            name='complete' 
                            value={task.complete} 
                            checked={task.complete}
                            onChange={(e) => checkTaskHandler(e, index)} 
                            className='ml-3'/>

                        {
                            toggle === index?
                            
                            <div className='flex items-center gap-3 my-2'>
                                <input
                                    type='text'
                                    name='editName'
                                    value={editName}
                                    placeholder='Edit task'
                                    onChange={(e) =>{setEditName(e.target.value)}}
                                    className='px-3 h-[40px] w-full'
                                /><br />                                
                                <button className='px-3 h-[40px] bg-green-300 rounded-md' onClick={() => {saveHandler()}}>Save </button>
                                <button className='px-3 h-[40px] bg-pink-300 rounded-md'  onClick={()=>(setToggle(null))}>Cancel</button>
                            </div>

                            :
                            <div className='flex items-center'>
                                <label className='px-3 my-4 w-[18.5rem]' htmlFor='complete'>{task.name}</label>
                                <button className='px-3 h-[40px] bg-pink-300 rounded-md' onClick={() => { editHandler(index) }}>Edit</button>
                            </div>
                        }   
                        <button className='px-3 h-[40px] bg-red-400 rounded-md' onClick={() => deleteTaskHandler(index)}>Delete</button>

                    </div>
                ))
            }

        </div>
        <p className='text-right w-[80%]'>Total tasks : {tasks.length}</p>
        </div>
    )
}
