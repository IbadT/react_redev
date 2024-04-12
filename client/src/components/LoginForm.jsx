import { Button, Input } from "antd"
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setTokenToLocalStorage } from "../helpers/localstorages.ts";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import loginFetch from "../helpers/loginFetch.js";



export const LoginForm = () => {

    const { control, handleSubmit, setError, setFocus, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        setFocus("email");
    });
    
    const onSubmit = async (data) => {
        const response = await loginFetch(data);
        if(response.status === 200) {
            const responseJson = await response.json();
            setTokenToLocalStorage("token", responseJson);
            toast.success("Авторизация прошла успешно 🔥", { 
                position: "bottom-left", 
                autoClose: 800 
            });
            setTimeout(() => navigate('/'), 1700);
        } else {
            toast.error("Неверный email или password");
        }
        if(response.status === 400) {
            setError("password", {
                message: "Неверный пароль"
            });
        }
        if(response.status === 401) {
            setError("email", {
                message: "Неверные email"
            });
        }
    }

    return (
        <div style={{ width: "100vw", height: "70vh", display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "25%" }}>
                
                <label>Login</label>

                <Controller 
                    name="email"
                    rules={{ required: true, error: "ERROR" }}
                    control={control}
                    render={({ field }) => (
                        <Input 
                            type="text" 
                            allowClear 
                            status={
                                errors?.email?.type === 'required' ? "error" : 
                                errors?.email?.message && "error"
                            }
                            placeholder="email" 
                            style={{ marginTop: "3vh" }} 
                            {...field} 
                        />
                    )}
                />
                {errors.email?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field email is required</p>}
                {errors.email?.message && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Invalid email</p>}

                <Controller 
                    name="password"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                        <Input.Password 
                            type="text" 
                            allowClear
                            status={
                                errors?.password?.type === 'required' ? "error" : 
                                errors?.password?.message && "error"
                            }
                            placeholder="password"
                            style={{ marginTop: "3vh" }} 
                            {...field} 
                        />
                        )}
                    />
                    {errors.password?.type === "required" && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Field email is required</p>}
                    {errors.password?.message && <p style={{ fontSize: "2vmin", marginBottom: "0" }}>Invalid password</p>}

                <Button type="primary" htmlType="submit" style={{ marginTop: "2.5vh"}}>Login</Button>
            </form>
            <ToastContainer />
        </div>
    )
};