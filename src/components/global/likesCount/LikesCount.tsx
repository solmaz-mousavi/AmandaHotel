import "./likesCount.scss"
import { FaHeart } from 'react-icons/fa6'

export default function LikesCount({count}:{count:number}) {
	return (
		<div className="likes-count-container">
		<FaHeart />
		<span>{count === 0 ? "" : `${count}`}</span>
	</div>

	)
}
