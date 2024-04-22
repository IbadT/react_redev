import { Button, Space } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { removeTokenFromLocalStorage } from '../helpers/localstorages.ts'
import { ToastContainer, toast } from "react-toastify";

export const Navigation = () => {

    const navigate = useNavigate();

    const handleClick = async () => {
        removeTokenFromLocalStorage("token");
        toast.success("You logged out", { autoClose: 800});
        setTimeout(() => navigate("/login"), 1700)
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Space>
                <Button type="primary">
                    <Link to="/login">Login</Link>
                </Button>
                <Button type="primary">
                    <Link to="/register">Register</Link>
                </Button>        
                <Button type="primary" onClick={handleClick}>Log Out</Button>
                <ToastContainer />
            </Space>
        </div>
    )
}