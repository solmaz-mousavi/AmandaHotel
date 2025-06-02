import { useState } from "react";
import { FilterInfoType } from "../filterData/FilterData";
import Input from "../input/Input";
import "./filter.css";
import { TbFilterOff } from "react-icons/tb";
type FilterPropsType<T> = {
  filterInfo: FilterInfoType;
  data: T[];
  index: number;
  placeDataArray: (index: number, dataArray: T[]) => void;
};
export default function Filter<T>({
  filterInfo,
  data,
  index,
  placeDataArray,
}: FilterPropsType<T>) {
  const [value, setValue] = useState(filterInfo.inputInfo.initialvalue);

  const filterHandler = (value: any) => {
    setValue(value);
    const newData = filterInfo.clearFilterConditon(value)
      ? data
      : [...data].filter((item) => filterInfo.filterConditon(item, value));
    placeDataArray(index, newData);
  };

  return (
    <div className="filtering-item">
      <TbFilterOff
        className="clear-filter-icon"
        onClick={() => filterHandler(filterInfo.inputInfo.initialvalue)}
      />

      <Input
        {...filterInfo.inputInfo}
        value={value}
        onChange={(e) => filterHandler(e.target.value)}
      />
    </div>
  );
}
