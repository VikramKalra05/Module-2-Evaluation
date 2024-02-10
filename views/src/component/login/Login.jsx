import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const Navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    console.log(userDetails);

    const handleSubmit = () => {
        console.log(" submit");
    }

    return (
        <div>
            <h1>Login Page</h1>
            <h5>Email</h5>
            <input type="email" name="email" value={userDetails.email} onChange={(e) => handleChange(e)} />
            <h5>Password</h5>
            <input type="password" name="password" value={userDetails.password} onChange={(e) => handleChange(e)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login;