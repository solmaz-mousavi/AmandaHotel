import { useEffect, useState } from "react";
import { InputType } from "../../../dataTypes/Input.type";
import { intersection } from "../../../utils/arrayIntersection";
import Filter from "../filter/Filter";
import "./filterData.scss";

export type FilterInfoType = {
  inputInfo: InputType;
  filterConditon: (item: any, value: any) => boolean;
  clearFilterConditon: (value: any) => boolean;
};

type FilterDataPropsType<T> = {
  data: T[];
  setFilteredData: (filteredData: T[]) => void;
  filterInfo: FilterInfoType[];
};
export default function FilterData<T extends { id: string }>({
  data,
  setFilteredData,
  filterInfo,
}: FilterDataPropsType<T>) {
  const [dataIDArrays, setDataIDArrays] = useState<string[][]>(
    new Array(filterInfo.length).fill([...data].map((item) => item.id))
  );

  const placeDataArray = (index: number, dataArray: T[]) => {
    const newArray = [...dataIDArrays];
    newArray[index] = dataArray.map((item) => item.id);
    setDataIDArrays(newArray);
  };

  useEffect(() => {
    const newDataIDs = dataIDArrays.reduce((a, b) => intersection(a, b));
		const newData = [...data].filter(item => newDataIDs.includes(item.id));
    setFilteredData(newData);
  }, [dataIDArrays, setFilteredData]);

  return (
    <div className="filtering-wrapper">
      {filterInfo.map((item, index) => (
        <Filter<T>
          filterInfo={item}
          data={data}
          placeDataArray={placeDataArray}
          index={index}
					key={index}
        />
      ))}
    </div>
  );
}
