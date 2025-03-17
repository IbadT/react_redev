import axios from "axios";
import { useEffect, useState } from "react";
// import { QueryData } from "../features/queryData/queryDataSlice";

export interface QueryData {
    id: string;
    title: string;
    name: string;
    sorted: string;
    maxCount: string;
  }
  
  export interface QueryResult {
    id: string;
    title: string;
    videoId: string;
    likeCount: string;
    viewCount: string;
    commentCount: string;
    description: string;
    date: string;
  }
  
  export interface ResponseObject {
    queryData: QueryData;
    queryResult: QueryResult[];
  }



function useFavorities(url: string) {
    const [data, setData] = useState<ResponseObject[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
      
            try {
              const response = await axios.get(url, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
      
              if (response.status !== 200) {
                throw new Error('Network error');
              };
      
              setData(response.data);
            } catch (err: any) {
              setError(err.message || 'Something went wrong');
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();

    }, [url]);

    return { data, loading, error };
}

export default useFavorities;