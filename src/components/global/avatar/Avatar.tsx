import { MdNoPhotography } from "react-icons/md";
import { UserDataType } from "../../../dataTypes/Data.type";
import "./avatar.scss";

export default function Avatar({user}:{user:UserDataType}) {
	return (
		<div className="avatar-profile" >
		<div className="avatar-image">
			{user.image ? 
			<img src={user.image} alt={user.name} />
			:
			<MdNoPhotography className="avatar-withoutphoto" />
		}
		</div>
		<p>{user.name}</p>
	</div>
	)
}
