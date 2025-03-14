import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navigate: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center">
          <div className="mx-3 hover:rotate-180 duration-150">
            <svg
              width="64"
              height="64"
              viewBox="0 0 88 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M59.1488 43.5667L24.683 60.9559V79.399L59.1488 62.0098V43.5667Z"
                fill="#1390E5"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.683 26.1787L59.1487 43.5679V62.0111L24.683 44.6218V26.1787Z"
                fill="#1180CB"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M59.1488 8.79071L24.683 26.1799V44.623L59.1488 27.2338V8.79071Z"
                fill="#35A2EC"
              />
            </svg>
          </div>

          <Link
            to="/search"
            className="text-[#1390E5] mx-5 cursor-pointer h-full content-center relative group"
          >
            Поиск
            <span
              className={`absolute bottom-0 h-0.5 bg-[#1390E5] transition-all duration-300 ${
                isActive("/search") || isActive("/")
                  ? "w-full left-0"
                  : "w-0 left-1/2 -translate-x-1/2"
              } group-hover:w-full group-hover:left-0 group-hover:translate-x-0`}
            ></span>
          </Link>

          <Link
            to="/favorites"
            className="text-[#1390E5] mx-5 cursor-pointer h-full content-center relative group"
          >
            Избранное
            <span
              className={`absolute bottom-0 h-0.5 bg-[#1390E5] transition-all duration-300 ${
                isActive("/favorites")
                  ? "w-full left-0"
                  : "w-0 left-1/2 -translate-x-1/2"
              } group-hover:w-full group-hover:left-0 group-hover:translate-x-0`}
            ></span>
          </Link>
        </div>

        <div
          onClick={handleLogOut}
          className="text-[#1390E5] cursor-pointer content-center relative group"
        >
          Выйти
          <span
            className={`absolute bottom-0 h-0.5 bg-[#1390E5] transition-all duration-300 ${
              isActive("/logout")
                ? "w-full left-0"
                : "w-0 left-1/2 -translate-x-1/2"
            } group-hover:w-full group-hover:left-0 group-hover:translate-x-0`}
          ></span>
        </div>
      </div>
    </div>
  );
};
