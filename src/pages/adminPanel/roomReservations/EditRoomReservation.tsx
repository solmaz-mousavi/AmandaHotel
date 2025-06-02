import { useNavigate, useParams } from "react-router-dom";
import "./roomReservations.scss";
import swal from "sweetalert";
import { useContext, useState } from "react";
import { StaticDataContext } from "../../../context/StaticContext";
import {
  useEditRoomReservationMutation,
  useGetRoomReservationQuery,
  useGetRoomReservationsQuery,
} from "../../../app/services/roomReservationApi";
import { useGetRoomsQuery } from "../../../app/services/roomApi";
import { useGetUsersQuery } from "../../../app/services/userApi";
import { DetailsDataType } from "./AddRoomReservation";
import { FormInputType } from "../../../dataTypes/Input.type";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import {
  pastDateValidator,
  requiredDateValidator,
  requiredNumberValidator,
  requiredStringValidator,
} from "../../../validator/rules";
import Form from "../../../components/global/form/Form";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import { getDateArray } from "../../../utils/getDateArray";
import { intersection } from "../../../utils/arrayIntersection";
import { RoomReservationDataType } from "../../../dataTypes/Data.type";
import Loader from "../../../components/global/loader/Loader";

export default function EditRoomReservation() {
  const params = useParams();
  const navigate = useNavigate();

  const { staticData } = useContext(StaticDataContext);
  const { data: roomReservationInfo } = useGetRoomReservationQuery(
    params.ID || ""
  );
  const { data: rooms } = useGetRoomsQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const { data: users } = useGetUsersQuery();
  const [EditRoomReservation] = useEditRoomReservationMutation();

  const [showDetails, setShowDetails] = useState(true);
  const [details, setDetails] = useState<DetailsDataType>(
    {} as DetailsDataType
  );

  if (
    !roomReservationInfo ||
    !staticData ||
    !rooms ||
    !roomReservations ||
    !users
  ) {
    return <Loader />;
  }

  const {id, userID, roomID, strength, dates } = roomReservationInfo;

  const inputs: FormInputType[] = [
    {
      tag: "select",
      name: "userID",
      label: {
        content: "نام کاربر : ",
        color: "#222",
      },
      selectValues: users.map((item) => ({
        id: item.id,
        value: item.id,
        title: item.name,
      })),
      validators: [requiredStringValidator()],
      initialvalue: userID,
    },
    {
      tag: "select",
      name: "roomID",
      label: {
        content: "شماره اتاق : ",
        color: "#222",
      },
      selectValues: rooms.map((item) => ({
        id: item.id,
        value: item.id,
        title: String(item.roomNumber),
      })),
      validators: [requiredStringValidator()],
      initialvalue: roomID,
    },
    {
      tag: "number",
      name: "strength",
      label: {
        content: "تعداد نفرات : ",
        color: "#222",
      },
      validators: [requiredNumberValidator()],
      initialvalue: strength,
    },
    {
      tag: "date",
      name: "enterDate",
      label: {
        content: "تاریخ ورود",
        color: "#222",
      },
      validators: [requiredDateValidator(), pastDateValidator()],
      initialvalue: dates[0],
    },
    {
      tag: "date",
      name: "exitDate",
      label: {
        content: "تاریخ خروج",
        color: "#222",
      },
      validators: [requiredDateValidator()],
      initialvalue:  new DateObject(dates[dates.length - 1]).add(1, "day").format(),
    },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: `${showDetails ? "مشاهده جزئیات" : "ویرایش اطلاعات"}`,
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = async (items: FormValuesType) => {
    const { userID, roomID, strength, enterDate, exitDate } = items;
    const reqDates = getDateArray({ startDate: enterDate, endDate: exitDate });
    const room = rooms.filter((item) => item.id === roomID)[0];
		const user = users.filter((item) => item.id === userID)[0];
    const price =
      (room.price +
        Math.max(
          (Number(strength) - room.capacity) * room.pricePerAddedPerson,
          0
        )) *
      reqDates.length;
    const reserved = roomReservations.filter(
      (item) =>
        item.roomID === roomID && intersection(reqDates, item.dates).length > 0 && item.id !== id
    );
    const desc =
      reserved.length > 0
        ? "اتاق مورد نظر در تاریخ های انتخاب شده پر است. برای انتخاب بهتر می توانید تاریخ هایی که اتاق رزرو شده است، از تقویم ببینید. "
        : "اتاق مورد نظر در روزهای انتخابی قابل ویرایش است. با ثبت سفارش می توانید نسبت به ویرایش اطلاعات اقدام کنید.";
    const reservedDatesValues = roomReservations
      .filter((item) => item.roomID === roomID)
      .map((item) => {
        const enterDayArray = item.dates[0].split("/");
        const exitDayArray = item.dates[item.dates.length - 1].split("/");

        return [
          new DateObject().set({
            calendar: persian,
            locale: persian_en,
            year: Number(enterDayArray[0]),
            month: Number(enterDayArray[1]),
            day: Number(enterDayArray[2]),
          }),
          new DateObject().set({
            calendar: persian,
            locale: persian_en,
            year: Number(exitDayArray[0]),
            month: Number(exitDayArray[1]),
            day: Number(exitDayArray[2]),
          }),
        ];
      });

    setDetails({
      room,
      price: price.toLocaleString(),
      reserved,
      reservedDatesValues,
      length: reqDates.length,
      strength,
      desc,
    });

    if (showDetails) {
      if (reserved.length === 0) {
        setShowDetails(false);
      } else {
        setShowDetails(true);
      }
    } else {

      if (reserved.length === 0) {
       
      const newReservation: RoomReservationDataType = {
				...roomReservationInfo,
        userID: String(userID),
        roomID: String(roomID),
        dates: reqDates,
        strength: Number(strength),
        price,
      };

      await EditRoomReservation(newReservation);
      swal({
        text: `رزرو اتاق شماره ${room.roomNumber} توسط ${user.name} از تاریخ ${enterDate} تا تاریخ ${exitDate} ویرایش گردید.`,
        buttons: ["باشه"],
      });
      navigate("/amandaHotel/adminPanel/roomReservations"); 

      } else {
        setShowDetails(true);
      }


    }
  };

  return (
    <div className="addRoomReservations-wrapper container">
      <Form
        inputs={inputs}
        buttons={buttons}
        submitHandler={submitHandler}
        formNotReset={true}
      />
      {details.room && (
        <div className="addReservation-details-wrapper">
          <div>
            <strong>
              قیمت {details.length} شب اقامت به ازای {details.strength} نفر :{" "}
            </strong>
            <span>{details.price} تومان</span>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              value={details.reservedDatesValues}
              calendar={persian}
              locale={persian_en}
              multiple
              range
            />
          </div>
          <div>{details.desc}</div>
        </div>
      )}
    </div>
  );
}
