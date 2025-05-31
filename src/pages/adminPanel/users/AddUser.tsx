import { useNavigate } from "react-router-dom";
import "./users.scss";
import swal from "sweetalert";
import {
  useAddUserMutation,
  useGetUsersQuery,
} from "../../../app/services/userApi";
import { FormInputType } from "../../../dataTypes/Input.type";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormValuesType } from "../../../dataTypes/Form.type";
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
  requiredStringValidator,
} from "../../../validator/rules";
import { NewUserDataType } from "../../../dataTypes/Data.type";
import Form from "../../../components/global/form/Form";

export default function AddUser() {
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  if (!users) {
    return <p>در حال بارگذاری، لطفا صبور باشید</p>;
  }

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "name",
      label: {
        content: "نام و نام خانوادگی : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: "",
    },
    {
      tag: "text",
      name: "phone",
      label: {
        content: "شماره موبایل : ",
        color: "#222",
      },
      validators: [requiredStringValidator(), phoneValidator()],
      initialvalue: "",
    },
    {
      tag: "text",
      name: "email",
      label: {
        content: "آدرس ایمیل : ",
        color: "#222",
      },
      validators: [emailValidator()],
      initialvalue: "",
    },
    {
      tag: "text",
      name: "password",
      label: {
        content: "رمز عبور : ",
        color: "#222",
      },
      validators: [requiredStringValidator(), passwordValidator()],
      initialvalue: "",
    },
    {
      tag: "text",
      name: "confirmPassword",
      label: {
        content: "تکرار رمز عبور : ",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: "",
    },
    {
      tag: "text",
      name: "image",
      label: {
        content: "تصویر : ",
        color: "#222",
      },
      validators: [],
      initialvalue: "",
    },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: "ثبت",
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = async (items: FormValuesType) => {
    const { name, password, phone, email, image } = items;

    const newUser: NewUserDataType = {
      name: String(name),
      password: String(password),
      phone: String(phone),
      email: String(email),
      image: String(image),
      role: "user",
      token: "",
    };

    await addUser(newUser);
    swal({
      text: "کاربر جدید با موفقیت ثبت شد",
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
