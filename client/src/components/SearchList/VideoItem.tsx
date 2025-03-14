import { Skeleton } from "antd";
import { FC, useState } from "react";

interface IVideoItem {
  videoId: string;
  title: string;
  description: string;
  videoViewerIndex: number;
}

export const VideoItem: FC<IVideoItem> = ({
  videoId,
  title,
  description,
  videoViewerIndex,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      className={`flex ${
        videoViewerIndex ? "flex-col" : "justify-start"
      } gap-4`}
    >
      <div
        className={`
          flex-shrink-0 
          ${videoViewerIndex === 0 ? "w-40 h-24" : "w-full h-30"}`}
      >
        {/* Skeleton отображается, пока изображение не загрузится */}
        {!isLoaded && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton.Image
              active
              style={{
                width: videoViewerIndex ? "19rem" : "10rem",
                height: videoViewerIndex ? "9.4rem" : "6rem",
              }}
            />
          </div>
        )}

        {/* Iframe отображается после загрузки */}
        <iframe
          className={`w-full h-full ${isLoaded ? "" : "hidden"}`} // Прячем iframe до загрузки
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="title"
          onLoad={() => setIsLoaded(true)} // Событие загрузки
        ></iframe>
      </div>

      <div className="flex flex-col justify-start">
        <div className="text-lg font-semibold mb-2">{title}</div>
        <div className="text-[0.7rem] text-gray-500">
          {description.length > 100
            ? `${description.slice(0, videoViewerIndex === 0 ? 350 : 200)}...`
            : description}
        </div>
      </div>
    </div>
  );
};
