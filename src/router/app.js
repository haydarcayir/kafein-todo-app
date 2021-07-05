import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import TodoListItem from "../components/todo-list-item";
import Loading from "../components/loading";
import AddTodo from "../components/add-todo";

import {
  useGetTodoFetcher,
  usePostTodoFetcher,
  usePutTodoFetcher,
  useDeleteToDoFetcher,
} from "../hooks/todoFetcher";

function App() {
  const [todo, setTodo] = useState("");
  const [editedToDoState, setEditedToDoState] = useState({
    text: "",
    id: null,
  });

  const [toDoListState, getToDoList] = useGetTodoFetcher();
  const [postTodo] = usePostTodoFetcher();
  const [updateTodoState, updateTodo] = usePutTodoFetcher();
  const [deleteToDoState, deleteToDo] = useDeleteToDoFetcher();

  useEffect(() => {
    getToDoList();
  }, []);

  const handleClickCheckbox = (event) => {
    const updatedItem = toDoListState.data.find(
      (item) => item.id === +event.target.id
    );
    updatedItem.isCompleted = event.target.checked;
    updateTodo(updatedItem);
  };

  const handleClickAddTodo = (event) => {
    event.preventDefault();

    const isTodoExistList = toDoListState.data.some(
      (item) => item.text === todo.trim()
    );
    if (isTodoExistList) {
      alert("No duplicated todo");
    } else {
      postTodo(todo.trim());
    }
    setTodo("");
  };

  const handleChangeTodo = (event) => {
    setEditedToDoState({ text: event.target.value, id: +event.target.id });
  };

  const handleUpdateTodo = () => {
    const editedTodo = toDoListState.data.find(
      (item) => item.id === +editedToDoState.id
    );
    const isTodoExistList = toDoListState.data.some(
      (item) => item.text === editedToDoState.text.trim()
    );
    if (editedTodo.text === editedToDoState.text.trim()) {
      alert("No changes at todo");
    } else if (isTodoExistList) {
      alert("No duplicated todo");
    } else {
      updateTodo(editedToDoState);
      setEditedToDoState({ text: "", id: null });
    }
  };
  const handleClickAway = () => {
    setEditedToDoState({ text: "", id: null });
  };

  const isLoading =
    toDoListState.isLoading ||
    updateTodoState.isLoading ||
    deleteToDoState.isLoading;

  return (
    <Box className="App">
      <Typography variant="h4">ToDo App</Typography>
      {isLoading ? (
        <Loading />
      ) : toDoListState.error ? (
        <Box>{toDoListState.error}</Box>
      ) : (
        <>
          <AddTodo
            onChange={(event) => setTodo(event.target.value)}
            onClick={handleClickAddTodo}
            todo={todo}
          />

          {toDoListState.data.map((todo) => (
            <TodoListItem
              todo={editedToDoState.id === todo.id ? editedToDoState : todo}
              key={todo.id}
              editMode={editedToDoState.id === todo.id}
              onClickCheckbox={handleClickCheckbox}
              onClickDelete={(id) => deleteToDo(id)}
              onChangeTodo={handleChangeTodo}
              onClickEdit={(text, id) => setEditedToDoState({ text, id })}
              onClickSave={handleUpdateTodo}
              onClickAway={handleClickAway}
            />
          ))}
        </>
      )}
    </Box>
  );
}

export default App;
