
function ReplyButton ({setIsReplying}){
    return (                
        <button
        className="ml-20 text-indigo-600 hover:text-indigo-400 font-bold rounded"
        onClick={() => setIsReplying(true)}
    >
    Reply
    </button>)
}

export default ReplyButton;