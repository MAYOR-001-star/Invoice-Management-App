import Button from "./Button"

const GroupBtn = () => {
    return (
        <div className="flex justify-center items-center gap-[0.5rem]">
            <Button text="Edit" variant="edit" onClick={() => { console.log('invoice submitted') }} />
            <Button text="Delete" variant="delete" onClick={() => { console.log('invoice submitted') }} />
            <Button text="Mark as Paid" onClick={() => { console.log('invoice submitted') }} />
        </div>
    )
}

export default GroupBtn