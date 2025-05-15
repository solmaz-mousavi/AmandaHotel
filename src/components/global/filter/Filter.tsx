import React, { useState } from "react";
import { FilterInfoType } from "../filterData/FilterData";
import Input from "../input/Input";
import { ValueType } from "../../../dataTypes/Input.type";
import { RoomDataType } from "../../../dataTypes/Data.type";
import { BsFileExcel, BsFileExcelFill, BsXSquare } from "react-icons/bs";
import "./filter.css";
import { CiSquareRemove } from "react-icons/ci";

export default function Filter({
  data,
  setNewData,
  id,
  tag,
  fieldName,
  filterMethod,
  value,
  placeholder,
  selectValues,
}: FilterInfoType & {
  data: RoomDataType[];
  setNewData: (newData: RoomDataType[]) => void;
}) {
  const [state, setState] = useState(value);
  const filterHandler = (value: ValueType) => {
    let newData;
    if (value === "") {
      newData = data;
    } else {
      newData = [...data].filter((item) => {
        switch (filterMethod) {
          case "byName":
            return item[fieldName] === value;

          case "max":
            return (
              Number(item[fieldName]) <= Number(String(value).replace(/,/g, ""))
            );

          case "min":
            return (
              Number(item[fieldName]) >= Number(String(value).replace(/,/g, ""))
            );

          default:
            return true;
        }
      });
    }

    setNewData(newData);
  };
  return (
    <div className="filtering-item">
      <CiSquareRemove
        className="icon clear-filter-icon"
        onClick={() => {
          setState("");
          filterHandler("");
        }}
      />
      {tag === "bigNumber" ? (
        <Input
          tag={tag}
          name={id}
          placeholder={placeholder}
          value={state}
          onChange={(event) => {
            const newValue = event.target.value.replace(/,/g, "");
            if (newValue === "" || !isNaN(Number(newValue))) {
              setState(Number(newValue).toLocaleString());
              filterHandler(event.target.value);
            }
          }}
        />
      ) : (
        <Input
          tag={tag}
          name={id}
          value={state}
          onChange={(event) => {
            setState(event.target.value);
            filterHandler(event.target.value);
          }}
          placeholder={placeholder}
          selectValues={selectValues}
        />
      )}
    </div>
  );
}
