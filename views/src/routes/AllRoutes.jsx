import { Routes, Route } from "react-router-dom"
import Home from "../component/home/Home";
import Login from "../component/login/Login";
import Signup from "../component/signup/Signup";
import Posts from "../component/posts/Posts";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/posts" element={<Posts />}></Route>
        </Routes>
    )
}

export default AllRoutes;