import { useState } from "react";
import { useGetRoomsQuery } from "../../app/services/roomApi";
import { useGetRoomReservationsQuery } from "../../app/services/roomReservationApi";
import "./roomReservation.scss";
import { getDateArray } from "../../utils/getDateArray";
import Aos from "../../components/global/aos/Aos";
import Pagination from "../../components/global/pagination/Pagination";
import NoData from "../../components/template/noData/NoData";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import Form from "../../components/global/form/Form";
import {
  pastDateValidator,
  requiredDateValidator,
  requiredNumberValidator,
} from "../../validator/rules";
import { FormValuesType } from "../../dataTypes/Form.type";
import { ButtonType } from "../../dataTypes/Button.type";
import { InputType } from "../../dataTypes/Input.type";
import { RoomDataType } from "../../dataTypes/Data.type";
import swal from "sweetalert";
import RoomThumb from "../../components/module/roomThumb/RoomThumb";
import FilterData from "../../components/global/filterData/FilterData";
import ViewStyle from "../../components/global/viewStyle/ViewStyle";
import SortData, {
  SortInfoType,
} from "../../components/global/sortData/SortData";

export default function RoomReservation() {
  const { data: rooms } = useGetRoomsQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const [searchResults, setSearchResults] = useState<RoomDataType[]>(
    [] as RoomDataType[]
  );
  const [filteredData, setFilteredData] = useState<RoomDataType[]>(
    [] as RoomDataType[]
  );
  const [showResults, setShowResults] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [view, setView] = useState<"grid" | "list">("grid");
  const perPage = view === "grid" ? 3 : 2;

	// ---- form ---- room reservation serching ----
  const [formInfo, setFormInfo] = useState<{ [key: string]: any }>({});
  const inputs: InputType[] = [
    {
      tag: "date",
      name: "enterDate",
      label: {
        content: "تاریخ ورود",
        color: "#222",
      },
      validators: [requiredDateValidator(), pastDateValidator()],
      initialvalue: "",
    },
    {
      tag: "date",
      name: "exitDate",
      label: {
        content: "تاریخ خروج",
        color: "#222",
      },
      validators: [requiredDateValidator()],
      initialvalue: "",
    },
    {
      tag: "number",
      name: "strength",
      label: {
        content: "تعداد نفرات",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: 1,
    },
    //     {
    //   tag: "recaptcha",
    // 	name:"recaptcha",
    //   validators: [requiredStringValidator()],
    //   initialvalue: "",
    // },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: "مشاهده اتاق های خالی",
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = (items: FormValuesType) => {
    const { strength, enterDate, exitDate } = items;
    const reqDates = getDateArray({ startDate: enterDate, endDate: exitDate });

    if (roomReservations && rooms) {
      const reservedRoomIDs = roomReservations
        .filter((item) => reqDates.includes(item.date))
        .map((i) => i.roomID);

      const result = [...rooms].filter(
        ({ id, capacity, maxAddedPeople }) =>
          Number(strength) <= capacity + maxAddedPeople &&
          !reservedRoomIDs.includes(id)
      );
      setSearchResults(result);
      setFilteredData(result);
      setShowResults(true);

      setFormInfo({ ...items, reqDates });
    } else {
      swal({
        text: "مشکلی در سمت سرور پیش آمده، لطفاً مجدادا تلاش کنید",
        buttons: ["باشه"],
      });
    }
  };

	// ---- sorting information ----
  const sortInfo: SortInfoType<RoomDataType>[] = [
    {
      id: "01",
      title: "پیش فرض",
      fieldName: "roomNumber",
      sortMethod: "ValueMinToMax",
    },
    {
      id: "02",
      title: "محبوب ترین",
      fieldName: "score",
      sortMethod: "ValueMaxToMin",
    },
    {
      id: "03",
      title: "ارزان ترین",
      fieldName: "price",
      sortMethod: "ValueMinToMax",
    },
    {
      id: "04",
      title: "گران ترین",
      fieldName: "price",
      sortMethod: "ValueMaxToMin",
    },
  ];

  return (
    <>
      <PageHeader title="اطلاعاتت رو وارد کن تا بتونی اتاق های خالی رو ببینی" />

      <div className="roomSearch-container">
        <Form
          inputs={inputs}
          buttons={buttons}
          submitHandler={submitHandler}
        ></Form>

        {showResults && (
          <>
            <div className="filter-data-wrapper">
              <div className="filter-data-right">
                <ViewStyle setView={setView} />
                <SortData
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  setFilteredData={setFilteredData}
                  sortInfo={sortInfo}
                />
              </div>

              <div className="filter-data-left">
                <FilterData
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                />
              </div>
            </div>
          </>
        )}

        <div className={`results-wrapper ${view}`}>
          {showResults && filteredData.length === 0 ? (
            <NoData />
          ) : (
            filteredData
              ?.slice(startIndex, startIndex + perPage)
              .map((item) => (
                <Aos aosStyle="fadeIn" once={true} key={item.id}>
                  <RoomThumb
                    room={{ ...item }}
                    viewStyle={view}
                    formInfo={formInfo}
                  />
                </Aos>
              ))
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="pagination-wrapper">
            <Pagination
              dataLength={filteredData.length}
              perPage={perPage}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
            />
          </div>
        )}
      </div>
    </>
  );
}
