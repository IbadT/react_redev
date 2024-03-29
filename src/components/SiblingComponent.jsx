import { useState } from "react"

export const SiblingComponent = () => {
    const [text, setText] = useState("Some text");
    return <>
        <div>Текущий текст: {text}</div>
        <button onClick={() => setText("REDEV")}>Изменить текст</button>
    </>
}