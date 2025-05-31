import { InputType } from "../../../dataTypes/Input.type";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import ReCAPTCHA from "react-google-recaptcha";
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
  validators = [] as { type: RulesType; validatorValue?: any }[],

  value,
  onChange,
  onBlur,
  changeHandler,
	setState,
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
          id={name}
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
          id={name}
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
          id={name}
          name={name}
          value={value}
          onChange={(event) => changeHandler && changeHandler(event || "", name, tag)}
        />
      ) : tag === "recaptcha" ? (
        <ReCAPTCHA
					id={name}
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={(event) => changeHandler && changeHandler(event || "", name, tag)}
          className="recaptcha"
          key={name}
        />
      ) : tag === "bigNumber" ? (
        <input
          type="text"
					id={name}
          name={name}
					placeholder={placeholder}
          className="input"
					value={Number(String(value).replace(/,/g, "")).toLocaleString()}
          onChange={(event) => {
						const newValue = event.target.value.replace(/,/g, "");
            if (newValue === "" || !isNaN(Number(newValue))) {
							changeHandler && changeHandler(Number(newValue).toLocaleString(), name, tag);
							setState && setState(Number(newValue).toLocaleString());
							onChange && onChange(event);
            }
					}}
					/>
      ) : (
        <input
          type={tag}
          id={name}
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
