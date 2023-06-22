import { useEffect, useState} from "react";
import axios from "axios";
import "./TodoList.css"

const TodoList = () => {
    
    const [todoData, setTodoData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTodoData = async () => {
        try{
            setLoading(true);
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");
            setTodoData(data);
        } catch (error){
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchTodoData()
    }, []);

    const renderTodoData = () => {
        if(loading || !todoData.length){
            return <h3>Carregando...</h3>
        }
        return (
            <div className="cardContainer">
                <h3>Dados do Todo List's:</h3>
                {todoData.map(todo => (
                    <div key={todo.id}>
                        <h4>Id: {todo.id}</h4>
                        <h4>UserId: {todo.userId}</h4>
                        <h4>Title: {todo.title}</h4>
                        <p>Completed: {todo.completed ? "True" : "False"}</p>
                        <hr></hr>
                    </div>
                ))}
            </div>
        )
    }

    return (

        <div className="container">
            <h2>Listagem dos usuários do Todo List:</h2>
            {renderTodoData()}
        </div>
        
    );
}

export default TodoList;