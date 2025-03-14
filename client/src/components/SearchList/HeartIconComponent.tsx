import { FC, useState } from "react";
import { HeartTwoTone } from "@ant-design/icons";
import { Flex } from "antd";

interface IHeartIconComponent {
  saveDataToRedux: () => void;
}

export const HeartIconComponent: FC<IHeartIconComponent> = ({
  saveDataToRedux,
}) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    saveDataToRedux();
  };

  return (
    <Flex>
      <div
        onMouseEnter={() => setHover(true)} // Событие при наведении
        onMouseLeave={() => setHover(false)} // Событие при уходе
      >
        <HeartTwoTone
          onClick={handleClick}
          twoToneColor={hover ? "#52c41a" : "#1390E5"}
          className="cursor-pointer"
        />
      </div>
    </Flex>
  );
};
