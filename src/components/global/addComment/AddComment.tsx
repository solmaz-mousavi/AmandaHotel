import { useContext } from "react";
import "./addComment.scss";
import { AuthContext } from "../../../context/AuthContext";
import {
  useEditRoomMutation,
  useGetRoomQuery,
} from "../../../app/services/roomApi";
import {
  useEditFoodMutation,
  useGetFoodQuery,
} from "../../../app/services/foodApi";
import { useNavigate } from "react-router-dom";
import { FormInputType } from "../../../dataTypes/Input.type";
import { requiredStringValidator } from "../../../validator/rules";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Form from "../form/Form";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { CommentDataType } from "../../../dataTypes/Main.type";
import swal from "sweetalert";

type AddCommentPropsType = {
  roomID?: string;
  foodID?: string;
};

export default function AddComment({
  roomID = "",
  foodID = "",
}: AddCommentPropsType) {
  const { userInfo } = useContext(AuthContext);
  const [editRoom] = useEditRoomMutation();
  const [editFood] = useEditFoodMutation();
  const { data: roomInfo } = useGetRoomQuery(roomID);
  const { data: foodInfo } = useGetFoodQuery(foodID);
  const navigate = useNavigate();

  // add comment - form details:
  const inputs: FormInputType[] = [
    {
      tag: "textarea",
      name: "message",
      placeholder: "پیغام خود را بنویسید",
      validators: [requiredStringValidator()],
      initialvalue: "",
      className: "comments-message",
    },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: "ثبت",
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = (items: FormValuesType) => {

		if (userInfo && (roomInfo || foodInfo)) {
      const today = new DateObject(new Date())
        .convert(persian, persian_en)
        .format();

      const newComment: CommentDataType = userInfo && {
        id: crypto.randomUUID(),
        userID: userInfo.id,
        date: today,
        desc: String(items.message),
        role: userInfo.role,
      };

      const commentsArray = (roomInfo || foodInfo)!.comments;
      const newCommentsArray = [...commentsArray, newComment];

      if (roomInfo) {
        editRoom({ ...roomInfo, comments: newCommentsArray });
      } else if (foodInfo) {
        editFood({ ...foodInfo, comments: newCommentsArray });
      }
    } else if (!userInfo) {
      navigate("/amandaHotel/login");
    } else {
      swal({
        text: "مشکلی در سمت سرور پیش آمده، لطفاً مجدادا تلاش کنید",
        buttons: ["باشه"],
      });
    }
  };

  return (
    <div>
      <div className="comment-title">
        <PiPencilSimpleLineFill className="comment-icon icon" />
        <h3>نظر خود را با ما در میان بگذارید:</h3>
      </div>

      <div className="add-comment">
        <Form inputs={inputs} buttons={buttons} submitHandler={submitHandler} />
      </div>
    </div>
  );
}
