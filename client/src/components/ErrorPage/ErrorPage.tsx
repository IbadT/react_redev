import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button onClick={handleClick} type="primary" size={"large"}>
          На главную
        </Button>,
      ]}
    ></Result>
  );
};
