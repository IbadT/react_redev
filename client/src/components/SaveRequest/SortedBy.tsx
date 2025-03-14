import { Cascader, CascaderProps } from "antd";
import { FC } from "react";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  {
    value: "none",
    label: "Без сортировки",
  },
  {
    value: "views",
    label: "По количеству просмотров",
  },
  {
    value: "date",
    label: "По дате добавления",
  },
  {
    value: "rating",
    label: "По рейтингу",
  },
];

interface ISorterBy {
  value: string;
  setState: (prev: any) => void;
}

export const SortedBy: FC<ISorterBy> = ({ value, setState }) => {
  const onChange: CascaderProps<Option>["onChange"] = (value) => {
    setState((prev: any) => ({
      ...prev,
      sorted: value?.[0],
    }));
  };
  return (
    <Cascader
      defaultValue={["Без сортировки"]}
      className="rounded-none w-full"
      value={[value]}
      size={"large"}
      options={options}
      onChange={onChange}
    />
  );
};
