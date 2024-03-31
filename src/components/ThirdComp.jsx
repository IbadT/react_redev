import { useState } from "react"

export const ThirdComp = () => {
    const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink"];
    const [color, setColor] = useState("white");
    const changeColor = () => {
        const randIndex = Math.floor(Math.random() * colors.length+1);
        setColor(colors[randIndex]);
    }
    const style = { color }
    return (
        <>
            <div style={style}>Lorem ipsum dolor sit amet.</div>
            <button onClick={changeColor}>Change color</button>
        </>
    )
}