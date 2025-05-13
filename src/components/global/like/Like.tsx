import { FaHeart, FaRegHeart } from "react-icons/fa6";
import "./like.scss";
import { useState } from "react";
type LikePropsType = {
	liked: boolean;
likeHandler: (like:boolean)=> void;
likedCount: number;
}
export default function Like({liked , likeHandler, likedCount}: LikePropsType) {
	const [like, setLike] = useState<boolean>(liked);
	// const likeHandler = () => {
	// 	setLike(prev => !prev);






	// }
	return (
		<div
		className="heart"
		onClick={()=>{likeHandler(!liked);
			setLike(prev => !prev);
		}}
	>
		{like ? <FaHeart /> : <FaRegHeart />}
		<span>{likedCount===0 ? "" : likedCount}</span>
	</div>
	)
}
