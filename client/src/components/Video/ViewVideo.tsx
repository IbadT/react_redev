import { Flex } from "antd";
import { FC } from "react";

interface IViewVideo {
  activeIndex: number | null;
  setActiveIndex: (index: number) => void;
}

export const ViewVideo: FC<IViewVideo> = ({ activeIndex, setActiveIndex }) => {
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Flex gap={10}>
      <div
        className={`text-black hover:cursor-pointer ${
          activeIndex === 0 ? "opacity-30" : ""
        } transition-opacity duration-300`}
        onClick={() => handleClick(0)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 6H21"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12H21"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 18H21"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H3.01"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 12H3.01"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 18H3.01"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className={`text-black hover:cursor-pointer ${
          activeIndex === 1 ? "opacity-30" : ""
        } transition-opacity duration-300`}
        onClick={() => handleClick(1)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5H5V10H10V5Z"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 5H14V10H19V5Z"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 14H14V19H19V14Z"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14H5V19H10V14Z"
            stroke="#272727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Flex>
  );
};
