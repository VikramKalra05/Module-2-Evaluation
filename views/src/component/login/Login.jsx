import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitUserDetails } from "./submitUserDetails";
import { AuthContext } from "../../context/AuthContextProvider"

const Login = () => {
    const {setAuth} = useContext(AuthContext);
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

    const handleSubmit = async () => {

        if(userDetails){
            try {
                const result = await submitUserDetails(userDetails);
                if(result.token){
                    setAuth(true)
                    alert("User has been logged in successfully");
                    Navigate("/");
                }else{
                    alert("Wrong Password!");
                }
            } catch (error) {
                console.log(error);
                alert(error);
            }
        }else{
            alert("Fill all the details")
        }
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