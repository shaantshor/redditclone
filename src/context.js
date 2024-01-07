import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
const CommentsContext = createContext("");

function Provider({ children }) {
    const [comments, setComments] = useState([]);

    const getApiComments = useCallback(async () => {
        const response = await axios.get("https://654077a245bedb25bfc1f7eb.mockapi.io/comments");
        setComments(response.data)
    }, []);

    const valueToShare = {
        comments,
        setComments: (commentToAdd) => {
            setComments(commentToAdd);
        },
        getApiComments
    }
    return <CommentsContext.Provider value={valueToShare}>
        {children}
    </CommentsContext.Provider>
}

export { Provider };
export default CommentsContext;