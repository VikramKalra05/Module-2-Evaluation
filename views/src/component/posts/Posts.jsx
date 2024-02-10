import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { Navigate } from "react-router-dom";

const Posts = () => {
    const {isAuth} = useContext(AuthContext);

    if(!isAuth){
        return <Navigate to="/login" />
    }

    return (
        <div>
            Posts
        </div>
    )
}

export default Posts;