import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import { getPostss } from "./submitRequest.js";

const Posts = () => {
    const {isAuth, setNumber} = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [postEditToggle, setEditPostToggle] = useState(false);
    const [postDetails, setPostDetails] = useState({
        title: "",
        body: "",
        device: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPostDetails({
            ...postDetails,
            [name]: value
        })
    }

    const getPosts = async () => {
        try {
            const result = await getPostss();
            console.log(result);
            if(result.posts){
                setPosts(result.posts);
                setNumber(result.posts.length)
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    if(!isAuth){
        return <Navigate to="/login" />
    }

    const submitPostChanges = async (post, id) => {
        if(post){
            const data = JSON.stringify(post);
            try {
                const response = await fetch(`https://gentle-fawn-shrug.cyclic.app/posts/update/${id}`, {
                    method: 'PATCH',
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `${localStorage.getItem("token")}`
                    }
                });
    
                const res = await response.json()
                console.log(res);
    
                if(res.success){
                    setEditPostToggle(false);
                    alert("Post has been updated");
                }
                getPosts();
            } catch (error) {
                alert(error.msg);
            }
        }else{
            alert("Empty note cannot be saved");
        }
    }

    const handleCreateNewPost = async () => {
        if(postDetails){
            const data = JSON.stringify(postDetails);
            try {
                const response = await fetch("https://gentle-fawn-shrug.cyclic.app/posts/add", {
                    method: 'POST',
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `${localStorage.getItem("token")}`
                    }
                })
    
                const res = await response.json()
                console.log(res);
    
                if(res.msg === "post has been saved"){
                    alert("New post has been created");
                }
                getPosts();
            } catch (error) {
                alert(error.msg);
            }
        }else{
            alert("Empty post cannot be created");
        }
    }

    const handleDelete = async (id) => {

        try {
            const response = await fetch(`https://gentle-fawn-shrug.cyclic.app/posts/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "authorization": `${localStorage.getItem("token")}`
                }
            });
    
            const res = await response.json()
            console.log(res);
    
            if(res.success){
                alert("Posts has been deleted");
            }
            getPosts();
        } catch (error) {
            alert(error.msg);
        }
        
    }


    return (
        <div>
            <h1>Post Page</h1>
            <button onClick={() => setEditPostToggle(!postEditToggle)}>Edit Post</button>
            <div>
                <h2>Write a new post below</h2>
                <h5>Title</h5>
                <input type="text" name="title" value={postDetails.title} onChange={(e)=>handleChange(e)}/>
                <br />
                <h5>Device</h5>
                <input type="text" name="device" value={postDetails.device} onChange={(e)=>handleChange(e)}/>
                <br />
                <h5>Body</h5>
                <input type="text" name="body" value={postDetails.body} onChange={(e)=>handleChange(e)}/>
                <button onClick={handleCreateNewPost}>Create</button>
            </div>
            <div>
            {   posts?.map((element, id) => {
                        return (
                            <div key={id+1}>
                                <h3>{id+1}: {element?.title}</h3>
                                <p>{element?.body}</p>
                                <p>{element?.device}</p>
                                <div>
                                    <button onClick={() => handleDelete(element._id)}>Delete</button>
                                </div>
                                {postEditToggle ? <EditBlock post={element} submitPostChanges={submitPostChanges}/> : null}
                            </div>
                        )
            })}
            </div>
        </div>
    )
}

export default Posts;

const EditBlock = ({post, submitPostChanges}) => {
    const [ postDetails, setPostDetails ] = useState({
        title: `${post.title}`,
        device: `${post.device}`,
        body: `${post.body}`,
    })

    const handleChange = (e) => {
        const {name, value} = e.target; 
        setPostDetails({
            ...postDetails,
            [name]: value
        })
    }

    return (
        <div>
                <h1>Edit post {post._id}</h1>
                <h5>Title</h5>
                <input type="text" name="title" value={postDetails.title} onChange={(e)=>handleChange(e)}/>
                <br />
                <h5>Device</h5>
                <input type="text" name="device" value={postDetails.device} onChange={(e)=>handleChange(e)}/>
                <br />
                <h5>Body</h5>
                <input type="text" name="body" value={postDetails.body} onChange={(e)=>handleChange(e)}/>
            <button onClick={() => submitPostChanges(postDetails, post._id)}>Save</button>
        </div>
    )
}