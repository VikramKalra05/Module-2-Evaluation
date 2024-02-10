import { useContext } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContextProvider";

const Navbar = () => {
    const {number} = useContext(AuthContext)
    return (
        <div className={styles.navbar}>
            <div>{number}</div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    )
}

export default Navbar;