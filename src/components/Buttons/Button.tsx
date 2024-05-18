import React from "react"
import { PropsType } from "./types/ButtonTypes"


const buttonStyle = { 
    backgroundColor: "rgb(128, 90, 246)", 
    color: "white", 
    border: "none",
    fontSize: "4vmin"
};

export const Button: React.FC<PropsType> = ({ handleClick, children }) => {
    return (
        <button 
            onClick={handleClick}
            style={buttonStyle}>
                { children }
        </button>
    )
}