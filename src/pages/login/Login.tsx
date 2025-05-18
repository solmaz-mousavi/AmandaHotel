import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import {
  useEditUserMutation,
  useGetUsersQuery,
} from "../../app/services/userApi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import Form from "../../components/global/form/Form";
import {
  passwordValidator,
  phoneValidator,
  requiredStringValidator,
} from "../../validator/rules";
import { FormInputType } from "../../dataTypes/Input.type";
import { ButtonType } from "../../dataTypes/Button.type";
import { FormValuesType } from "../../dataTypes/Form.type";
import swal from "sweetalert";

export default function Login() {
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery();
  const [editUser] = useEditUserMutation();
  const { setUserInfo, setToken } = useContext(AuthContext);

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "phone",
      fullWidth: true,
      label: {
        content: "شماره موبایل",
        color: "#222",
      },
      validators: [requiredStringValidator(), phoneValidator()],
      initialvalue: "",
    },
    {
      tag: "password",
      name: "password",
      fullWidth: true,
      label: {
        content: "رمز عبور",
        color: "#222",
      },
      validators: [requiredStringValidator(), passwordValidator()],
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
      innerHtml: "ورود",
      type: "submit",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = (items: FormValuesType) => {
    const { phone, password, recaptcha, rme } = items;
    const loggedInUser =
      users &&
      users.find((user) => {
        return user.phone === phone && user.password === password;
      });

    if (loggedInUser) {
      setUserInfo(loggedInUser);
      setToken(String(recaptcha));

      if (rme) {
        localStorage.setItem("token", String(recaptcha));
        editUser({ ...loggedInUser, token: String(recaptcha) });
      }
      navigate("/AmandaHotel");
    } else {
      swal({
        text: "نام کاربری یا رمز عبور صحیح نمی باشد",
        buttons: ["باشه"],
      });
    }
  };

  return (
    <>
      <PageHeader
        title={
          users
            ? "برای ورود شماره موبایل و رمز عبور خود را وارد کنید:"
            : "مشکلی در سمت سرور پیش آمده، لطفا مجددا صفحه را بارگذاری کنید."
        }
      />

      {users && (
        <div className="login-container">
          <Form
            inputs={inputs}
            buttons={buttons}
            submitHandler={submitHandler}
          ></Form>
          <div className="login-link-wrapper">
            <Link to="/register" className="login-link">
              هنوز کاربری ندارید؟ جهت ثبت نام کلیک کنید.
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
