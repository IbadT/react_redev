import { TodoTypes } from "../../../types/TodoTypes"

export type PropsType = {
    id: number;
    title: string;
    isCompleted: boolean;
    setTodos: (updater: (prev: TodoTypes[]) => TodoTypes[]) => void;
    logUserAction?: (action: string) => void;
}