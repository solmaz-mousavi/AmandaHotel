import { useContext } from "react";
import { useGetRoomsQuery } from "../../../app/services/roomApi";
import {
  useDeleteRoomReservationMutation,
  useGetRoomReservationsQuery,
} from "../../../app/services/roomReservationApi";
import "./roomReservations.scss";
import swal from "sweetalert";
import { StaticDataContext } from "../../../context/StaticContext";
import { useGetUsersQuery } from "../../../app/services/userApi";
import DataTable, { TableExpandsType, TableRowsType } from "../../../components/global/dataTable/DataTable";
import { TableNode } from "@table-library/react-table-library";
import { Link } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import Button from "../../../components/global/button/Button";

export default function RoomReservations() {
  const { data: rooms } = useGetRoomsQuery();
  const { data: users } = useGetUsersQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const { staticData } = useContext(StaticDataContext);
  const [deleteRoomReservation] = useDeleteRoomReservationMutation();
  // const today = new DateObject(new Date())
  //   .convert(persian, persian_en)
  //   .format();

  if (!rooms || !roomReservations || !staticData || !users) {
    return <></>;
  }
  const roomReservationTableData = roomReservations.map((item) => ({
    ...item,
    user: users.find((i) => i.id === item.userID),
    room: rooms.filter((i) => i.id === item.roomID),
  }));
  const rows: TableRowsType[] = [
    {
      name: "user.name",
      title: "کاربر ",
      sortType: "string",
      content: (a: TableNode) => (
        <div className="table-user">
          <div className="table-image">
            <img src={a.user.image} alt="hotel amanda" />
          </div>
          <p>{a.user.name}</p>
        </div>
      ),
    },
    {
      name: "room.roomNumber",
      title: "اتاق",
      sortType: "number",
      content: (a: TableNode) =>         
		
			<Link to={`/amandaHotel/roomDetails/${a.room.id}`} className="table-room" target="_blank" title="مشاهده جزئیات">
			<div className="table-image">
				<img src={a.room.images[0]} alt="hotel amanda" />
			</div>
			<strong>

			شماره اتاق 
			</strong>
			{a.room.roomNumber}
			</Link>

		,
    },
    {
      name: "strength",
      title: "تعداد نفرات",
      sortType: "number",
      content: (a: TableNode) => a.strength,
    },
		{
      name: "dates",
      title: "تعداد روزهای اقامت",
      sortType: "length",
      content: (a: TableNode) => a.dates.length,
    },
    {
      name: "price",
      title: "قیمت",
      sortType: "number",
      content: (a: TableNode) => a.price.toLocaleString(),
    },
    {
      name: "actions",
      title: "",
      sortType: null,
      content: (a: TableNode) => (
        <div className="table-actions-container">
          <BsTrashFill
            title="حذف"
            className="table-action-delete"
            onClick={() => deleteHandler(a)}
          />
          <Link to={`/AmandaHotel/adminPanel/editRoomReservation/${a.id}`} target="_blank">
            <RiEdit2Fill title="ویرایش" className="table-action-edit" />
          </Link>
        </div>
      ),
    },
  ];

  const expands: TableExpandsType[] = [
    {
      name: "enterday",
      title: "تاریخ ورود",
      content: (a: TableNode) => a.dates[0],
    },
    {
      name: "exitday",
      title: "تاریخ خروج",
      content: (a: TableNode) => a.dates[a.dates.length - 1],
    },
  ];

  const deleteHandler = async (roomReservationInfo: TableNode) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
          deleteRoomReservation(String(roomReservationInfo.id));
      }
    });
  };

  return (
    <div className="rooms-wrapper">
      <div className="rooms-title">
        <h1>لیست رزرو اتاق های هتل:</h1>
        <Button
          type="link"
          link="/AmandaHotel/adminPanel/addRoomReservation/"
          target="_blank"
          bgColor="var(--gold-color)"
          className="newItem"
        >
          سفارش جدید{" "}
        </Button>
      </div>
      <DataTable
        data={{ nodes: roomReservationTableData }}
        rows={rows}
        expands={expands}
      />
    </div>
  );
}
