import NewPost from './components/NewPost'
import { useContext, useEffect } from "react";
import AllComments from './components/AllComments';
import CommentsContext from './context';

function App() {

  const {comments, setComments, getApiComments} = useContext(CommentsContext);

  useEffect(() => {
    getApiComments();
  }, [getApiComments])


  return (
    <div className="m-10 flex flex-col ">
      <AllComments comments={comments} level={0}  />
      <NewPost setComments={setComments}/>
    </div>
  );
}

export default App;