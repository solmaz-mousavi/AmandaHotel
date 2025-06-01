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
import DataTable, {
  TableExpandsType,
  TableRowsType,
} from "../../../components/global/dataTable/DataTable";
import { TableNode } from "@table-library/react-table-library";
import { Link } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import Button from "../../../components/global/button/Button";
import Avatar from "../../../components/global/avatar/Avatar";
import { DateObject } from "react-multi-date-picker";
import { MdNoPhotography } from "react-icons/md";

export default function RoomReservations() {
  const { data: rooms } = useGetRoomsQuery();
  const { data: users } = useGetUsersQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const { staticData } = useContext(StaticDataContext);
  const [deleteRoomReservation] = useDeleteRoomReservationMutation();

  if (!rooms || !roomReservations || !staticData || !users) {
    return <></>;
  }
  const roomReservationTableData = roomReservations.map((item) => {
    const user = users.find((i) => i.id === item.userID);
    const room = rooms.filter((i) => i.id === item.roomID)[0];
		const totalPricePerNight = room.price + Math.max((Number(item.strength) - room.capacity) * room.pricePerAddedPerson, 0);
    return {
      ...item,
      user,
      userName: user?.name,
      room,
      roomNumber: room?.roomNumber,
      enterdate: item.dates[0],
      exitdate: new DateObject(item.dates[item.dates.length - 1]).add(1, "day").format(),
			totalPricePerNight,
    };
  });
  const rows: TableRowsType[] = [
    {
      name: "userName",
      title: "کاربر ",
      sortType: "string",
      content: (a: TableNode) => <Avatar user={a.user} />,
    },
    {
      name: "roomNumber",
      title: "اتاق",
      sortType: "number",
      content: (a: TableNode) => (
        <Link
          to={`/amandaHotel/roomDetails/${a.room.id}`}
          className="roomReservation-table-room"
          target="_blank"
          title="مشاهده جزئیات"
        >
          {a.room.images.length > 0 ? (
            <div className="table-image">
              <img src={a.room.images[0]} alt="hotel amanda" />
            </div>
          ) : (
            <MdNoPhotography className="avatar-withoutphoto" />
          )}
          <strong>شماره اتاق</strong>
          {a.room.roomNumber}
        </Link>
      ),
    },
    {
      name: "strength",
      title: "تعداد نفرات",
      sortType: "number",
      content: (a: TableNode) => a.strength,
    },
    {
      name: "enterdate",
      title: "تاریخ ورود",
      sortType: "string",
      content: (a: TableNode) => a.enterdate,
    },
    {
      name: "exitdate",
      title: "تاریخ خروج",
      sortType: "string",
      content: (a: TableNode) => a.exitdate,
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
          <Link
            to={`/AmandaHotel/adminPanel/editRoomReservation/${a.id}`}
            target="_blank"
          >
            <RiEdit2Fill title="ویرایش" className="table-action-edit" />
          </Link>
        </div>
      ),
    },
  ];

  const expands: TableExpandsType[] = [
		    {
      name: "price",
      title: "قیمت پایه اتاق ",
      content: (a: TableNode) => ` ${a.room.price.toLocaleString()} تومان`,
    },
				    {
      name: "capacity",
      title: "ظرفیت پایه اتاق ",
      content: (a: TableNode) => ` ${a.room.capacity} نفر`,
    },
				    {
      name: "maxAddedPeople",
      title: "حداکثر تعداد نفرات اضافه ",
      content: (a: TableNode) => ` ${a.room.maxAddedPeople} نفر`,
    },
				    {
      name: "pricePerAddedPerson",
      title: "اضافه بها به ازای هر نفر اضافه ",
      content: (a: TableNode) => ` ${a.room.pricePerAddedPerson.toLocaleString()} تومان`,
    },
						    {
      name: "totalPricePerNight",
      title: `قیمت هر شب اقامت به ازای تعداد نفرات `,
      content: (a: TableNode) => ` ${a.totalPricePerNight.toLocaleString()} تومان`,
    },
						    {
      name: "TotalPrice",
      title: `قیمت کل به ازای تعداد نفرات و تعداد شب اقامت `,
      content: (a: TableNode) => ` ${(a.totalPricePerNight * a.dates.length).toLocaleString()} تومان`,
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
    <div className="roomReservations-wrapper">
      <div className="roomReservations-title">
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
