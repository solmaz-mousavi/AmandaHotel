import { useContext, useState } from "react";
import Form from "../../components/global/form/Form";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import { ButtonType } from "../../dataTypes/Button.type";
import { FormValuesType } from "../../dataTypes/Form.type";
import { FormInputType } from "../../dataTypes/Input.type";
import {
  passwordValidator,
  phoneValidator,
  requiredStringValidator,
} from "../../validator/rules";
import "./userInfo.scss";
import { AuthContext } from "../../context/AuthContext";
import { useEditUserMutation } from "../../app/services/userApi";
import swal from "sweetalert";
import Aos from "../../components/global/aos/Aos";

export default function UserInfo() {
  const { userInfo } = useContext(AuthContext);
  const [editUser] = useEditUserMutation();
  const [disableForm, setDisableForm] = useState<boolean>(true);
  const [showChangePassword, setshowChangePassword] = useState(false);
  if (!userInfo) {
    return <></>;
  }

  const inputs: FormInputType[] = [
    {
      tag: "text",
      name: "name",
      label: {
        content: "نام و نام خانوادگی :",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: userInfo.name,
      disabled: disableForm,
    },
    {
      tag: "text",
      name: "phone",
      label: {
        content: "شماره موبایل :",
        color: "#222",
      },
      validators: [requiredStringValidator(), phoneValidator()],
      initialvalue: userInfo.phone,
      disabled: disableForm,
    },
    {
      tag: "email",
      name: "email",
      label: {
        content: "ایمیل :",
        color: "#222",
      },
      validators: [],
      initialvalue: userInfo.email,
      disabled: disableForm,
    },
    {
      tag: "text",
      name: "image",
      label: {
        content: "تصویر :",
        color: "#222",
      },
      validators: [],
      initialvalue: userInfo.image,
      disabled: disableForm,
    },
  ];
  const buttons: ButtonType[] = [
    {
      innerHtml: "ثبت",
      type: "submit",
      bgColor: "var(--gold-color)",
      className: `${disableForm ? "hidden" : ""}`,
    },
    {
      innerHtml: "ویرایش اطلاعات",
      bgColor: "var(--gold-color)",
      className: `enableForm ${disableForm ? "" : "hidden"}`,
      onClick: () => setDisableForm(false),
    },
    {
      innerHtml: "تغییر رمز عبور",
      bgColor: "var(--gold-color)",
      className: `changePass ${showChangePassword ? "hidden" : ""}`,
      onClick: () => {
        setshowChangePassword(true);
      },
    },
  ];
  const submitHandler = async (items: FormValuesType) => {
    const newUserInfo = {
      ...userInfo,
      ...items,
    };
    await editUser(newUserInfo);
    setDisableForm(true);
    setshowChangePassword(false);
  };

  const inputs2: FormInputType[] = [
    {
      tag: "password",
      name: "oldPassword",
      label: {
        content: "رمز عبور پیشین :",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: "",
    },
    {
      tag: "password",
      name: "password",
      label: {
        content: "رمز عبور جدید :",
        color: "#222",
      },
      validators: [requiredStringValidator(), passwordValidator()],
      initialvalue: "",
    },
    {
      tag: "password",
      name: "confirmPassword",
      label: {
        content: "تکرار رمز عبور :",
        color: "#222",
      },
      validators: [requiredStringValidator()],
      initialvalue: "",
    },
  ];
  const buttons2: ButtonType[] = [
    {
      innerHtml: "تغییر رمز عبور",
      type: "submit",
      bgColor: "var(--gold-color)",
      className: `${showChangePassword ? "" : ""}`,
    },
  ];
  const submitHandler2 = async (items: FormValuesType) => {
    console.log(items);
    if (items.oldPassword === userInfo.password) {
      const newUserInfo = {
        ...userInfo,
        password: String(items.password),
      };
      await editUser(newUserInfo);
      swal({
        text: "رمز عبور شما با موفقیت تغییر یافت",
        buttons: ["باشه"],
      });
      setshowChangePassword(false);
      setDisableForm(true);
    } else {
      swal({
        text: "رمز عبور پیشین صحیح نمی باشد",
        buttons: ["باشه"],
      });
    }
  };

  return (
    <>
      <PageHeader title="اطلاعات کاربری" />

      <div
        className={`container userInfo-wrapper ${
          disableForm ? "" : "editMode"
        }`}
      >
        <Form
          inputs={inputs}
          buttons={buttons}
          submitHandler={submitHandler}
          formNotReset={true}
        />

        {showChangePassword && (
          <Aos aosStyle="fadeIn">
            <Form
              inputs={inputs2}
              buttons={buttons2}
              submitHandler={submitHandler2}
            />
          </Aos>
        )}
      </div>
    </>
  );
}
