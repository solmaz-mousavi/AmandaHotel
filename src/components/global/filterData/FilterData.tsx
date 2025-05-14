import { useContext, useEffect, useState } from "react";
import { RoomDataType } from "../../../dataTypes/Data.type";
import "./filterData.scss";
import { StaticDataContext } from "../../../context/StaticContext";
import { TbSortDescending } from "react-icons/tb";
import { CiFilter, CiGrid2H } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import SortData, { SortInfoType } from "../sortData/SortData";
import { title } from "process";
import { FormValuesType } from "../../../dataTypes/Form.type";
import Form from "../form/Form";
import { InputType } from "../../../dataTypes/Input.type";
import { ButtonType } from "../../../dataTypes/Button.type";
import { MdOutlineFilterAltOff } from "react-icons/md";
import Input from "../input/Input";

type FilterDataPropsType = {
  searchResults: RoomDataType[];
  setSearchResults: (searchResults: RoomDataType[]) => void;
  filteredData: RoomDataType[];
  setFilteredData: (filteredData: RoomDataType[]) => void;
};

export default function FilterData({
  searchResults,
  setSearchResults,
  setFilteredData,
}: FilterDataPropsType) {
  const { staticData } = useContext(StaticDataContext);

  // const [filterRoomType, setFilterRoomType] = useState("");
  // const [filterRoomView, setFilterRoomView] = useState("");

  // const filterDataHandler = async (roomType, roomView) => {
  //   const filter1Data =
  //     roomType === "" || roomType === "all"
  //       ? data
  //       : [...data].filter((item) => item.roomTypeID === roomType);
  //   const filter2Data =
  //     roomView === "" || roomView === "all"
  //       ? filter1Data
  //       : filter1Data.filter((item) => item.roomViewID === roomView);
  //   setSearchResults(filter2Data);
  // };
  const filterInfo = [
    {
      id: "01",
      tag: "select",
      fieldName: "roomTypeID",
      filterMethod: "byName",
      selectValues: [
        { id: "00", value: "", title: "نمایش همه" },
        ...staticData.roomCategory.map((item) => ({
          id: item.id,
          value: item.id,
          title: item.title,
        })),
      ],
      value: "",
    },
    {
      id: "02",
      tag: "number",
      fieldName: "price",
      filterMethod: "max",
      placeholder: "جداکثر قیمت(تومان)",
      value: "",
    },
  ];
  const [filterState, setFilterState] = useState(filterInfo);

  useEffect(() => {
    // ---- filter handler
    console.log(filterState);
  }, [filterState]);

  // const inputs: (InputType & {
  //   fieldName: keyof RoomDataType;
  //   filterMethod: "byName" | "max" | "min";
  // })[] = [
  //   {
  //     tag: "select",
  //     fieldName: "roomTypeID",
  //     filterMethod: "byName",
  //     name: "roomType",
  //     selectValues: [
  //       { id: "00", value: "", title: "نمایش همه" },
  //       ...staticData.roomCategory.map((item) => ({
  //         id: item.id,
  //         value: item.id,
  //         title: item.title,
  //       })),
  //     ],
  //     validators: [],
  //     initialvalue: "",
  //   },
  //   {
  //     tag: "number",
  //     fieldName: "price",
  //     filterMethod: "max",
  //     name: "maxPrice",
  //     placeholder: "جداکثر قیمت(تومان)",

  //     validators: [],
  //     initialvalue: "",
  //   },
  // ];
  // const buttons: ButtonType[] = [
  //   {
  //     innerHtml: <CiFilter className="filter-icon" />,
  //     type: "submit",
  //     title: "اعمال فیلتر",
  //     bgColor: "transparent",
  //   },
  //   {
  //     innerHtml: <MdOutlineFilterAltOff className="filter-icon" />,
  //     type: "reset",
  //     title: "پاک کردن فیلترها",
  //     bgColor: "transparent",
  //   },
  // ];

  // const submitHandler = (values: FormValuesType) => {
  //   setFilteredData(
  //     [...searchResults].filter((result) =>
  //       inputs.every((item) => {
  //         if (!values[item.name]) {
  //           return true;
  //         } else if (item.filterMethod === "byName") {
  //           return result[item.fieldName] === values[item.name];
  //         } else if (item.filterMethod === "max") {
  //           return result[item.fieldName] <= values[item.name];
  //         }
  //         return result[item.fieldName] >= values[item.name];
  //       })
  //     )
  //   );

  // const filters = Object.entries(values).filter((item) => item[1] !== "");
  // console.log(filters);

  // searchResults.filter((result) => {
  //   let flag;
  //   filters.forEach((filter) => {
  //     const [fieldName, sortMethod]:
  // 		[fieldName: keyof RoomDataType, sortMethod: "byName" | "max" | "min"] = filter[0].split("_");
  //     const fieldValue = filter[1];
  //     console.log(fieldName, sortMethod, fieldValue);

  //     if (sortMethod === "byName") {
  // 			if(fieldName in result){
  // 				return result[fieldName] === fieldValue
  // 			}
  // 			return false;
  //     } else if(sortMethod === "max") {

  // 		} else if(sortMethod === "min"){

  // 		}
  //   });
  // });

  // const { strength, enterDate, exitDate } = items;
  // const reqDates = getDateArray({ startDate: enterDate, endDate: exitDate });

  // if (roomReservations && rooms) {
  //   const reservedRoomIDs = roomReservations
  //     .filter((item) => reqDates.includes(item.date))
  //     .map((i) => i.roomID);

  //   const result = [...rooms].filter(
  //     ({ id, capacity, maxAddedPeople }) =>
  //       Number(strength) <= capacity + maxAddedPeople &&
  //       !reservedRoomIDs.includes(id)
  //   );
  //   setSearchResults(result);
  //   setFilteredData(result);
  //   setShowResults(true);

  //   setFormInfo({ ...items, reqDates });
  // } else {
  //   swal({
  //     text: "مشکلی در سمت سرور پیش آمده، لطفاً مجدادا تلاش کنید",
  //     buttons: ["باشه"],
  //   });
  // }

  // 	const changeHandler = (e:Event)=>{
  // console.log(e.target.value)
  // }

  return (
    <>
      {filterInfo.map((item, index) => (
        <>
          <Input
            name={item.id}
						tag={item.tag}
            value={filterState[index].value}
						className="input"
            onChange={(e) => {
              const newState = filterState;
              newState[index].value = e.target.value;
              setFilterState(newState);
            }}
          />
        </>
      ))}

      {/* <Form
        inputs={inputs}
        buttons={buttons}
        submitHandler={submitHandler}
        formNotReset={true}
      ></Form> */}

      {/* <Input tag="number" name="maxPrice" onChange={(e:Event)=> changeHandler(e)} /> */}
      {/* <div className="view-filter-left">
        <select
          name="filterRoomType"
          id="filterRoomType"
          value={filterRoomType}
          onChange={(event) => {
            setFilterRoomType(event.target.value);
            filterDataHandler(event.target.value, filterRoomView);
          }}
        >
          <option value="" hidden>
            نوع اتاق
          </option>
          <option value="all">نمایش همه</option>
          {staticData?.roomTypes &&
            staticData.roomTypes.map((item) => (
              <option value={item.id}>{item.title}</option>
            ))}
        </select>

        <select
          name="filterRoomView"
          id="filterRoomView"
          value={filterRoomView}
          onChange={(event) => {
            setFilterRoomView(event.target.value);
            filterDataHandler(filterRoomType, event.target.value);
          }}
        >
          <option value="" hidden>
            منظره اتاق
          </option>
          <option value="all">نمابش همه</option>
          {staticData?.roomViews &&
            staticData.roomViews.map((item) => (
              <option value={item.id}>{item.title}</option>
            ))}
        </select>
        <CiFilter className="filter-icon" />
      </div> */}
    </>
  );
}
