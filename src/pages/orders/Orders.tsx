import { useContext } from "react";
import { useGetRoomsQuery } from "../../app/services/roomApi";
import { useGetRoomReservationsQuery } from "../../app/services/roomReservationApi";
import "./orders.scss";
import { StaticDataContext } from "../../context/StaticContext";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/global/loader/Loader";
import { DateObject } from "react-multi-date-picker";
import RoomReservationThumb from "../../components/module/roomReservationThumb/RoomReservationThumb";

export default function Orders() {
  const { data: rooms } = useGetRoomsQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  if (!rooms || !roomReservations || !staticData || !userInfo) {
    return <Loader />;
  }

  const reservations = roomReservations
    .filter((item) => item.userID === userInfo.id)
    .map((i) => {
      const room = rooms.filter((j) => j.id === i.roomID)[0];
      const enterdate = i.dates[0];
      const exitdate = new DateObject(i.dates[i.dates.length - 1])
        .add(1, "day")
        .format();
      const user = userInfo;
      return { ...i, room, enterdate, exitdate, user };
    });
  return (
    <div>
      {reservations.map((item) => (
        <RoomReservationThumb roomReservation={{ ...item }} />
      ))}
    </div>
  );
}
