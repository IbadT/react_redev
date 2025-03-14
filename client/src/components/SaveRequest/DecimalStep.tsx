import { Col, Flex, InputNumber, InputNumberProps, Row, Slider } from "antd";
import { FC } from "react";

interface IDecimalStep {
  value: number;
  setState: (prev: any) => void;
}

export const DecimalStep: FC<IDecimalStep> = ({ value, setState }) => {
  const onChange: InputNumberProps["onChange"] = (value) => {
    if (Number.isNaN(value)) {
      return;
    }
    setState((prev: any) => ({
      ...prev,
      maxCount: value as number,
    }));
  };

  return (
    <Row className="">
      <Flex gap={15} className="w-full">
        {/* выровнять по центру */}
        <Col span={15} className="">
          <Slider
            min={0}
            max={50}
            onChange={onChange}
            value={typeof value === "number" ? value : 0}
            step={5}
          />
        </Col>

        <Col span={2}>
          <InputNumber
            size={"large"}
            min={0}
            max={50}
            className="rounded-[4px]"
            step={5}
            value={value}
            onChange={onChange}
          />
        </Col>
      </Flex>
    </Row>
  );
};
