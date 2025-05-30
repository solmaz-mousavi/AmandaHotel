import "./cart.scss";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import CartThumb from "../../components/module/cartThumb/CartThumb";
import Button from "../../components/global/button/Button";
import { useAddFoodOrderMutation } from "../../app/services/foodOrderApi";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import NoData from "../../components/template/noData/NoData";
import swal from "sweetalert";

export default function Cart() {
  const [addFoodOrder] = useAddFoodOrderMutation();
  const { cartInfo, cartPrice, updateCart } = useContext(CartContext);
  const reservationHandler = async () => {
    const today = new DateObject(new Date())
      .convert(persian, persian_en)
      .format();
    const newOrder = {
      date: today,
      price: cartPrice,
      orders: cartInfo,
    };

    await addFoodOrder(newOrder);
		      swal({
        text: "سفارش شما با موفقیت ثبت شد.",
        buttons: ["باشه"],
      });
    updateCart([]);
  };
	
  return (
    <>
      <PageHeader title="سبد خرید" />
      <div className="cart-container container">
        {cartInfo.length === 0 && <NoData />}
        {cartInfo.length > 0 && (
          <>
            {cartInfo.map((item, index) => (
              <CartThumb cart={item} index={index} />
            ))}
            <div className="cart-bottom container">
              <p className="cart-total-price">
                قیمت کل سبد خرید: {cartPrice.toLocaleString()} تومان
              </p>
              <Button
                innerHtml="نهایی کردن سفارش"
                bgColor="var(--gold-color"
                onClick={reservationHandler}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
