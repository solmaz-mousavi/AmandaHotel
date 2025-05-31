import "./roomReservations.scss";
import swal from "sweetalert";

export default function RoomReservations() {
  // const { data: rooms } = useGetRoomsQuery();
  // const { data: roomReservations } = useGetRoomReservationsQuery();
  // const { staticData } = useContext(StaticDataContext);
  // const [deleteRoom] = useDeleteRoomMutation();
  // const today = new DateObject(new Date())
  //   .convert(persian, persian_en)
  //   .format();

  // if (!rooms || !roomReservations || !staticData ) {
  //   return <></>;
  // }
  // const roomTableData = rooms.map((item) => ({
  //   ...item,
  //   roomType: staticData.roomCategory.find((i) => i.id === item.roomTypeID)
  //     ?.title,
  //   status:
  //     roomReservations.filter(
  //       (i) => i.roomID === item.id && i.dates.includes(today)
  //     ).length > 0
  //       ? "پر"
  //       : "خالی",
  // }));
  // const rows: TableRowsType[] = [
  //   {
  //     name: "image",
  //     title: "تصویر ",
  //     sortType: null,
  //     content: (a: TableNode) =>
  //       a.images.length > 0 && a.images[0] !== "" ? (
  //         <div className="table-image">
  //           <img src={a.images[0]} alt="hotel amanda" />
  //         </div>
  //       ) : (
  //         <></>
  //       ),
  //   },
  //   {
  //     name: "roomNumber",
  //     title: "شماره اتاق",
  //     sortType: "number",
  //     content: (a: TableNode) => a.roomNumber,
  //   },
  //   {
  //     name: "roomType",
  //     title: "نوع اتاق",
  //     sortType: "string",
  //     content: (a: TableNode) => a.roomType,
  //   },
  //   {
  //     name: "capacity",
  //     title: "ظرفیت (نفر)",
  //     sortType: "number",
  //     content: (a: TableNode) => a.capacity,
  //   },
  //   {
  //     name: "price",
  //     title: "قیمت",
  //     sortType: "number",
  //     content: (a: TableNode) => a.price.toLocaleString(),
  //   },
  //   {
  //     name: "status",
  //     title: "وضعیت",
  //     sortType: "string",
  //     content: (a: TableNode) => a.status,
  //   },
  //   {
  //     name: "score",
  //     title: "نظرات کاربران",
  //     sortType: "number",
  //     content: (a: TableNode) => (
  //       <div className="table-like-comment-score">
  //         <Score score={a.score} />
  //         <CommentsCount count={a.comments.length} />
	// 				<LikesCount count={a.likedUserIDs.length} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: "actions",
  //     title: "",
  //     sortType: null,
  //     content: (a: TableNode) => (
  //       <div className="table-actions-container">
  //         <Link to={`/AmandaHotel/roomDetails/${a.id}`} target="_blank">
  //           <BiSolidDetail
  //             title="مشاهده جزئیات"
  //             className="table-action-details"
  //           />
  //         </Link>
  //         <BsTrashFill
  //           title="حذف"
  //           className="table-action-delete"
  //           onClick={() => deleteHandler(a)}
  //         />
  //         <Link to={`/AmandaHotel/adminPanel/editRoom/${a.id}`} target="_blank">
  //           <RiEdit2Fill title="ویرایش" className="table-action-edit" />
  //         </Link>
  //       </div>
  //     ),
  //   },
  // ];

  // const expands: TableExpandsType[] = [
  //   {
  //     name: "floor",
  //     title: "طبقه",
  //     content: (a: TableNode) => a.floor,
  //   },
  //   {
  //     name: "maxAddedPeople",
  //     title: "حداکثر نفرات اضافه بر ظرفیت",
  //     content: (a: TableNode) => ` ${a.maxAddedPeople} نفر`,
  //   },
  //   {
  //     name: "pricePerAddedPerson",
  //     title: "اضافه بها به ازای هر نفر مازاد",
  //     content: (a: TableNode) =>
  //       `${a.pricePerAddedPerson.toLocaleString()} تومان`,
  //   },
  // ];

  // const deleteHandler = async (roomInfo: TableNode) => {
  //   swal({
  //     text: "آیا از حذف آیتم اطمینان دارید؟",
  //     buttons: ["خیر", "بله"],
  //   }).then((res) => {
  //     if (res) {
  //       if (roomInfo.status === "پر") {
  //         swal({
  //           text: "به دلیل پر بودن اتاق در بخش رزرواسیون، امکان حذف این اتاق وجود ندارد.",
  //           buttons: ["باشه"],
  //         });
  //       } else {
  //         deleteRoom(String(roomInfo.id));
  //       }
  //     }
  //   });
  // };

  return (
    <div className="rooms-wrapper">
      {/* <div className="rooms-title">
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
      <DataTable
        data={{ nodes: roomTableData }}
        rows={rows}
        expands={expands}
      /> */}
    </div>
  );
}
