import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"
import { Space, Button, Input, Dropdown, Popover } from "antd"
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import registerFetch from "../helpers/registerFetch.js";
import loginFetch from "../helpers/loginFetch.js";
import { setTokenToLocalStorage } from "../helpers/localstorages.ts";


const items = [
    {
      label: 'Мужской',
      gender: "Male",
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'Женский',
      gender: "Female",
      key: '2',
      icon: <UserOutlined />,
    },
];


// как использовать функцию register в прямом Input(antd)
// как использовать register в поле dropdown 
// как использовать маски для инпутов 
  
export const RegistrationForm = () => {

    const { handleSubmit, setError, setFocus, control, formState: { errors } } = useForm();
    
    const [passState, setPassState] = useState(true);
    const [gender, setGender] = useState({ label: 'Введите пол' });
    const navigate = useNavigate();
    
    useEffect(() => {
        setFocus("user_name");
    });
      
    const handleMenuClick = (e) => {
        const { label, gender } = items.find(i => i.key === e.key);
        setGender({ label, gender });
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const onSubmit = async (data) => {
        const { user_name, email, compare_password, password, birth_date, phone_number } = data;
        if(compare_password === password) {
            data.gender = gender.gender;
            const user = { user_name,email, password, birth_date, gender: gender.gender, phone_number };
            const response = await registerFetch(user);
            if(response.status === 400) {
                setError("email", {
                    message: "Этот email уже зарегистрирован"
                });
                toast.error("Этот email уже используется");
            };
            if(response.status === 200) {
                const logingResponse = await loginFetch(data);
                const logingResponseJson = await logingResponse.json();
                setTokenToLocalStorage("token", logingResponseJson);
                toast.success("Регистрация прошла успешно", { position: "bottom-left", autoClose: 600 });
                setTimeout(() => navigate('/'), 1700);
            }
        } else {
            setPassState(prev => !prev);
            toast.error("Неверный email или password");
        }
    };

    return (

        <div style={{ width: "100vw", height: "70vh", display: "flex", justifyContent: "center"}}>
            <form control={control} onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "25%"}}>

                <label>Registration</label>

                <Controller
                    name="user_name"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                        <Input 
                            allowClear 
                            placeholder="User name" 
                            style={{ marginTop: "2vh" }} 
                            {...field} 
                        />
                    )}
                />
                {errors.user_name?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>This field is required</p>}
                

                <Controller 
                    name="email" 
                    rules={{ required: true }}
                    control={control} 
                    render={(({ field }) => <Input allowClear placeholder="Email" style={{ marginTop: "2vh" }} {...field}/>)}  
                />
                {errors.email?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field email is required</p>}
                {errors.email?.message && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Этот email уже используется</p>}


                <Controller 
                    name="password" 
                    rules={{ required: true }}
                    control={control} 
                    render={(({ field }) => (
                        <Popover title="password" content="Пароль должен содержать минимум 8 символов, 1 заглавную букву и 1 цифру" trigger="focus">
                            <Input.Password 
                                min={8}
                                {...field}
                                allowClear
                                placeholder="Password" 
                                style={{ marginTop: "2vh" }}
                                pattern='^(?=.*[A-Z])(?=.*\d).{8,}$'
                                status= { !passState ? "error" : null }
                            />
                        </Popover>
                    ))}
                />
                {errors.password?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field password is required</p>}
                

                <Controller 
                    name="compare_password" 
                    rules={{ required: true }} 
                    control={control} 
                    render={(({ field }) => (
                        <Popover title="password" content="Пароль должен содержать минимум 8 символов, 1 заглавную букву и 1 цифру" trigger="focus">
                            <Input 
                                min={8}
                                {...field}
                                allowClear 
                                style={{ marginTop: "2vh" }} 
                                placeholder="Compare password" 
                                pattern='^(?=.*[A-Z])(?=.*\d).{8,}$'
                                status={ !passState ? "error" : null } 
                            />
                        </Popover>
                    ))}
                />
                {errors.compare_password?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field compare password is required</p>}
                

                <Controller 
                    name="birth_date" 
                    rules={{ required: true }}
                    control={control} 
                    render={(({ field }) => (
                        <Popover title="Birthday example" content="26.04.2001" placement="left" trigger="focus">
                            <Input 
                                pattern="^\d{2}\.\d{2}\.\d{4}$"
                                allowClear 
                                placeholder="Birth date" 
                                style={{ marginTop: "2vh" }} 
                                {...field}
                            />
                        </Popover>
                    ))}
                />
                {errors.birth_date?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field birth date is required</p>}
                

                <Controller 
                    name="gender" 
                    control={control} 
                    render={(({ field }) => (
                        <Dropdown menu={menuProps}>
                            <Button {...field} style={{ width: "10vw", marginTop: "2vh" }}>
                                <Space>
                                    { gender.label }
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>                    
                     ))}
                />
                {errors.gender?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field gender is required</p>}
                

                <Controller 
                    name="phone_number"
                    rules={{ required: true }} 
                    control={control} 
                    render={(({ field }) => (
                        <Popover title="Phone number example" content="+375(29) 27 69 407" placement="left" trigger="focus">
                            <Input 
                                allowClear 
                                pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
                                placeholder="Phone number" 
                                style={{ marginTop: "2vh" }} 
                                {...field}
                            />
                        </Popover>
                    ))}
                />
                {errors.phone_number?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field phone number is required</p>}
                
                <Button htmlType="submit" type="primary" style={{ marginTop: "1.5vh"}}>Register</Button>

            </form>
            <ToastContainer />
        </div>
    )
};

// const schema = object().shape({
//     user_name: string().required("User name field is required"),
//     email: string().email().required("Email field is required"),
//     password: string().required("Password field is required").min(8, "password is too short"),
//     compare_password: string().oneOf([ref("password"), "Пароли должны совпадать"]).required("Compare password is required"),
//     birth_date: date().required("Birth date is required"), 
//     gender: string().oneOf(["Male" || "Famele"]).required("Gender field is required"),
//     phone_number: string().default("+375(29)-27-69-407").required("Phone number field is required")
// });