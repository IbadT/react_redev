import { TodoTypes } from "../../../types/TodoTypes";

export type TodoListType = {
    todos: TodoTypes[];
    setTodos: (updater: (prev: TodoTypes[]) => TodoTypes[]) => void;
    logUserAction?: (action: string) => void;
}