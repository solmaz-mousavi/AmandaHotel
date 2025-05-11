import { useState } from "react";
import { RoomDataType } from "../../../dataTypes/Data.type";
import { ValueType } from "../../../dataTypes/Input.type";

type FilterDataPropsType<T> = {
  filterArray: {
    id: string;
    method: "byName" | "min" | "max";
    itemName: string;
    source?: { id: string; title: string }[];
  }[];
  searchResults: T[];
  setFilteredData: (filteredData: T[]) => void;
};
export default function FilterData({
  filterArray,
  searchResults,
  setFilteredData,
}: FilterDataPropsType<RoomDataType>) {
  let MapData = new Map();
  const [state, setState] = useState<ValueType>();
  const filterMethod = (MapData: any) => {
    setFilteredData(
      searchResults.filter((result) =>
        MapData.every(
          (value: ValueType, key: keyof RoomDataType) => result[key] === value
        )
      )
    );
  };

  const changeHandler = async (value: ValueType, itemName: string) => {
    setState(value);
    if (value === "all") {
      await MapData.delete(itemName);
    } else {
      await MapData.set(itemName, value);
    }
    filterMethod(MapData);

    console.log(value, itemName);
    await setState(5);
    console.log(state);
  };
  return (
    <>
      {filterArray.map((filterItem) => {
        if (filterItem.method === "byName") {
          return (
            <select
              value={state}
              onChange={(event) =>
                changeHandler(event.target.value, filterItem.itemName)
              }
            >
              {filterItem.source &&
                filterItem.source.map((item) => (
                  <option value={item.id}>{item.title}</option>
                ))}
            </select>
          );
        } else {
          return <input type="text" />;
        }
      })}
    </>
  );
}
