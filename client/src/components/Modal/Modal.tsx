import { FC } from "react";

interface IModal {
  children: React.ReactNode;
}

export const Modal: FC<IModal> = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center">
      <div className="bg-white w-full md:w-1/3 h-[500px] mx-auto flex flex-col justify-around py-8 items-center rounded-md">
        {children}
      </div>
    </div>
  );
};
