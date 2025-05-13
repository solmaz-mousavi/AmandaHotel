import { useEffect, useState } from "react";
import { RoomDataType } from "../../../dataTypes/Data.type";
import { ValueType } from "../../../dataTypes/Input.type";
import "./filter.css";
export type FilterInfoType = {
  id: string;
  method: "byName" | "byMinMax";
  fieldName: string;
  source?: { id: string; title: string }[];
};
type FilterDataPropsType<T> = {
  filterInfo: FilterInfoType[];
  searchResults: T[];
  setFilteredData: (filteredData: T[]) => void;
};

export default function Filter({
  filterInfo = [],
  searchResults,
  setFilteredData,
}: FilterDataPropsType<RoomDataType>) {
  const [filterMap, setFilterMap] = useState(new Map());
  const [state, setState] = useState<ValueType[]>([]);



  const changeHandler = async (
    value: ValueType,
    fieldName: string,
    index: number
  ) => {
    const newState = [...state];
    newState[index] = value;
    setState(newState);

    const newMap = new Map(filterMap);
    if (value === "all") {
      await newMap.delete(fieldName);
    } else {
      await newMap.set(fieldName, value);
    }
    setFilterMap(newMap);
  };

  // useEffect(() => {




    // setFilteredData(
      // searchResults.filter((result:RoomDataType) =>
			

				//  filterMap.entries().every((item:[keyof RoomDataType, ValueType])=> result[item[0]] === item[1]
				
				
				
				// )
				
			


				
        // )
      // );
 




  // }, [filterMap]);

  return (
    <>
      {filterInfo.length === 0 ? (
        <></>
      ) : (
        filterInfo.map((filterItem, index) => {
          if (filterItem.method === "byName") {
            return (
              <select
                value={state[index]}
                onChange={(event) =>
                  changeHandler(event.target.value, filterItem.fieldName, index)
                }
              >
                <option value="all">نمابش همه</option>
                {filterItem.source &&
                  filterItem.source.map((item) => (
                    <option value={item.id}>{item.title}</option>
                  ))}
              </select>
            );
          } else {
            return (
              <>
                <input type="text" placeholder="min"/>
                <input type="text" placeholder="max" />
              </>
            );
          }
        })
      )}
    </>
  );
}
