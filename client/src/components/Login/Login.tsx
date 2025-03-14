import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import * as Sentry from "@sentry/react";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

const toastConfig = {
  position: "top-right" as const,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light" as const,
  transition: Bounce,
};

export const Login: FC = () => {
  const pathname = useLocation().pathname;
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `http://localhost:4200/auth${pathname}`;
      // const url = `${process.env.REACT_APP_API_URL}/auth${pathname}`
      // console.log({url});
      
      const response: AxiosResponse = await axios.post(url, {
        login,
        password,
      });
      if (
        response.data &&
        response.data.accessToken &&
        response.data.refreshToken
      ) {
        const { accessToken, refreshToken }: AuthResponse = response.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        toast.success("🦄 Вы успешно авторизировались", toastConfig);

        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
        toast.error("🦄 Ошибка: токены не получены", toastConfig);
        console.error("Токены не получены в ответе от сервера");
      }
      navigate("/");
    } catch (error) {
      Sentry.captureException(error);
      toast.error("🦄 Неверный логин или пароль", toastConfig);
      console.error("Ошибка аутентификации:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center">
      <div className="bg-white w-full md:w-1/3 h-[500px] mx-auto flex flex-col justify-around py-8 items-center rounded-md">
        <div className="h-1/2 flex flex-col justify-around items-center">
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M59.1488 43.5667L24.683 60.9559V79.399L59.1488 62.0098V43.5667Z"
              fill="#1390E5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.683 26.1787L59.1487 43.5679V62.0111L24.683 44.6218V26.1787Z"
              fill="#1180CB"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M59.1488 8.79071L24.683 26.1799V44.623L59.1488 27.2338V8.79071Z"
              fill="#35A2EC"
            />
          </svg>

          <h3>{pathname === "/register" ? "Регистрация" : "Войти"}</h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col w-2/3 mx-auto">
          <label className="flex flex-col text-gray-300 my-2">
            Логин
            <Input
              size={"large"}
              className="rounded-md"
              value={login}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLogin(e.target.value)
              }
            />
          </label>
          <label className="flex flex-col text-gray-300 my-2">
            Пароль
            <Input.Password
              size="large"
              className="rounded-md"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </label>
          <div className="w-full flex justify-center my-5">
            <Button
              htmlType={"submit"}
              className="w-1/2"
              type="primary"
              size="large"
            >
              {pathname === "/register" ? "Зарегистрироваться" : "Войти"}
            </Button>
          </div>
        </form>

        <Flex>
          <Link
            to={pathname === "/register" ? "/login" : "/register"}
            className={"underline"}
          >
            {pathname === "/login" ? "Зарегистрироваться" : "Войти"}
          </Link>
        </Flex>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};
