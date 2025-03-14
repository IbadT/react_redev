import { Col, Empty, Flex, Row, Typography } from "antd"
import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../features/store";
import { useNavigate } from "react-router-dom";
import { ModalToUpdateOrDelete } from "../Modal/ModalToUpdateOrDelete";
import { removeQueryData } from "../../features/queryData/queryDataSlice";


const { Title } = Typography;

export const Favorites: FC = () => {
    const queries = useAppSelector((state: RootState) => state.queryData.queryList);

    const dispatch = useAppDispatch();
    const [updatedId, setUpdatedId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleUpdatedFavorites = (id: string) => {
        navigate(`/save-request/${id}`)
    };

    const handleDeleteFavorites = (id: string) => {
        dispatch(removeQueryData(id))
    };
    
    return (
        <>
            <Col span={12} offset={6}>
                <Flex vertical>
                    <Title className="h-20 mt-10 content-center" level={1}>Избранное</Title>

                    {
                        !queries.length && <Empty description={false} />
                    }

                    <Flex vertical gap={2}>
                        {queries.map(({ id, name, title }) => (

                        <Flex
                            key={id}
                            onMouseEnter={() => setUpdatedId(id)} // Показываем модальное окно при наведении
                            onMouseLeave={() => setUpdatedId(null)} // Скрываем модальное окно при уходе курсора
                            justify={"space-between"}
                            className="bg-white h-10 px-4 hover:h-12 hover:shadow-2xl cursor-pointer transition-all duration-300"
                        >
                            <Row onClick={() => navigate(`/search/${id}`)} align={"middle"} className="w-[80%]">
                                {title}
                            </Row>
                            {updatedId === id && (
                                <ModalToUpdateOrDelete
                                    handleUpdatedFavorites={() => handleUpdatedFavorites(id)}
                                    handleDeleteFavorites={() => handleDeleteFavorites(id)}
                                />
                            )}
                        </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Col>
        </>
    );
}