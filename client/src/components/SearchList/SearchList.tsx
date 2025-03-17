import { Flex, Pagination } from "antd";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Loading } from "../Loading/Loading";
import { SearchMain } from "./SearchMain";
import { ViewVideoResult } from "../Video/ViewVideoResult";
import { QueryResult, addData } from "../../features/queryData/queryDataSlice";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchYoutube_GET_Videos } from "../../helpers/fetchYoutube";
import * as Sentry from "@sentry/react";
import apiService from "../../services/ApiService";

export interface YoutubeVideoResponse {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface YoutubeApiResponse {
  items: YoutubeVideoResponse[];
}

interface ISearchQuery {
  query: string;
  title: string;
}

// можно заменить на другой из store
export interface YoutubeItems {
  title: string;
  videoId: string;
  name?: string;
  likeCount: string;
  viewCount: string;
  commentCount: string;
  description: string;
  date: string;
}

export const SearchList: FC = () => {
  const { favorite_id } = useParams<{ favorite_id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
    query: "",
    title: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<QueryResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const stateQuery = useAppSelector((state) => state.queryData);

  useEffect(() => {
    if (favorite_id && stateQuery.queryResults[favorite_id]) {
      const videos = stateQuery.queryResults[favorite_id];

      const sortedType = stateQuery.queryList.find((item) => item.id === favorite_id);

      const sortedVideos = sortVideos(videos, sortedType?.sorted || "none");

      // setItems(sortedVideos);
      const count = Number(sortedType?.maxCount) || 50;
      setItems(sortedVideos.slice(0, count));
      
      setSearchQuery({
        query: sortedType?.title || "",
        title: sortedType?.title || "",
      });
    }
  }, [favorite_id]);

  const sortVideos = (
    videos: QueryResult[],
    sortType: string
  ): QueryResult[] => {
    switch (sortType) {
      case "views":
        return [...videos].sort(
          (a, b) => (Number(b.viewCount) || 0) - (Number(a.viewCount) || 0)
        );

      case "date":
        return [...videos].sort((a, b) => {
          const dateA = new Date(a.date || "").getTime() || 0;
          const dateB = new Date(b.date || "").getTime() || 0;
          return dateB - dateA;
        });

      case "rating":
        return [...videos].sort(
          (a, b) => (Number(b.likeCount) || 0) - (Number(a.likeCount) || 0)
        );

      case "none":
      default:
        return videos;
    }
  };

  const searchVideoResult = async (query: string) => {
    if (!query.trim()) {
      setError("Введите запрос для поиска.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // !!!!!! изменить на запрос на сервер
      const maxResults = 50;
      // const response = await fetchYoutube_GET_Videos({
      //   maxResults,
      //   query,
      //   token: localStorage.getItem("token") || "",
      // });
      const response = await apiService.fetchYoutube({maxResults, query});

      if (response.status === 200) {
        const { data } = response;
        // console.log(data);

        setItems(data);
      } else {
        throw new Error("Ошибка при запросе к YouTube API");
      }
    } catch (err) {
      Sentry.captureException(error);
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  const saveDataToRedux = () => {
    const queryListData = {
      id: uuidv4(),
      title: searchQuery.query,
      name: searchQuery.query,
      sorted: "none",
      maxCount: "10",
    };
    sessionStorage.setItem('previousUrl', location.pathname);
    dispatch(addData({ queryList: queryListData, queryResults: items }));
    navigate(`/save-request/${queryListData.id}`);
  };

  const handleSearch = () => {
    setSearchQuery((prev) => ({
      ...prev,
      title: searchQuery.query,
    }));
    searchVideoResult(searchQuery.query);
  };

  // Логика для пагинации
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // Фиксированное количество элементов на странице
  // Логика для пагинации
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Обновляем текущую страницу
  };

  // const { items, loading, error } = useYoutubeSearch(searchQuery);
  // const test = {
  //     items: [],
  //     loading: false,
  //     error: null
  // }
  // const { items, loading, error } = test;

  return (
    <Flex vertical className={"h-screen"}>
      <div className="w-full">
        <div className="container mx-auto flex flex-col justify-center my-10">
          <Flex vertical gap={40}>
            <h1 className="text-4xl text-center">Поиск видео</h1>
            <div>
              <SearchMain
                saveDataToRedux={saveDataToRedux}
                handleSearch={handleSearch}
                searchQuery={
                  stateQuery.queryList.find((i) => i.id === favorite_id)
                    ?.title || searchQuery.query
                }
                setSearchQuery={setSearchQuery}
              />
            </div>
            {loading && <Loading />}
            {error && <div>Ошибка: {error}</div>}
            
            {/* <ViewVideoResult items={items} searchQuery={searchQuery.title} /> */}
            <ViewVideoResult items={currentItems} searchQuery={searchQuery.title} />

            {
              !!currentItems.length 
              && <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={items.length}
                  onChange={handlePageChange}
                  showSizeChanger={false} 
                  style={{ textAlign: 'center', marginTop: '20px' }}
                /> 
            }
            

          </Flex>
        </div>
      </div>
    </Flex>
  );
};

// !!!!!!!!!!!!!!!!!!!!!!
{
  /* <Segmented
    options={[
      { value: 'List', icon: <BarsOutlined /> },
      { value: 'Kanban', icon: <AppstoreOutlined /> },
    ]}
  /> */
}

{
  /* <Flex gap="small" align="flex-start" vertical>
      <Segmented
        options={['small', 'middle', 'large']}
        value={size}
        onChange={(value) => setSize(value as SizeType)}
      />
      <Segmented
        size={size}
        shape="round"
        options={[
          { value: 'light', icon: <SunOutlined /> },
          { value: 'dark', icon: <MoonOutlined /> },
        ]}
      />
    </Flex> */
}
