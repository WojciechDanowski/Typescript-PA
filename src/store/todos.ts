/* eslint-disable no-param-reassign */
import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxStoreType } from ".";

export interface Todo {
  id?: string;
  name: string;
  checked?: boolean;
}

interface TodoState {
  isLoading: boolean;
  data: Array<Todo>;
}
interface todoCreateParams {
  todo: Todo;
}

export const sliceName = "todos";

export const getTodos = createAsyncThunk(
  `${sliceName}/fetch`,
  async (_, { dispatch }) => {
    try {
      const response = await axios.get<Todo[]>(
        "https://typescript-pa-default-rtdb.firebaseio.com/todos.json"
      );
      const responseBody = response.data;

      let todos: any[] = [];

      Object.keys(responseBody || {}).forEach((key: any) => {
        const todo = { ...responseBody[key], id: key };
        todos = [...todos, todo];

        return todos;
      });
      return todos;
    } catch (err) {
      console.log(err as AxiosError, `${err}`);

      throw err;
    }
  }
);

export const addTodos = createAsyncThunk(
  `${sliceName}/post`,
  async ({ todo }: todoCreateParams, { dispatch }) => {
    try {
      const body = {
        name: todo.name,
        checked: todo.checked,
      };
      const response = await axios.post(
        "https://typescript-pa-default-rtdb.firebaseio.com/todos.json",
        body
      );

      const payload = {
        name: todo.name,
        checked: todo.checked,
        id: response.data.name,
      };

      return payload;
    } catch (err) {
      console.log(err as AxiosError, `${err}`);
    }
  }
);

export const removeTodo = createAsyncThunk(
  `${sliceName}/remove`,
  async (id: string, { dispatch }) => {
    try {
      const response = await axios.delete<Todo>(
        `https://typescript-pa-default-rtdb.firebaseio.com/todos/${id}.json`
      );
      await dispatch(getTodos());

      return response.data;
    } catch (err) {
      console.log(err as AxiosError, "We could not remove todo");

      throw err;
    }
  }
);

export const initialState: TodoState = {
  isLoading: true,
  data: [],
};

export const todos = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTodos.fulfilled, (state, { payload }: any) => {
      state.data.push(payload);
      state.isLoading = false;
    });
    builder.addCase(addTodos.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(removeTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeTodo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const getTodoList = (state: ReduxStoreType) => state[sliceName];

export default todos.reducer;
