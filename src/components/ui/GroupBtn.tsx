import Button from "./Button"

interface GroupBtnProps {
    onEdit?: () => void;
    onDelete?: () => void;
    onMarkPaid?: () => void;
}

const GroupBtn = ({ onEdit, onDelete, onMarkPaid }: GroupBtnProps) => {
    return (
        <div className="flex justify-center items-center gap-[0.5rem]">
            <Button text="Edit" variant="edit" onClick={() => onEdit?.()} />
            <Button text="Delete" variant="delete" onClick={() => onDelete?.()} />
            <Button text="Mark as Paid" onClick={() => onMarkPaid?.()} />
        </div>
    )
}

export default GroupBtn