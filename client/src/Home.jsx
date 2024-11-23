import { PencilSquareIcon,ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";

const Home = () => {

  const [posts,setPosts] = useState([])
  const [commentsVisible, setCommentsVisible] = useState({});

  const fetchPosts = async ()=>{

    const result = await axios.get('http://posts.com/posts')  
    console.log(result.data);
    setPosts(result.data)
  }


  useEffect(()=>{
    fetchPosts()
    
  },[])

  const toggleComments = (postId) => {
    setCommentsVisible((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const allPost = Object.values(posts).map((post) => (
    <div
      key={post.id}
      className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 my-4 max-w-6xl"
    >
      <h3 className="text-2xl font-semibold text-center text-blue-400 mb-4">{post.title}</h3>
      <p className="text-gray-300 text-center">{post.content || "No content available"}</p>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => toggleComments(post.id)}
          className="flex items-center text-gray-400 hover:text-blue-400"
        >
          <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
          Comments
        </button>
      </div>
 
      {commentsVisible[post.id] && <CreateComment comments={post.comments} postId={post.id} />}

    </div>
  ));
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">

    <div>
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">My Blog App</h1>
          <Link to='/addBlog'>
          
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <PencilSquareIcon className="w-5 h-5 mr-2" />
            Add Blog
          </button>
          
          </Link>
        </div>
      </nav>
    </div>

    <div className="max-w-6xl mx-auto p-4">
        {allPost.length > 0 ? (
          allPost
        ) : (
          <p className="text-center text-gray-400">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
