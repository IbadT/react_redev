import { useEffect, useState } from "react";
import { YoutubeApiResponse, YoutubeVideoResponse } from "../components/SearchList/SearchList";
import * as Sentry from "@sentry/react";

const useYoutubeSearch = (query: string) => {
    const [items, setItems] = useState<YoutubeVideoResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const searchVideoResult = async () => {
            setLoading(true);
            try {
                const API_KEY = "AIzaSyCcicvMQVrDcHzTHUKaKaddIiofnh8P0f4";
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=10&key=${API_KEY}`
                );
                if (!response.ok) throw new Error("Ошибка при запросе к YouTube API");
                const data: YoutubeApiResponse = await response.json();
                setItems(data.items);
            } catch (err: any) {
                Sentry.captureException(error);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        searchVideoResult();
    }, [query]);

    return { items, loading, error };
};