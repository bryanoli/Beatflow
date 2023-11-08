import React, {useState} from 'react'

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
    <div>
      <h1>Todo App</h1>
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
      </div>
  )
}

export default App