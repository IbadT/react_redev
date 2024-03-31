import { useState } from "react"

export const SecondComp = () => {
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value);
    return (
        <>
            <input type="text" onChange={handleChange} value={text}/>
            <div>{text}</div>
        </>
    )
}