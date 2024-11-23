import axios from "axios";
import {   useState } from "react";

const CreateComment = ({ comments,postId }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit =async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`,{
      newComment
    })
    setNewComment('')    
  }  


      
  const allComments = comments.map((comment) => (
    <p key={comment.id} className="text-gray-300 text-sm">
      {comment.newComment}
    </p>
  ));

  return (
    <div className="bg-gray-700 p-4 mt-4 rounded-lg">
      {/* Comments List */}
      <div className="space-y-3">
        {comments.length > 0 ? (
          allComments
        ) : (
          <p className="text-gray-400 text-sm">No comments yet.</p>
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-3"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
 