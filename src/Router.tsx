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
import Stuff from "./pages/adminPanel/stuff/Stuff";
import AddRoom from "./pages/adminPanel/rooms/AddRoom";
import EditRoom from "./pages/adminPanel/rooms/EditRoom";
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

      <Route path="/amandaHotel/adminPanel/" element={<AdminPanel />}>
        <Route path="rooms" element={<Rooms />} />
        <Route path="addRoom" element={<AddRoom />} />
        <Route path="editRoom/:ID" element={<EditRoom />} />
        <Route path="roomReservations" element={<RoomReservations />} />
        <Route path="menu" element={<Menu2 />} />
        <Route path="foodOrders" element={<FoodOrders />} />
        <Route path="users" element={<Users />} />
        <Route path="stuff" element={<Stuff />} />
      </Route>

      {/* <Route path="multi-pages/pato/" element={<Pato />}>
        <Route path="" element={<PatoHome />} />
        <Route path="home" element={<PatoHome />} />
        <Route path="about" element={<PatoAbout />} />
        <Route path="blog" element={<PatoBlog />} />
        <Route path="blog/:ID" element={<PatoBlogDetails />} />
        <Route path="contact" element={<PatoContact />} />
        <Route path="gallery" element={<PatoGallery />} />
        <Route path="menu" element={<PatoMenu />} />
        <Route path="reservation" element={<PatoReservation />} />
      </Route>

      <Route path="multi-pages/academia/" element={<Academia />}>
        <Route path="" element={<AcademiaHome />} />
        <Route path="home" element={<AcademiaHome />} />
        <Route path="course" element={<AcademiaCourse />} />
        <Route path="course/:ID" element={<AcademiaCourseDetails />} />
        <Route path="about" element={<AcademiaAbout />} />
        <Route path="team" element={<AcademiaTeam />} />
        <Route path="package" element={<AcademiaPackage />} />
        <Route path="blog" element={<AcademiaBlog />} />
        <Route path="blog/:ID" element={<AcademiaBlogDetails />} />
        <Route path="contact" element={<AcademiaContact />} />
        <Route path="login" element={<AcademiaLogin />} />
        <Route path="mycourse" element={<AcademiaMyCourse />} />
      </Route>

      <Route path="multi-pages/dashboard/" element={<Dashboard />} /> */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
