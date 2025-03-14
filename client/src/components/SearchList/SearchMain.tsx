import { Button, Col, Flex, Input, Row } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";

import { SaveRequestCompleted } from "../SaveRequest/SavedRequestCompleted";
import { HeartIconComponent } from "./HeartIconComponent";

interface ISearchQuery {
  query: string;
  title: string;
}

interface ISearchMainProps {
  handleSearch: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<ISearchQuery>>;
  saveDataToRedux: () => void;
}

export const SearchMain: FC<ISearchMainProps> = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
  saveDataToRedux,
}) => {
  const updatedStatus = localStorage.getItem("updated");
  const [showSavedModal, setShowSavedModal] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState(false); // Новый state для отслеживания
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("");

  const handleClick = () => {
    setIsSearching(true);
    setCurrentSearchQuery(searchQuery);
    handleSearch();
  };

  useEffect(() => {
    if (updatedStatus === "ok") {
      setShowSavedModal(true);
      setTimeout(() => {
        setShowSavedModal(false);
        localStorage.removeItem("updated");
      }, 10000);
    }
  }, []);

  return (
    <Row align={"middle"}>
      <Col span={24}>
        <Flex justify={"center"} align={"center"}>
          <Input
            required
            className="rounded-r-sm focus:bg-[#C5E4F94D]"
            size="large"
            placeholder="Что хотите посмотреть?"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery((prev: ISearchQuery) => ({
                ...prev,
                query: e.target.value,
              }))
            }
            suffix={
              isSearching && (
                <HeartIconComponent saveDataToRedux={saveDataToRedux} />
              )
            }
          />

          <Button
            onClick={handleClick}
            disabled={!searchQuery.length ? true : false}
            className="rounded-l-sm w-[180px]"
            type="primary"
            size="large"
          >
            Найти
          </Button>

          <div className={"relative"}>
            <div className={"absolute top-3 right-10 z-50"}>
              {showSavedModal && (
                <SaveRequestCompleted setShowSavedModal={setShowSavedModal} />
              )}
            </div>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};
