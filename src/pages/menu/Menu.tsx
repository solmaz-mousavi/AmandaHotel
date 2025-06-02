import { useContext } from "react";
import { useGetFoodsQuery } from "../../app/services/foodApi";
import "./menu.scss";
import { StaticDataContext } from "../../context/StaticContext";
import MenuThumb from "../../components/module/menuThumb/MenuThumb";
import Loader from "../../components/global/loader/Loader";

export default function Menu() {
  const { data: foods } = useGetFoodsQuery();
  const { staticData } = useContext(StaticDataContext);

  if (!foods || !staticData) {
    return <Loader />;
  }

  return (
    <section className="menu-wrapper">
      <h1>منو - لیست غذاهای رستوران</h1>
      {staticData.menuCategory.map((item) => (
          <div key={item.id}>
            <h3 className="menu-category">{item.title}</h3>
						<div className="menu-container container">

            {foods
              .filter((i) => i.menuCategoryID === item.id)
              .map((food) => (
								<MenuThumb food={food} key={food.id} />
              ))}
							</div>
          </div>
        ))}
    </section>
  );
}
