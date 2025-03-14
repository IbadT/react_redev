import { ChangeEvent, FC, useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button, Flex, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { SortedBy } from "./SortedBy";
import { DecimalStep } from "./DecimalStep";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { removeSearchQuery } from "../../features/searchQuery/searchQuerySlice";
import { RootState } from "../../features/store";
import { setQueryLists } from "../../features/queryData/queryDataSlice";

export const SaveRequest: FC = () => {
  const { favorite_id } = useParams();

  const stateQueryList = useAppSelector((state: RootState) =>
    state.queryData.queryList.find((item) => item.id === favorite_id)
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    title: "",
    name: "",
    sorted: "",
    maxCount: "",
  });

  // Инициализация состояния при наличии запроса
  useEffect(() => {
    if (stateQueryList) {
      setState({
        title: stateQueryList?.title || "",
        name: stateQueryList?.name || "",
        sorted: stateQueryList?.sorted || "",
        maxCount: stateQueryList?.maxCount || "",
      });
    }
  }, []);

  // Обработчик сохранения
  const saveHandler = () => {
    if (
      !state.title ||
      !state.name ||
      !state.sorted ||
      state.maxCount === "0"
    ) {
      toast.error("🦄 Заполните все поля", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    let result: {
      id: string;
      title: string;
      name: string;
      sorted: string;
      maxCount: string;
    };
    if (favorite_id) {
      result = {
        id: favorite_id,
        title: state.title,
        name: state.name,
        sorted: state.sorted,
        maxCount: state.maxCount.toString(),
      };
      dispatch(setQueryLists({ id: favorite_id, result }));
    }

    toast.success("🦄 Запрос успешно сохранен", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    localStorage.setItem("updated", "ok");

    setTimeout(() => {
      navigate(`/search/${result.id}`);
    }, 2900);
  };

  // Обработчик отмены сохранения
  const dontSaveHandler = () => {
    if (favorite_id) {
      dispatch(removeSearchQuery(favorite_id));
    //   navigate('/');
    }
    navigate("/");
  };

  // Обработчик изменения полей формы
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-[#1390E5CC]">
      <Modal>
        <Flex gap={20} vertical className="w-2/3">
          <Flex justify={"center"}>
            <b>Cохранить запрос</b>
          </Flex>

          <Flex vertical gap={20}>
            <label className="text-sm">
              Запрос
              <Input
                onChange={handleChange}
                name="title"
                value={state.title}
                className="rounded-md bg-[#FAFAFA]"
                placeholder="чем кормить кота"
                size={"large"}
              />
            </label>

            <label className="text-sm">
              Название
              <Input
                name="name"
                value={state.name}
                onChange={handleChange}
                required
                className="rounded-md"
                placeholder="Укажите название"
                size={"large"}
              />
            </label>

            <Flex vertical>
              <label className="text-sm">Сортировать по</label>
              <SortedBy value={state.sorted} setState={setState} />
            </Flex>

            <Flex vertical>
              <label className="text-sm">Максимальное количество</label>
              <DecimalStep value={+state.maxCount} setState={setState} />
            </Flex>
          </Flex>

          <Flex gap={5} justify={"center"}>
            <Button
              onClick={dontSaveHandler}
              size={"large"}
              type={"default"}
              className="w-1/2 rounded-[4px] border-[#1390E5] text-[#1390E5]"
            >
              Не сохранять
            </Button>

            <Button
              onClick={saveHandler}
              size={"large"}
              type={"primary"}
              className="w-1/2 rounded-[4px]"
            >
              Сохранить
            </Button>
          </Flex>
        </Flex>
      </Modal>

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