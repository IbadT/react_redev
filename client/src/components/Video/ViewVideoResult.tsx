import { FC, useState } from "react";
import { Col, Flex, Row } from "antd";
import { VideoItem } from "../SearchList/VideoItem";
import { ViewVideo } from "./ViewVideo";
import { QueryResult } from "../../features/queryData/queryDataSlice";

interface IViewVideoResult {
  items: QueryResult[];
  searchQuery: string;
}

export const ViewVideoResult: FC<IViewVideoResult> = ({
  items,
  searchQuery,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Flex vertical>
      <Row align={"middle"}>
        <Col span={24}>
          {!!searchQuery.length && (
            <Flex justify={"space-between"} className="mt-10 mb-5">
              <Flex>Видео по запросу: {<b>"{searchQuery}"</b>}</Flex>
              <Flex>
                <ViewVideo
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </Flex>
            </Flex>
          )}
          <Row gutter={[16, 16]} justify="start">
            {
              items?.map(({ videoId, title, description }) => (
                <Col
                  key={videoId}
                  {...(activeIndex === 0
                    ? { span: 24 }
                    : { xs: 24, sm: 12, md: 6, lg: 6 })}
                >
                  <VideoItem
                    videoId={videoId}
                    title={
                      title.toLocaleLowerCase() === "undefined"
                        ? "Shorts"
                        : title
                    }
                    description={description}
                    videoViewerIndex={activeIndex}
                  />
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
    </Flex>
  );
};
