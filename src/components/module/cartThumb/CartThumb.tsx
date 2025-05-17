import { CartDataType } from "../../../dataTypes/Data.type";
import "./cartThumb.scss";

export default function CartThumb({cart}:{cart:CartDataType}) {
	const {id, foodID, userID, count, price, title, image} = cart;
	return (
		<div>
{title}





		</div>
	)
}
