import axios, { AxiosResponse } from "axios";

interface IFetchYoutube {
    maxResults: number;
    query: string;
    token: string | null;
}

export const fetchYoutube_GET_Videos = async ({ maxResults, query, token }: IFetchYoutube): Promise<AxiosResponse> => {
    const url = `http://localhost:3000/api/youtube?searchQuery=${query}?maxResults=${maxResults}`;
    // const url = `${process.env.}`
    return await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    });
};