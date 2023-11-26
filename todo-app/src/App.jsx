import React, {Component, useState} from 'react'
import Nav from './components/nav';
import Home from "./pages/Home";
import Discover from "../user-pages/Discover";
import Favorites from "../user-pages/Favorites";
import Settings from "../user-pages/Settings";
import {Route, Routes} from "react-router-dom";

function App() {
  const [list, setList] = useState([]); //empty useState array
  const [input, setInput] = useState(""); // empty useState string
  //Adding a todo
  const addTodo = (todo) => {
    //creating new todo
    const newTodo = {
      //unique id
      id: Math.random(),
      todo: todo,
    };
    //add todo to the list
    setList([...list, newTodo]);
    //clear input
    setInput("");
  };

  //delete todo function
  const deleteTodo = (id) => {
    //filtering out the todo with the id
    const updatedList = list.filter((todo) => todo.id !== id);

    setList(updatedList);
  }

  return (
    <>
    <Nav />
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Discover' element={<Discover/>} />
        <Route path='/Favorites' element={<Favorites/>} />
        <Route path='/Settings' element={<Settings/>} />
      </Routes>
    </div>
    {/* <div>
      <input type="text" value={input} 
      onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={()=> addTodo(input)}>Add</button>
      <ul>
        {list.map((todo)=> (
          <li key={todo.id}>
            {todo.todo}
            <button onClick={()=> deleteTodo(todo.id)}>&times;</button>
            </li>
        )
        )}
      </ul>
      </div> */}
    </>

  )
}

export default App