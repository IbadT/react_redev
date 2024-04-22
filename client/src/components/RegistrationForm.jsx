import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"
import { Space, Button, Input, Dropdown, Popover } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import registerFetch from "../helpers/registerFetch.js";
import loginFetch from "../helpers/loginFetch.js";
import { setTokenToLocalStorage } from "../helpers/localstorages.ts";
import items from "../items/items.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema/schema.js";



// как использовать register в поле dropdown 
// как использовать маски для инпутов 



export const RegistrationForm = () => {
    
    const { handleSubmit, setError, setFocus, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    
    const [passState, setPassState] = useState(true);
    const [gender, setGender] = useState({ label: 'Введите пол' });
    const navigate = useNavigate();
    
    useEffect(() => {
        setFocus("user_name");
    }, [setFocus]);
      
    const handleMenuClick = (e) => {
        const { label, gender } = items.find(i => i.key === e.key);
        setGender({ label, gender });
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const onSubmit = async (data) => {
        const { compare_password, password } = data;
        if(compare_password === password) {
            const user = Object.fromEntries(
                Object.entries({ ...data, gender: gender.gender })
                    .filter(i => i[0] !== 'compare_password')
            );
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
                reset();
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
                {errors.user_name?.type === "required" && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%" }}>This field is required</div>}
                {errors.user_name?.message && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>{errors.user_name.message}</div>}
                

                <Controller 
                    name="email" 
                    rules={{ required: true }}
                    control={control} 
                    render={(({ field }) => (
                            <Input 
                                allowClear 
                                placeholder="Email" 
                                style={{ marginTop: "2vh" }} 
                                {...field}
                            />
                    ))}  
                />
                {errors.email?.type === "required" && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%" }}>Field email is required</div>}
                {errors.email?.message && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>{errors.email.message}</div>}


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
                                // pattern='^(?=.*[A-Z])(?=.*\d).{8,}$'
                                status= { !passState ? "error" : null }
                            />
                        </Popover>
                    ))}
                />
                {errors.password?.type === "required" && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>Field password is required</div>}
                {errors.password?.message && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>{errors.password.message}</div>}
                

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
                                status={ !passState ? "error" : null } 
                            />
                        </Popover>
                    ))}
                />
                {errors.compare_password?.type === "required" && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>Field compare password is required</div>}
                {errors.compare_password?.message && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>{errors.compare_password.message}</div>}
                

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
                {errors.birth_date?.type === "required" && <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>Field birth date is required</div>}
                {errors.birth_date?.message && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>{errors.birth_date.message}</div>}


                <Controller 
                    name="gender" 
                    rules={{ required: true }}
                    control={control} 
                    render={(({ field }) => (
                        <Dropdown menu={menuProps}>
                            <Button {...field} style={{ width: "10vw", marginTop: "2vh" }}>
                                <Space>
                                    { gender.label }
                                    <DownOutlined/> 
                                </Space>
                            </Button>
                        </Dropdown>                    
                     ))}
                />
                {errors.gender?.type === "required" && <div style={{ fontSize: "2vmin", color: "red"}}>Field gender is required</div>}
                {errors.gender?.message && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>{errors.gender.message}</div>}


                <Controller 
                    name="phone_number"
                    rules={{ required: true }} 
                    control={control} 
                    render={(({ field }) => (
                        <Popover title="Phone number example" content="+375(29)-27-69-407" placement="left" trigger="focus">
                            <Input 
                                allowClear 
                                placeholder="Phone number" 
                                style={{ marginTop: "2vh" }} 
                                {...field}
                            />
                        </Popover>
                    ))}
                />
                {errors.phone_number?.type === "required" && <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>Field phone number is required</div>}                
                {errors.phone_number?.message && 
                    <div style={{ fontSize: "2vmin", color: "red", width: "100%"}}>{errors.phone_number.message}</div>}

                <Button htmlType="submit" type="primary" style={{ marginTop: "1.5vh"}}>Register</Button>

            </form>
            <ToastContainer />
        </div>
    )
};