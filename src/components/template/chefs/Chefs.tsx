import { useGetStaffsQuery } from "../../../app/services/staffApi";
import ChefThumb from "../../module/chefThumb/ChefThumb";
import "./chefs.scss";

export default function Chefs() {
  const { data: staff } = useGetStaffsQuery();
  return (
    <section className="chefs-wrapper">
      <h3 className="chefs-title">با سرآشپزهای ما آشنا شوید</h3>
      <img
        className="chefs-devider"
        src="/amandaHotel/images/staff/bg-03.png"
        alt=""
      />
      <div className="chefs-container">
        {staff &&
          staff
            .filter((item) => item.role === "سرآشپز")
            .map((chef) => <ChefThumb chef={chef} key={chef.id} />)}
      </div>
    </section>
  );
}
