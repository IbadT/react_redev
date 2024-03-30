export const SecondComp = ({ arr }) => {
    return (
        <>
            {
                arr.map((i, ind) => <div key={ind}>{i}</div>)
            }
        </>
    )
}