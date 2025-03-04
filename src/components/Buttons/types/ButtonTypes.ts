import { ReactNode } from "react"

export type PropsType = {
    handleFunc?: () => void;
    children: ReactNode;
    title?: string
}