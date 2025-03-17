import { Col, Empty, Flex, Row, Typography } from "antd"
import { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../features/store";
import { useNavigate } from "react-router-dom";
import { ModalToUpdateOrDelete } from "../Modal/ModalToUpdateOrDelete";
import { addData, assignData, removeQueryData } from "../../features/queryData/queryDataSlice";
import useFavorities, { QueryData, QueryResult, ResponseObject } from "../../hooks/useFavorities";
import { Loading } from "../Loading/Loading";
import axios from "axios";
import api from "../../api/axiosInstance";
import apiService from "../../services/ApiService";


const { Title } = Typography;

export const Favorites: FC = () => {
    // const { data, loading, error } = useFavorities("http://localhost:3000/api/favorities");
    const queries = useAppSelector((state: RootState) => state.queryData.queryList);

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);      


    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const url = "http://localhost:3000/api/favorities";
          let response = await axios.get<ResponseObject[]>(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
  
          // Если токен истек (ошибка 401), обновляем его
          if (response.status === 401) {
            const refresh_token = localStorage.getItem("refresh_token");

            // Обновляем токен
            const { accessToken, refreshToken } = (await axios.post("http://localhost:3000/api/auth/refresh", {
              refresh_token,
            })).data;
  
            // Сохраняем новые токены
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
  
            // Повторяем запрос с новым токеном
            response = await axios.get<ResponseObject[]>(url, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          }
  
          // Обрабатываем данные
          response.data.forEach((item) => {
            const { queryData, queryResult } = item;
            const isDuplicate = queries.some((query) => query.id === queryData.id);
            if (!isDuplicate) {
              dispatch(assignData({ queryList: queryData, queryResults: queryResult }));
            }
          });
        } catch (err: any) {
          if (err.response?.status === 401) {
            // Если refresh token тоже истек, перенаправляем на страницу входа
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login'; // Перенаправление на страницу входа
          } else {
            setError(err.message || 'Something went wrong');
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [dispatch]);



  
    // Получение данных
    // useEffect(() => {
    //   const fetchData = async () => {
    //     setLoading(true);
    //     setError(null);
  
    //     try {
    //       const url = "http://localhost:3000/api/favorities";
    //       let response = await axios.get<ResponseObject[]>(url, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //       });
  
    //       if (response.status !== 200) {
    //         const refresh_token = localStorage.getItem("refresh_token");
    //         console.log({ refresh_token });
            
    //         const { accessToken, refreshToken } = (await axios.post("http://localhost:3000/api/auth/refresh", {
    //           refresh_token
    //         })).data;
    //         console.log({
    //           accessToken,
    //           refreshToken
    //         });
            
    //         localStorage.setItem('token', accessToken);
    //         localStorage.setItem('refresh_token', refreshToken);

    //         response = await axios.get<ResponseObject[]>(url, {
    //           headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //           },
    //         });

    //         throw new Error('Network error');
    //       }
  
    //       response.data.forEach(item => {
    //         const { queryData, queryResult } = item;
    //         const isDuplicate = queries.some(query => query.id === queryData.id);
    //         if (!isDuplicate) {
    //           dispatch(assignData({ queryList: queryData, queryResults: queryResult }));
    //         }
            
    //       })
    //     } catch (err: any) {
    //       setError(err.message || 'Something went wrong');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchData();
    // }, [dispatch]);

    const [updatedId, setUpdatedId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleUpdatedFavorites = (id: string) => {
        navigate(`/save-request/${id}`)
    };

    const handleDeleteFavorites = async (id: string) => {
        try {
            await apiService.deleteFavorite(id);
            dispatch(removeQueryData(id));
        } catch (error) {
            console.error(`Ошибка при удалении ${error}`);
        }
    };

    if (loading) return <Flex className="h-[20vh]" justify={"center"} align={"center"}><Loading /></Flex>;
    if (error) return <div>Error: {error}</div>;
    
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