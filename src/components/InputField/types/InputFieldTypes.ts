import { TodoTypes } from "../../../types/TodoTypes"

export type PropsType = {
    setTodos: (prev: TodoTypes[]) => void;
}