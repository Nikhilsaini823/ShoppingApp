import React,{ useState, useEffect }  from 'react'
import { Addtodo } from './Addtodo'
import { Footer } from './Footer';
import Headers from './Headers';
import { Todos } from './Todos';

export const Home = () => {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
    const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

    const onDelete = (todo) => {    
        setTodos(
          todos.filter((e) => {
            return e !== todo;
          })
        );
        localStorage.setItem("todos", JSON.stringify(todos));
      };

      const addTodo = (title, desc) => {
        let srno;
        if (todos.length === 0) {
          srno = 0;
        } else {
          srno = todos[todos.length - 1].srno + 1;
        }
        const myTodo = {
          srno: srno,
          title: title,
          desc: desc,
        };
        setTodos([...todos, myTodo]);
        console.log(myTodo);
      };
      
      

  return (
    <div>
        <Headers />
        <Addtodo addTodo={addTodo}/>
        <Todos todos={todos} onDelete={onDelete} />
        <Footer />
    </div>
  )
}
export default Home;
