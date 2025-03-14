import { Button, Flex } from "antd";
import { FC } from "react";

interface IModalToUpdateOrDelete {
  handleUpdatedFavorites: () => void;
  handleDeleteFavorites: () => void;
}

export const ModalToUpdateOrDelete: FC<IModalToUpdateOrDelete> = ({
  handleUpdatedFavorites,
  handleDeleteFavorites,
}) => {
  return (
    <Flex align={"center"}>
      <Button
        onClick={handleUpdatedFavorites}
        type={"default"}
        className="text-[#1390E5] border-none shadow-none hover:shadow-lg duration-300 transition-all"
      >
        Изменить
      </Button>
      <Button
        onClick={handleDeleteFavorites}
        type={"default"}
        className="text-red-600 border-none shadow-none hover:shadow-lg hover:text-red-600 duration-300 transition-all"
      >
        Удалить
      </Button>
    </Flex>
  );
};
