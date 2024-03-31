import { useState } from "react";

export const FirstComp = ({ str, num}) => {
    const [isVisible, setIsVisible] = useState(false);
    const checkVisibleText = () => setIsVisible(!isVisible)
    return (
        <>
            <div>{isVisible && "I'm TEXT and i'm here!)"}</div>
            <button onClick={checkVisibleText}>Show the text?</button>
        </>
    )
}