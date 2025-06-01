import { useNavigate } from "react-router-dom";
import "./register.scss";
import swal from "sweetalert";
import {
  useAddUserMutation,
  useGetUsersQuery,
} from "../../app/services/userApi";
import { FormInputType } from "../../dataTypes/Input.type";
import { ButtonType } from "../../dataTypes/Button.type";
import { FormValuesType } from "../../dataTypes/Form.type";
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
  requiredStringValidator,
} from "../../validator/rules";
import { NewUserDataType } from "../../dataTypes/Data.type";
import Form from "../../components/global/form/Form";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
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
      tag: "password",
      name: "password",
      label: {
        content: "رمز عبور : ",
        color: "#222",
      },
      validators: [requiredStringValidator(), passwordValidator()],
      initialvalue: "",
    },
    {
      tag: "password",
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
    {
      tag: "recaptcha",
      name: "recaptcha",
      validators: [requiredStringValidator()],
      initialValue: "",
    },
    {
      tag: "checkbox",
      name: "rme",
      label: {
        content: "مرا بخاطر بسپار",
        color: "#222",
      },
      validators: [],
      initialValue: false,
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
    const { name, password, phone, email, image, recaptcha, rme } = items;

    const newUser: NewUserDataType = {
      name: String(name),
      password: String(password),
      phone: String(phone),
      email: String(email),
      image: String(image),
      role: "user",
      token: String(recaptcha),
    };

    await addUser(newUser);

    setToken(String(recaptcha));
    if (rme) {
      localStorage.setItem("token", String(recaptcha));
    }
    swal({
      text: "ثبت نام شما با موفقیت انجام شد",
    });
    navigate("/amandaHotel/");

  };

  return (
    <>
      <PageHeader title={"برای ثبت نام اطلاعات خود را وارد کنید"} />
      <div className="register-wrapper container">
        <Form
          inputs={inputs}
          buttons={buttons}
          submitHandler={submitHandler}
          formNotReset={true}
        />
      </div>
    </>
  );
}
