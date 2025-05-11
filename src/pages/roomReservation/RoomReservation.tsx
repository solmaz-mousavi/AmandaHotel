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
	requiredStringValidator,
} from "../../validator/rules";
import { FormValuesType } from "../../dataTypes/Form.type";
import { ButtonType } from "../../dataTypes/Button.type";
import { InputType } from "../../dataTypes/Input.type";

export default function RoomReservation() {
  const { data: rooms } = useGetRoomsQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [view, setView] = useState("grid");
  const perPage = view === "grid" ? 3 : 2;

  const [formInfo, setFormInfo] = useState(null);
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
		    {
      tag: "recaptcha",
			name:"recaptcha",
      validators: [requiredStringValidator()],
      initialvalue: "",
    },
  ];
  const buttons: ButtonType[] = [
    {
      title: "مشاهده اتاق های خالی",
      type: "submit",
      className: "btn btn-gold btn-lg",
    },
  ];
  const submitHandler = (items: FormValuesType) => {
    console.log(items);
    //   const { strength, enterDate, exitDate } = items;
    //   const reqDates = getDateArray(enterDate, exitDate);
    // 	if(roomReservations){
    //   const reservedRoomIDs = filterByNameOutputByOneItem(
    //     roomReservations,
    //     "date",
    //     reqDates,
    //     "roomID"
    //   );
    //   setSearchResults(
    //     [...rooms].filter(
    //       ({ id, capacity, maxAddedPeople }) =>
    //         Number(strength) <= capacity + maxAddedPeople &&
    //         !reservedRoomIDs.includes(id)
    //     )
    //   );
    //   setShowResults(true);
    //   setFormInfo({ ...items }, reqDates);
    // } else {
    // 	swal({
    // 		text:"مشکلی در سمت سرور پیش آمده، لطفاً مجدادا تلاش کنید",
    // 		buttons: "باشه",
    // 	});
    // }
  };

  return (
    <>
      <PageHeader title="اطلاعاتت رو وارد کن تا بتونی اتاق های خالی رو ببینی" />

      <div className="roomSearch-container">
        <h1 className="page-header-desc ">
          اطلاعاتت رو وارد کن تا بتونی اتاق های خالی رو ببینی
        </h1>

        <Form
          inputs={inputs}
          buttons={buttons}
          submitHandler={submitHandler}
        ></Form>

        {/* {showResults && (
        <ViewType
          setView={setView}
          strength={formInfo.strength}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      )} */}

        <div className={`results-wrapper ${view}`}>
          {showResults && searchResults.length === 0 ? (
            <NoData />
          ) : (
            searchResults
              ?.slice(startIndex, startIndex + perPage)
              .map((item) => (
                <Aos aosStyle="fadeIn" once={true}>
                  {/* <RoomThumb
                room={{ ...item }}
                viewStyle={view}
                formInfo={formInfo}
              /> */}
                </Aos>
              ))
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="pagination-wrapper">
            <Pagination
              dataLength={searchResults.length}
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
