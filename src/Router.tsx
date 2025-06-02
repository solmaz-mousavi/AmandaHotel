import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Menu from "./pages/menu/Menu";
import RoomReservation from "./pages/roomReservation/RoomReservation";
import FoodDetails from "./pages/foodDetails/FoodDetails";
import RoomDetails from "./pages/roomDetails/RoomDetails";
import Cart from "./pages/cart/Cart";
import Gallery from "./pages/gallery/Gallery";
import UserInfo from "./pages/userInfo/UserInfo";
import Orders from "./pages/orders/Orders";
import Rooms from "./pages/adminPanel/rooms/Rooms";
import RoomReservations from "./pages/adminPanel/roomReservations/RoomReservations";
import Menu2 from "./pages/adminPanel/menu/Menu"
import FoodOrders from "./pages/adminPanel/foodOrders/FoodOrders";
import Users from "./pages/adminPanel/users/Users";
import AddRoom from "./pages/adminPanel/rooms/AddRoom";
import EditRoom from "./pages/adminPanel/rooms/EditRoom";
import AddFood from "./pages/adminPanel/menu/AddFood";
import EditFood from "./pages/adminPanel/menu/EditFood";
import AddUser from "./pages/adminPanel/users/AddUser";
import EditUser from "./pages/adminPanel/users/EditUser";
import AddRoomReservation from "./pages/adminPanel/roomReservations/AddRoomReservation";
import EditRoomReservation from "./pages/adminPanel/roomReservations/EditRoomReservation";
import Staff from "./pages/adminPanel/staff/Staff";
import EditStaff from "./pages/adminPanel/staff/EditStaff";
import AddStaff from "./pages/adminPanel/staff/AddStaff";
import PrivateRoute from "./components/global/privateRoute/PrivateRoute";
function Router() {
  return (
    <Routes>
      <Route path="/amandaHotel" element={<Home />} />
      <Route path="/amandaHotel/menu" element={<Menu />} />
      <Route path="/amandaHotel/foodDetails/:ID" element={<FoodDetails />} />
      <Route
        path="/amandaHotel/roomReservation"
        element={<RoomReservation />}
      />
      <Route path="/amandaHotel/roomDetails/:ID" element={<RoomDetails />} />
      <Route path="/amandaHotel/gallery" element={<Gallery />} />
      <Route path="/amandaHotel/about" element={<About />} />
      <Route path="/amandaHotel/contact" element={<Contact />} />
      <Route path="/amandaHotel/orders" element={<Orders />} />

      <Route path="/amandaHotel/cart" element={<Cart />} />
      <Route path="/amandaHotel/login" element={<Login />} />
      <Route path="/amandaHotel/register" element={<Register />} />
      <Route path="/amandaHotel/userInfo" element={<UserInfo />} />

      <Route path="/amandaHotel/adminPanel/dashboard" element={<PrivateRoute children={<AdminPanel />} /> } />
      <Route path="/amandaHotel/adminPanel" element={<PrivateRoute ><AdminPanel /></PrivateRoute> }>
        <Route path="rooms" element={<Rooms />} />
        <Route path="addRoom" element={<AddRoom />} />
        <Route path="editRoom/:ID" element={<EditRoom />} />
        <Route path="roomReservations" element={<RoomReservations />} />
        <Route path="addRoomReservation" element={<AddRoomReservation />} />
        <Route path="editRoomReservation/:ID" element={<EditRoomReservation />} />
        <Route path="menu" element={<Menu2 />} />
				<Route path="addFood" element={<AddFood />} />
        <Route path="editFood/:ID" element={<EditFood />} />
        <Route path="foodOrders" element={<FoodOrders />} />
        <Route path="users" element={<Users />} />
				<Route path="addUser" element={<AddUser />} />
        <Route path="editUser/:ID" element={<EditUser />} />
        <Route path="staff" element={<Staff />} />
        <Route path="addStaff" element={<AddStaff />} />
        <Route path="editStaff/:ID" element={<EditStaff />} />
      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
