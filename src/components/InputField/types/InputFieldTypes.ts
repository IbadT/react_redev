import { TodoTypes } from "../../../types/TodoTypes"

export type PropsType = {
    setTodos: (updater: (prev: TodoTypes[]) => TodoTypes[]) => void;
}