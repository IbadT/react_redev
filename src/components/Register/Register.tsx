import { Button, DatePicker, Flex, Form, Input, Radio } from 'antd';
import { LockOutlined } from "@ant-design/icons"
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';


type RegisterType = {
    username: string
    email: string 
    password: string
    birthday: any
    gender: string
}


export const Register = () => {

    const navigate = useNavigate();

    const onFinish = async ({ username, email, password, birthday, gender}: RegisterType) => {
        const age = countAge(birthday.$d);
        const result = {
            username,
            email,
            password,
            gender,
            age
        }
        console.log({result});
        

        try {
            const registrarionResponseJSON = await fetch(`${process.env.REACT_APP_REGISTER_URL}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(result)
            });
            const response = await registrarionResponseJSON.json();
            if (registrarionResponseJSON.status !== 200) {
                throw new Error(response.message);
            } else if (registrarionResponseJSON.status === 200) {
                toast.success('Вы успешно зарегистрировались!', { autoClose: 2000 });

                const loginResponseJSON = await fetch(`${process.env.REACT_APP_LOGIN_URL}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify({ email, password })
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
            } else { 
                toast.info("Что-то пошло не так  :(  проверьте консоль", { autoClose: 2000, transition: Flip });
                console.log({ response });
            }
        } catch (error) {
            toast.error((error as Error).message, { autoClose: 2000, transition: Flip, });
        }

    };

    const countAge = (str: string) => {
        const obj = new Date(str);
        const year = obj.getFullYear();
        const currYearDate = (new Date()).getFullYear();
        const age = currYearDate - year;
        return age;
    };

    return (
        <Flex className={styles.register} justify='center' vertical gap={20}> 
            <Flex justify='center' gap={5} >
                <Flex align='start' justify='center' style={{ fontSize: "4vmin" }}>Registration</Flex>
                <Flex align='center'>
                    <LockOutlined style={{ fontSize: '1.5vmin'}}/>
                </Flex>
            </Flex>
                <Form name='register' onFinish={onFinish} style={{ width: "90%"}}>

                    <Form.Item 
                        label="Username" 
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input placeholder="Username"/>
                    </Form.Item>

                    <Form.Item 
                        label="Email" 
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input placeholder="Email"/>
                    </Form.Item>

                    <Form.Item 
                        label="Password" 
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="password"/>
                    </Form.Item>

                    <Flex justify='center'>
                        <Form.Item 
                            label="Gender" 
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your gender!',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="male"> male</Radio>
                                <Radio value="female">female</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Flex>

                    <Flex justify='center'>
                        <Form.Item 
                            label="Birthday"
                            name="birthday"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your birthday"
                                }
                            ]}    
                        >
                            <DatePicker />
                        </Form.Item>
                    </Flex>
                    
                    <Flex justify="center" align="center" gap={20}>
                        <Button htmlType="submit" type="primary">Send</Button>
                        <Button htmlType="button" type="primary" onClick={() => navigate('/login')}>Login</Button>
                    </Flex>
                </Form>
            <ToastContainer autoClose={1900} transition={Flip} style={{ fontSize: "10px" }}/>
        </Flex>
    )
}