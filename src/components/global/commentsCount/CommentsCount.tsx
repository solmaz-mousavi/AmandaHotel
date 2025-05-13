import { FaRegComment } from "react-icons/fa6";
import "./commentsCount.scss";

export default function CommentsCount({count}:{count:number}) {
	return (
		<div className="comments-count-container">
		<FaRegComment />
		<span>{count === 0 ? "" : `${count}`}</span>
	</div>

	)
}
