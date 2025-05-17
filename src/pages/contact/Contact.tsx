import "./contact.scss";
import PageHeader from "../../components/template/pageHeader/PageHeader";
import { FormValuesType } from "../../dataTypes/Form.type";
import { ButtonType } from "../../dataTypes/Button.type";
import { FormInputType } from "../../dataTypes/Input.type";
import {
  emailValidator,
  phoneValidator,
  requiredStringValidator,
} from "../../validator/rules";
import Form from "../../components/global/form/Form";
import Social from "../../components/global/social/Social";
import {
  CiEdit,
  CiLocationOn,
  CiMail,
  CiPhone,
  CiShare2,
} from "react-icons/ci";
import { useAddMessageMutation } from "../../app/services/messageApi";
import { MessageDataType } from "../../dataTypes/Data.type";
import swal from "sweetalert";

export default function Contact() {
  const [addMessage] = useAddMessageMutation();
  const inputs: FormInputType[] = [
    {
      tag: "text",
      placeholder: "نام و نام خانوادگی",
      name: "name",
      initialvalue: "",
      validators: [requiredStringValidator()],
    },
    {
      tag: "text",
      placeholder: "شماره موبایل",
      name: "phone",
      initialvalue: "",
      validators: [requiredStringValidator(), phoneValidator()],
    },
    {
      tag: "text",
      placeholder: "ایمیل",
      name: "email",
      initialvalue: "",
      validators: [emailValidator()],
    },
    {
      tag: "textarea",
      placeholder: "پیغام خود را بنویسید",
      className: "pato-contact-textarea",
      name: "message",
      initialvalue: "",
      validators: [requiredStringValidator()],
    },
  ];
  const buttons: ButtonType[] = [
    {
      type: "submit",
      innerHtml: "ارسال پیام",
      bgColor: "var(--gold-color)",
    },
  ];
  const submitHandler = async (items: FormValuesType) => {
    const newMessage: MessageDataType = {
      id: crypto.randomUUID(),
      name: String(items.name),
      phone: String(items.phone),
      email: String(items.email),
      message: String(items.message),
    };
    await addMessage(newMessage);
    swal({
      text: "پیغام شما با موفقیت دریافت شد، کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.",
      buttons: ["باشه"],
    });
  };
  return (
    <>
      <PageHeader title="راه های ارتباط با ما" />

      <section className="contact-container container">
        {/* location on map */}
        <div id="googleMap">
          <iframe
            width="100%"
            height="100%"
            className="location"
            title="contact"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Shariati%20street,%20Tehran,%20Iran+(pato%20restaurant)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/collections/drones/">buy drones</a>
          </iframe>
        </div>

        <div className="contact-details">
          {/* address */}
          <div className="contact-item">
            <div className="contact-title-container">
              <CiLocationOn className="contact-icon" />
              <span className="contact-title">آدرس:</span>
            </div>
            <address className="contact-desc">
              لورم ایپسوم متن و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
              لازم است
            </address>
          </div>

          {/* email */}
          <div className="contact-item">
            <div className="contact-title-container">
              <CiMail className="contact-icon" />
              <span className="contact-title">ایمیل:</span>
            </div>
            <a href="mailto:info@yoursite.com" className="contact-desc">
              info@yoursite.com
            </a>
          </div>

          {/* phone */}
          <div className="contact-item">
            <div className="contact-title-container">
              <CiPhone className="contact-icon" />
              <span className="contact-title">تلفن تماس:</span>
            </div>

            <a href="tel:+1235235598" className="contact-desc">
              09125846584571
            </a>
          </div>
        </div>

        {/* send message - form */}
        <div className="contact-title-container">
          <CiEdit className="contact-icon" />
          <h3 className="contact-title ">
            از اینکه پیشنهادات و انتقادات خود را با ما در میان بگذارید، خوشحال
            می شویم.
          </h3>
        </div>
        <Form inputs={inputs} buttons={buttons} submitHandler={submitHandler} />

        {/* social */}
        <div className="contact-title-container">
          <CiShare2 className="contact-icon" />
          <h3 className="contact-title">ما رو از فضای مجازی دنبال کنید:</h3>
          <Social />
        </div>
      </section>
    </>
  );
}
