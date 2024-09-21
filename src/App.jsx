import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdEditNote } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function App() {
  let n = 10;
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = ()=>{
      setshowFinished(!showFinished);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveTols();
  };

  const handleDelete = (e, id) => {
    // let idx = todos.findIndex(item=>{
    //   return item.id === id;
    // })
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    // newTodos[idx].isCompleted = !newTodos[idx].isCompleted;
    settodos(newTodos);
    saveTols();
  };

  const handleAdd = (e) => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveTols();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let idx = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[idx].isCompleted = !newTodos[idx].isCompleted;
    settodos(newTodos);
    saveTols();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-3 max-w-[80vw] md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[30%]">
      <h1 className="font-bold text-center text-3xl">iTask - Manage your todos at one place</h1>
      <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg px-3 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length<3}

              className="bg-violet-700 hover:bg-violet-800 p-2 py-1 text-sm disabled:bg-violet-700 mx-2 font-bold text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>

        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 font-bold">No Todos to display</div>
          )}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex justify-between my-3"
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-green-600 hover:bg-green-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <MdEditNote />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <AiFillDelete />  
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
