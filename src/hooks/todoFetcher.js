import { useState, useCallback } from "react";
import { getTodoList, postTodo, updateTodo, deleteTodo } from "../utils/apis";

let getTodoListCb = null;
let postTodoCb = null;

export const useGetTodoFetcher = () => {
  const [getToDoListState, setToDoListState] = useState({
    data: [],
    error: null,
    isLoading: false,
  });

  getTodoListCb = useCallback(() => {
    setToDoListState((prevState) => ({ ...prevState, isLoading: true }));
    getTodoList()
      .then((res) => {
        console.log("res: ", res);
        setToDoListState((prevState) => ({
          ...prevState,
          data: res,
          isLoading: false,
        }));
      })
      .catch((err) => {
        setToDoListState((prevState) => ({
          ...prevState,
          error: err.statusText,
          isLoading: false,
        }));
      });
  });

  return [getToDoListState, getTodoListCb];
};

export const usePostTodoFetcher = () => {
  postTodoCb = useCallback((input) => {
    postTodo(input)
      .then((res) => {
        getTodoListCb();
      })
      .catch((err) => {});
  });

  return [postTodoCb];
};

export const usePutTodoFetcher = () => {
  const [updateState, setUpdateState] = useState({
    data: {},
    error: null,
    isLoading: false,
  });

  const updateToDoCb = useCallback((updatedItem) => {
    setUpdateState((prevState) => ({ ...prevState, isLoading: true }));
    updateTodo(updatedItem)
      .then((res) => {
        getTodoListCb();
        setUpdateState((prevState) => ({
          ...prevState,
          data: res,
          isLoading: false,
        }));
      })
      .catch((err) => {
        setUpdateState((prevState) => ({
          ...prevState,
          error: err,
          isLoading: false,
        }));
      });
  });

  return [updateState, updateToDoCb];
};

export const useDeleteToDoFetcher = () => {
  const [deleteState, setDeleteState] = useState({
    data: {},
    error: null,
    isLoading: false,
  });

  const deleteToDoCb = useCallback((id) => {
    setDeleteState((prevState) => ({ ...prevState, isLoading: true }));
    deleteTodo(id)
      .then((res) => {
        getTodoListCb();
        setDeleteState((prevState) => ({
          ...prevState,
          data: res,
          isLoading: false,
        }));
      })
      .catch((err) => {
        setDeleteState((prevState) => ({
          ...prevState,
          error: err,
          isLoading: false,
        }));
      });
  });

  return [deleteState, deleteToDoCb];
};
