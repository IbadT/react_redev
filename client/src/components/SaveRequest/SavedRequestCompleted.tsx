import { CloseOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface ISaveRequestCompleted {
  setShowSavedModal: (value: boolean) => void;
}

export const SaveRequestCompleted: FC<ISaveRequestCompleted> = ({
  setShowSavedModal,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const handleClick = () => {
    localStorage.removeItem("updated");
    setShowSavedModal(false);
  };

  return (
    <div
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={"p-3 shadow-lg rounded-md bg-white w-[200px] relative"}
    >
      <div>Поиск сохранен в разделе "Избранное"</div>

      <br />

      <div>
        <Link to={"/favorites"} className="text-[#1390E5]">
          Перейти в избранное
        </Link>
      </div>

      {hover && (
        <div
          onClick={handleClick}
          className={"absolute top-1 right-1.5 cursor-pointer"}
        >
          <CloseOutlined />
        </div>
      )}
    </div>
  );
};
