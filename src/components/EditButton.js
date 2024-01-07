
function EditButton ({ setIsEdit}){
    return (                
    <button
    className="ml-1 text-indigo-600 hover:text-indigo-400 font-bold rounded"
    onClick={()=> setIsEdit(true)}
    >
    Edit
    </button>)
}

export default EditButton;