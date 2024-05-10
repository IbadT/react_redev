import React, { ReactNode } from "react"
import { PropsType } from "./types/ButtonTypes"


export const Button: React.FC<PropsType> = ({ handleClick, children }) => {
    return (
        <button 
            onClick={handleClick}
            style={{ 
                backgroundColor: "rgb(128, 90, 246)", 
                color: "white", 
                border: "none",
                fontSize: "4vmin"
            }}>
                { children }
        </button>
    )
}