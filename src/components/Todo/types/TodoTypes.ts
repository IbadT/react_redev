import { TodoTypes } from "../../../types/TodoTypes"

export type PropsType = {
    id: number;
    title: string;
    setTodos: (prev: TodoTypes[]) => any;
    isCompleted: boolean;
}