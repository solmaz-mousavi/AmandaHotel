import DataTable, {
  TableExpandsType,
  TableRowsType,
} from "../../../components/global/dataTable/DataTable";
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
} from "../../../app/services/roomApi";
import { useContext, useEffect, useState } from "react";
import { TableNode } from "@table-library/react-table-library";
import { StaticDataContext } from "../../../context/StaticContext";
import Score from "../../../components/global/score/Score";
import CommentsCount from "../../../components/global/commentsCount/CommentsCount";
import { BiSolidDetail } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useGetRoomReservationsQuery } from "../../../app/services/roomReservationApi";
import Button from "../../../components/global/button/Button";
import "./rooms.scss";
import LikesCount from "../../../components/global/likesCount/LikesCount";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import { useGetUsersQuery } from "../../../app/services/userApi";
import { ScoreDataType } from "../../../dataTypes/Main.type";
import Comment from "../../../components/global/comment/Comment";
import Avatar from "../../../components/global/avatar/Avatar";
import FilterData, {
  FilterInfoType,
} from "../../../components/global/filterData/FilterData";
import { RoomDataType } from "../../../dataTypes/Data.type";
import Loader from "../../../components/global/loader/Loader";

export default function Rooms() {
  const { data: rooms } = useGetRoomsQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const { data: users } = useGetUsersQuery();
  const { staticData } = useContext(StaticDataContext);
  const [deleteRoom] = useDeleteRoomMutation();
  const today = new DateObject(new Date()).convert(persian).format();
	
  const [filteredData, setFilteredData] = useState<RoomDataType[]>([]);

  useEffect(() => {
    if (rooms && roomReservations && staticData) {
      const roomTableData = rooms.map((item) => ({
        ...item,
        roomType: staticData.roomCategory.find((i) => i.id === item.roomTypeID)
          ?.title,
        status:
          roomReservations.filter(
            (i) => i.roomID === item.id && i.dates.includes(today)
          ).length > 0
            ? "پر"
            : "خالی",
      }));
      setFilteredData(roomTableData);
    }
  }, [rooms, roomReservations, staticData, today]);

  if (!rooms || !roomReservations || !staticData || !users) {
    return <Loader />;
  }

  // ---table data
  const roomTableData = rooms.map((item) => ({
    ...item,
    roomType: staticData.roomCategory.find((i) => i.id === item.roomTypeID)
      ?.title,
    status:
      roomReservations.filter(
        (i) => i.roomID === item.id && i.dates.includes(today)
      ).length > 0
        ? "پر"
        : "خالی",
  }));
  const rows: TableRowsType[] = [
    {
      name: "image",
      title: "تصویر ",
      sortType: null,
      content: (a: TableNode) =>
        a.images.length > 0 && a.images[0] !== "" ? (
          <div className="table-image">
            <img src={a.images[0]} alt="hotel amanda" />
          </div>
        ) : (
          <></>
        ),
    },
    {
      name: "roomNumber",
      title: "شماره اتاق",
      sortType: "number",
      content: (a: TableNode) => a.roomNumber,
    },
    {
      name: "roomType",
      title: "نوع اتاق",
      sortType: "string",
      content: (a: TableNode) => a.roomType,
    },
    {
      name: "capacity",
      title: "ظرفیت (نفر)",
      sortType: "number",
      content: (a: TableNode) => a.capacity,
    },
    {
      name: "price",
      title: "قیمت",
      sortType: "number",
      content: (a: TableNode) => a.price.toLocaleString(),
    },
    {
      name: "status",
      title: "وضعیت",
      sortType: "string",
      content: (a: TableNode) => a.status,
    },
    {
      name: "score",
      title: "نظرات کاربران",
      sortType: "number",
      content: (a: TableNode) => (
        <div className="table-like-comment-score">
          <Score score={a.score} />
          <CommentsCount count={a.comments.length} />
          <LikesCount count={a.likedUserIDs.length} />
        </div>
      ),
    },
    {
      name: "actions",
      title: "",
      sortType: null,
      content: (a: TableNode) => (
        <div className="table-actions-container">
          <Link to={`/AmandaHotel/roomDetails/${a.id}`} target="_blank">
            <BiSolidDetail
              title="مشاهده جزئیات"
              className="table-action-details"
            />
          </Link>
          <BsTrashFill
            title="حذف"
            className="table-action-delete"
            onClick={() => deleteHandler(a)}
          />
          <Link to={`/AmandaHotel/adminPanel/editRoom/${a.id}`} target="_blank">
            <RiEdit2Fill title="ویرایش" className="table-action-edit" />
          </Link>
        </div>
      ),
    },
  ];
  const expands: TableExpandsType[] = [
    {
      name: "floor",
      title: "طبقه",
      content: (a: TableNode) => a.floor,
    },
    {
      name: "maxAddedPeople",
      title: "حداکثر نفرات اضافه بر ظرفیت",
      content: (a: TableNode) => ` ${a.maxAddedPeople} نفر`,
    },
    {
      name: "pricePerAddedPerson",
      title: "اضافه بها به ازای هر نفر مازاد",
      content: (a: TableNode) =>
        `${a.pricePerAddedPerson.toLocaleString()} تومان`,
    },
    {
      name: "scores",
      title: "مشاهده امتیازات کاربران",
      dropdown: true,
      content: (a: TableNode) => (
        <div className="rooms-scores-wrapper">
          {a.scores.map((item: ScoreDataType, index: number) => {
            const user = users.find((i) => i.id === item.userID);
            if (user) {
              return (
                <div className="user-profile" key={index}>
                  <Avatar user={user} />
                  <Score score={item.score} />
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      ),
    },
    {
      name: "likes",
      title: "مشاهده لایک های کاربران",
      dropdown: true,
      content: (a: TableNode) => (
        <div className="rooms-likes-wrapper">
          {a.likedUserIDs.map((item: string) => {
            const user = users.find((i) => i.id === item);
            if (user) {
              return <Avatar user={user} key={item} />;
            } else {
              return <></>;
            }
          })}
        </div>
      ),
    },
    {
      name: "comments",
      title: "مشاهده کامنت های کاربران",
      dropdown: true,
      content: (a: TableNode) => (
        <div className="rooms-comments-wrapper">
          <Comment comments={a.comments} />
        </div>
      ),
    },
    {
      name: "reservedDays",
      title: "مشاهده روزهایی که اتاق رزرو شده",
      dropdown: true,
      content: (a: TableNode) => {
        const reservedDatesValues = roomReservations
          .filter((item) => item.roomID === a.id)
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
        return (
          <div className="calendar-wrapper">
            <Calendar
              value={reservedDatesValues}
              calendar={persian}
              locale={persian_en}
              multiple
              range
            />
          </div>
        );
      },
    },
  ];

  // ---- delete handler
  const deleteHandler = async (roomInfo: TableNode) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        if (roomInfo.status === "پر") {
          swal({
            text: "به دلیل پر بودن اتاق در بخش رزرواسیون، امکان حذف این اتاق وجود ندارد.",
            buttons: ["باشه"],
          });
        } else {
          deleteRoom(String(roomInfo.id));
        }
      }
    });
  };

  // ---- filter info
  const selectVals = staticData.roomCategory.map((item) => ({
    id: item.id,
    value: item.id,
    title: item.title,
  }));
  const filterInfo: FilterInfoType[] = [
    {
      inputInfo: {
        name: "roomType",
        tag: "select",
        selectValues: [
          { id: "00", value: "all", title: "نمایش همه" },
          ...selectVals,
        ],
        label: {
          content: "نوع اتاق : ",
          color: "#999",
        },
        initialvalue: "all",
      },
      filterConditon: (item: RoomDataType, value: string) =>
        item.roomTypeID === value,
      clearFilterConditon: (value: string) => value === "all",
    },
    {
      inputInfo: {
        name: "maxPrice",
        tag: "bigNumber",
        label: {
          content: "بیشترین قیمت (تومان) : ",
          color: "#999",
        },
        initialvalue: "",
      },
      filterConditon: (item: RoomDataType, value: string) =>
        item.price < Number(value.replace(/,/g, "")),
      clearFilterConditon: (value: number) => !value,
    },
  ];

  return (
    <div className="rooms-wrapper">
      <div className="rooms-title">
        <h1>لیست اتاق های هتل:</h1>
        <Button
          type="link"
          link="/AmandaHotel/adminPanel/addRoom/"
          target="_blank"
          bgColor="var(--gold-color)"
          className="newItem"
        >
          اتاق جدید{" "}
        </Button>
      </div>
      <FilterData
        data={roomTableData}
        setFilteredData={setFilteredData}
        filterInfo={filterInfo}
      />
      <DataTable data={{ nodes: filteredData }} rows={rows} expands={expands} />
    </div>
  );
}
