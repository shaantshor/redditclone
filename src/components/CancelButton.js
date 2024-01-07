
function CancelButton({ setIsReplying, setIsEdit }) {
    return (

        <button
            className="ml-3 text-indigo-600 hover:text-indigo-400 font-bold rounded"
            onClick={() => {setIsReplying? setIsReplying(false): setIsEdit(false);}}
        >
            Cancel
        </button>)
}

export default CancelButton;
