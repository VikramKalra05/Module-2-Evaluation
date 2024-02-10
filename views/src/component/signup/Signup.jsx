import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitUserDetails } from "./submitUserDetails";

const Signup = () => {
    const Navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        gender: "",
        name: ""
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
                console.log(result);
                if(result.msg == "New user has been created"){
                    alert("User has been registered successfully");
                    Navigate("/login");
                }else{
                    alert("Something went wrong while hashing");
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
            <h5>Gender</h5>
            <input type="text" name="gender" value={userDetails.gender} onChange={(e) => handleChange(e)} />
            <h5>Name</h5>
            <input type="text" name="name" value={userDetails.name} onChange={(e) => handleChange(e)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Signup;