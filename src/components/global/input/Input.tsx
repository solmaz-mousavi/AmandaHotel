import { InputType } from "../../../dataTypes/Input.type";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import ReCAPTCHA from 'react-google-recaptcha';
import "./input.scss";
import { RulesType } from "../../../validator/rules";

export default function Input({
  id,
  name,
  className,
  fullWidth = false,
  variant = "light",

  tag = "text",
  initialvalue = "",
  placeholder = "",
  label,
  selectValues,
  validators =[] as { type: RulesType; validatorValue?: any }[],
  method,

  value,
  onChange,
  onBlur,
	changeHandler,
  ...rest
}: InputType) {
  const inputClassName = `input-container ${variant}${
    fullWidth ? " fullWidth" : ""
  } ${className || ""}`;

  return (
    <div className={inputClassName}>
      {label && (
        <label
          style={{ color: `${label.color}` }}
          className={label.className}
          htmlFor={id}
        >
          {label.content}
        </label>
      )}

      {tag === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className="input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      ) : tag === "select" ? (
        <select
          id={id}
          name={name}
          className="input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        >
          {selectValues?.map((item) => (
            <option key={item.id} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      ) : tag === "date" ? (
        <DatePicker
          calendar={persian}
          locale={persian_en}
          calendarPosition="bottom-right"
          format="YYYY/MM/DD"
          id={id}
          name={name}
          value={value}
          onChange={(event) => changeHandler(event, name, tag)}
        />
				  ) : tag === "recaptcha" ? (
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={(event)=> changeHandler(event, name, tag)}
                    className="recaptcha"
                    key={name}
                  />
      ) : (
        <input
          type={tag}
          id={id}
          name={name}
          placeholder={placeholder}
          className="input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      )}
    </div>
  );
}
