import { useContext } from "react";
import PageHeader from "../../components/template/pageHeader/PageHeader"
import "./cart.scss"
import { CartContext } from "../../context/CartContext";
import CartThumb from "../../components/module/cartThumb/CartThumb";

export default function Cart() {
		const { localStorageCartData, cartBadge, addToCart, removeFromCart } =
			useContext(CartContext);
	return (
		<>
		<PageHeader title="سبد خرید" />
		<div className="cart-container">
			{localStorageCartData.length>0 && localStorageCartData.map(item => <CartThumb cart={item} />)}
		</div>





		</>
	)
}
