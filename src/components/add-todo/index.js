import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./index.scss";

const AddTodo = ({ onChange, onClick, todo }) => {
  return (
    <form className="add-todo-container" onSubmit={onClick}>
      <TextField
        placeholder="Enter the todo"
        variant="outlined"
        onChange={onChange}
        value={todo}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!todo.trim()}
      >
        Add
      </Button>
    </form>
  );
};

export default AddTodo;
