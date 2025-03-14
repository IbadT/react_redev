import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={
        <Button onClick={handleClick} type="primary" size={"large"}>
          На главную
        </Button>
      }
    />
  );
};
