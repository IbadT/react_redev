import * as yup from 'yup';

export const schema = yup.object().shape({
    user_name: yup.string()
        .required("User name field is required1"),
    
    email: yup.string().email()
        .required("Email field is required1"),
    
    password: yup.string().min(8, "password is too short")
        .required("Password field is required1"),
    
    compare_password: yup.string().oneOf([yup.ref("password"), "Пароли должны совпадать"])
        .required("Compare password is required1"),
    
    birth_date: yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, 'Неверный формат даты')
        .required("Birth date is required1"), 
    
    phone_number: yup.string().matches(/^\+/, "Должен начинаться с +").min(6, "Неверный формат")
        .required("Phone number field is required1")
});