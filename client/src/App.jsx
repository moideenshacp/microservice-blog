import CreatePost from "./CreatePost"
import Home from "./Home";
import { BrowserRouter,Route,Routes } from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<Home/>} />
      <Route path="/addBlog" element={<CreatePost/>} />
    </Routes>

    </BrowserRouter>
    
  )
}

export default App

