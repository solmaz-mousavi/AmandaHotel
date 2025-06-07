import { useContext } from "react";
import { useGetRoomsQuery } from "../../app/services/roomApi";
import { useGetRoomReservationsQuery } from "../../app/services/roomReservationApi";
import "./orders.scss";
import { StaticDataContext } from "../../context/StaticContext";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/global/loader/Loader";
import { DateObject } from "react-multi-date-picker";
import RoomReservationThumb from "../../components/module/roomReservationThumb/RoomReservationThumb";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import { useGetFoodOrdersQuery } from "../../app/services/foodOrderApi";
import FoodOrderThumb from "../../components/module/foodOrderThumb/FoodOrderThumb";

export default function Orders() {
  const { data: rooms } = useGetRoomsQuery();
  const { data: roomReservations } = useGetRoomReservationsQuery();
  const { data: foodOrders } = useGetFoodOrdersQuery();
  const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  if (!rooms || !roomReservations || !staticData || !userInfo || !foodOrders) {
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
	
		const orders = foodOrders.filter(item => item.orders[0].userID === userInfo.id);
  return (
    <>
      <PageHeader title="لیست سفارشات" />
      <h3 className="orders-title">
        لیست اتاق هایی که از هتل ما رزرو کرده اید:
      </h3>
      <div className="orders-wrapper container">
        {reservations.map((item) => (
          <RoomReservationThumb roomReservation={{ ...item }} />
        ))}
      </div>
      <h3 className="orders-title">
        لیست سفارش های شما از رستوران :
      </h3>
      <div className="orders-wrapper container">
        {foodOrders.map((item) => (
          <FoodOrderThumb foodOrder={{ ...item }} />
        ))}
      </div>
    </>
  );
}
