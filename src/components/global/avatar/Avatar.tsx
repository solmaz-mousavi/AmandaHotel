import { UserDataType } from "../../../dataTypes/Data.type";
import "./avatar.scss";
import { FaUserCircle } from "react-icons/fa";

export default function Avatar({user}:{user:UserDataType}) {
	return (
		<div className="avatar-profile" >
		<div className="avatar-image">
			{user.image ? 
			<img src={user.image} alt={user.name} />
			:
			<FaUserCircle className="avatar-withoutphoto" />
		}
		</div>
		<p>{user.name}</p>
	</div>
	)
}
