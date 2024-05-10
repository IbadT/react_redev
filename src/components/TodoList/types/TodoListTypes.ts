import { TodoTypes } from "../../../types/TodoTypes";

export type PropsType = {
    todos: TodoTypes[];
    setTodos: (prev: TodoTypes[]) => void;
}