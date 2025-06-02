import "./addComment.scss";
import { FormValuesType } from "../../../dataTypes/Form.type";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import Form from "../form/Form";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { CommentDataType } from "../../../dataTypes/Main.type";
import {
  UserDataType,
} from "../../../dataTypes/Data.type";
import { buttons, inputs } from "./addCommentFormData";

type AddCommentPropsType<T> = {
  userInfo: UserDataType | null;
  data: T | null;
  editDataMethod: (data: any) => void;
};

export default function AddComment<T extends {comments: CommentDataType[]}>({
  userInfo,
  data,
  editDataMethod,
}: AddCommentPropsType<T>) {

  if (!userInfo || !data) {
    return <></>;
  }

  const submitHandler = (items: FormValuesType) => {
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

    const commentsArray = data.comments;
    const newCommentsArray = [...commentsArray, newComment];
    editDataMethod({ ...data, comments: newCommentsArray });
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
