import { Button, Flex, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type LoginFormType = {
    email: string,
    password: string
}

export const Login = () => {
    const [state, setState] = useState<LoginFormType>({ email: "", password: "" });
    const navigate = useNavigate();

    const onFinish = async () => {
        try {
            const loginResponseJSON = await fetch(`${process.env.REACT_APP_LOGIN_URL}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(state)
            });
            const response = await loginResponseJSON.json();
            if(loginResponseJSON.status !== 200) {
                throw new Error(response.message)
            } else if( loginResponseJSON.status === 200 ) {
                const { token } = await response;
                localStorage.setItem('token', token);
                toast.success("You're seccessfully logined", { autoClose: 2000 })
                setTimeout(() => navigate('/'), 2000)
            } else { 
                toast.info("Что-то пошло не так :( проверьте консоль", { autoClose: 2000, transition: Flip });
                console.log({ response });
            }
        } catch (e) {
            toast.error((e as Error).message, { autoClose: 2000, transition: Flip, });
        }
    }

    return (
        <Flex vertical align="center" style={{ height: "100vh", width: "35vw" }} justify="center" gap={20}>
            <Flex justify="center" style={{ color: "white"}}>Log In</Flex>
            <Form name="login" onFinish={onFinish}>

                <Form.Item name="email">
                    <Input placeholder="email" autoFocus value={state.email} onChange={e => setState(prev => ({ ...prev, email: e.target.value}))}/>
                </Form.Item>

                <Form.Item name="password">
                    <Input.Password onPressEnter={() => onFinish()} placeholder="password" value={state.password} onChange={e => setState(prev => ({ ...prev, password: e.target.value}))}/>
                </Form.Item>

                <Flex justify="space-between" align="center">
                    <Button htmlType="submit" type="primary">Send</Button>
                    <Button htmlType="button" type="primary" onClick={() => navigate('/register')}>Registration</Button>
                </Flex>
            </Form>
            <ToastContainer autoClose={1900} transition={Flip} style={{ fontSize: "10px" }}/>
        </Flex>
    )
};