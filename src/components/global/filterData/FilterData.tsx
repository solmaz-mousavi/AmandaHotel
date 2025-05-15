import React, { useEffect, useState } from "react";
import { RoomDataType } from "../../../dataTypes/Data.type";
import { TagType, ValueType } from "../../../dataTypes/Input.type";
import Filter from "../filter/Filter";
import { intersection } from "../../../utils/arrayIntersection";
import "./filterData.scss";

export type FilterInfoType = {
  id: string;
  tag: TagType;
  fieldName: keyof RoomDataType;
  filterMethod: "byName" | "max" | "min";
  value: ValueType;
  placeholder?: string;
  selectValues?: {
    [index in "id" | "title" | "value"]: string;
  }[];
};

type FilterDataPropsType = {
  searchResults: RoomDataType[];
  setFilteredData: (filteredData: RoomDataType[]) => void;
  filterInfo: FilterInfoType[];
};
export default function FilterData({
  searchResults,
  setFilteredData,
  filterInfo,
}: FilterDataPropsType) {
  const [data1, setData1] = useState(searchResults);
  const [data2, setData2] = useState(searchResults);

  useEffect(() => {
    console.log(data1, data2);
const filteredData = intersection(data1, data2)

setFilteredData(filteredData);



  }, [data1, data2, setFilteredData]);

  return (
    <div className="filtering-wrapper">
      {filterInfo &&
        filterInfo.length > 0 &&
        filterInfo.map((item, index) => (
          <Filter
            {...item}
            key={item.id}
            data={searchResults}
            setNewData={[setData1, setData2][index]}
          />
        ))}
    </div>
  );
}
