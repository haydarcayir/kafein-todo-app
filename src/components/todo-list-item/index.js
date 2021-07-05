import React from "react";

import Box from "@material-ui/core/Box";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./style.scss";

import IconWithTooltip from "../icon-with-tooltip";

const ToDoListItem = ({
  todo,
  editMode,
  onClickCheckbox,
  onClickDelete,
  onChangeTodo,
  onClickEdit,
  onClickSave,
  onClickAway,
}) => {
  return (
    <Box className="list-item-container">
      <Box width="90%">
        {editMode ? (
          <ClickAwayListener onClickAway={onClickAway}>
            <TextField
              className="input-text"
              id={`${todo.id}`}
              variant="standard"
              value={todo.text}
              onChange={onChangeTodo}
            />
          </ClickAwayListener>
        ) : (
          <>
            <Checkbox
              name={`${todo.id}`}
              id={`${todo.id}`}
              checked={todo.isCompleted}
              onChange={onClickCheckbox}
            />
            <Typography
              variant="p"
              className={todo.isCompleted && "line-through"}
            >
              {todo.text}
            </Typography>
          </>
        )}
      </Box>
      <Box width="10%">
        {editMode ? (
          <IconWithTooltip
            icon={<SaveIcon color="primary" />}
            onClick={() => onClickSave(todo.id)}
            tooltipTitle="Save"
          />
        ) : (
          <IconWithTooltip
            icon={<EditIcon color="primary" />}
            onClick={() => onClickEdit(todo.text, todo.id)}
            tooltipTitle="Edit"
          />
        )}
        <IconWithTooltip
          icon={<DeleteOutlineIcon color="secondary" />}
          onClick={() => onClickDelete(todo.id)}
          tooltipTitle="Delete"
        />
      </Box>
    </Box>
  );
};

export default ToDoListItem;
