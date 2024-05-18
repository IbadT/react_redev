import { ReactNode } from "react"

export type PropsType = {
    handleClick: () => void;
    handleEdit?: () => void;
    children: ReactNode;
}