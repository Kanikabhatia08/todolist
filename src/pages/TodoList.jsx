import React, { useState } from 'react'

export const TodoList = () => {
    const [val, setVal] = useState({
        name: "",
        complete: false,

    }); //name : input tag
    const [toggle, setToggle] = useState()

    console.log('toggle', toggle)
    const [editName, setEditName] = useState()

    const [tasks, setTasks] = useState([]) // all the tasks

    console.log(tasks)
    const addTaskHandler = (event) => {
        event.preventDefault();
        setTasks([...tasks, val]);
        setVal({ ...val, name: "" });
    }


    const deleteTaskHandler = (index) => {

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

    const checkTaskHandler = (event, index) => {
        const { checked } = event.target;
        // console.log(event.target.checked,"kar");
        setTasks(tasks.map((task, i) => {
            // console.log(i, index, "iiiiiiiii")
            // console.log(task.complete, checked,"checkkkkkkkkkk")
            if (i === index) {
                task.complete = checked
            }
            return task;
        }))
        console.log(tasks);
    }

    function changeHandler(event) {
        setVal((prevdata) => (
            {
                ...prevdata,
                [event.target.name]: event.target.value
            }
        ))
    }

    function editHandler(index){
        setToggle(index);
        setVal({ ...tasks[index] });
        // console.log(setVal)
    }

    const saveHandler = () => {
        if (val.name !== "") {
            setTasks(tasks.map((task, i) => i === toggle ? val : task));
            // console.log(toggle)
            setToggle(null);
            setVal({ name: "", complete: false });
        }
        return val
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
                    className='m-1'
                /><br />
                <button className=' bg-pink-500 rounded-md p-2 '>Add Task</button>

            </form>
            {
                tasks.map((task, index) => (
                    <div key={index} className='flex border-2'>
                        <input 
                            type='checkbox' 
                            id='complete' 
                            name='complete' 
                            value={task.complete} 
                            onChange={(e) => checkTaskHandler(e, index)} 
                            className='m-1'/>

                        {
                            toggle === index?
                            
                            <div className='flex'>
                                <input
                                    type='text'
                                    name='editName'
                                    value={editName}
                                    placeholder='Edit task'
                                    onChange={changeHandler}
                                    className='mx-2'
                                /><br />                                
                                <button className='p-2 bg-pink-300 rounded-md' onClick={() => {saveHandler()}}>Save </button>
                                <button style={{ margin: "20px" }}  onClick={()=>(setToggle(null))}>Cancel</button>
                            </div>

                            :
                            <div>
                                <label htmlFor='complete'>{task.name}</label>
                                <button style={{ margin: "20px" }} onClick={() => { editHandler(index) }}>Edit</button>

                            </div>
                        }   
                        <button onClick={() => deleteTaskHandler(index)}>Delete</button>
                    </div>
                ))
            }
        </div>y
    )
}
