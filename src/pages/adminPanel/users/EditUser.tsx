import { useNavigate, useParams } from "react-router-dom";
import "./users.scss";
import swal from "sweetalert";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../../app/services/userApi";
import { FormInputType } from "../../../dataTypes/Input.type";
import {
  emailValidator,
  phoneValidator,
  requiredStringValidator,
} from "../../../validator/rules";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import { UserDataType } from "../../../dataTypes/Data.type";
import Form from "../../../components/global/form/Form";

export default function EditUser() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: userInfo } = useGetUserQuery(params.ID || "");
  const [editUser] = useEditUserMutation();
  if (!userInfo) {
    return <p>در حال بارگذاری، لطفا صبور باشید</p>;
  }

  const { name, phone, email, image } = userInfo;

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "name",
      label: {
        content: "نام و نام خانوادگی : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: name,
    },
    {
      tag: "text",
      name: "phone",
      label: {
        content: "شماره موبایل : ",
        color: "#222",
      },
      validators: [requiredStringValidator(), phoneValidator()],
      initialvalue: phone,
    },
    {
      tag: "text",
      name: "email",
      label: {
        content: "آدرس ایمیل : ",
        color: "#222",
      },
      validators: [emailValidator()],
      initialvalue: email,
    },
    {
      tag: "text",
      name: "image",
      label: {
        content: "تصویر : ",
        color: "#222",
      },
      validators: [],
      initialvalue: image,
    },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: "ویرایش",
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = async (items: FormValuesType) => {
    const newUser: UserDataType = {
      ...userInfo,
      ...items,
    };

    await editUser(newUser);
    swal({
      text: "ویرایش اطلاعات با موفقیت انجام شد",
    });
    navigate("/amandaHotel/adminPanel/users");
  };

  return (
    <div className="addUser-wrapper container">
      <Form
        inputs={inputs}
        buttons={buttons}
        submitHandler={submitHandler}
        formNotReset={true}
      />
    </div>
  );
}
