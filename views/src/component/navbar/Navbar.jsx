import styles from "./navbar.module.css";
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div>0</div>
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