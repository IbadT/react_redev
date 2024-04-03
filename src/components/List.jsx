import React from "react";

const style = {
    "listStyleType": "none"
}

// мемоизация для того, чтобы при добавлении значений в input
export const List = React.memo(({ state, setState }) => {

    const addSymbol = (elId) => {
        const newState = state.map((el) => el.id === elId ? {...el, title: "!!! "+el.title} : el);
        setState(newState);
    }
    return (
        <ul>
            {
                state &&
                state.map(({id, title}) => (
                    <li 
                        style={style} 
                        key={id}>
                            {title} 
                            <button onClick={() => addSymbol(id)}>Update</button>
                        </li>
                ))
            }
        </ul>
    )
});