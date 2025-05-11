import {
  requiredString,
  requiredNumber,
  requiredBoolean,
  requiredDate,
  minValue,
  maxValue,
  emailValue,
  phoneValue,
  passwordValue,
  maxLength,
  minLength,
  pastDate,
  RulesType,
} from "./rules";
import { phonePattern, emailPattern, passwordPattern } from "./regex";
import { ValueType } from "../dataTypes/Input.type";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";

export default function validatorMethod(
  inputValue: ValueType,
  validators: { type: RulesType; validatorValue?: any }[]
) {
  let error = "";
  validators.some((validator) => {
    const value = inputValue.toString().trim();
    switch (validator.type) {
      case requiredString: {
        value.length === 0 && (error = "این فیلد الزامی است");
        break;
      }

      case requiredNumber: {
        Number(inputValue) < 1 &&
          (error = "مقدار این فیلد نمی تواند کمتر از یک باشد");
        break;
      }

      case requiredBoolean: {
        !inputValue && (error = "این فیلد الزامی است");
        break;
      }

      case requiredDate: {
        inputValue === "" && (error = "این فیلد الزامی است");
        break;
      }

      case minValue: {
        inputValue <= validator.validatorValue &&
          (error = `حداقل مقدار مجاز برای اسن فیلد  ${validator.validatorValue} می باشد`);
        break;
      }

      case maxValue: {
        inputValue >= validator.validatorValue &&
          (error = `حداکثر  مقدار مجاز برای این فیلد ${validator.validatorValue} می باشد`);
        break;
      }

      case phoneValue: {
        !phonePattern.test(value) &&
          (error = "شماره موبایل وارد شده نامعتبر است");
        break;
      }

      case emailValue: {
        if (value.length > 0) {
          if (!emailPattern.test(value)) {
            error = "ایمیل وارد شده نامعتبر است";
          }
        }
        break;
      }

      case passwordValue: {
        !passwordPattern.test(String(inputValue)) &&
          (error =
            "رمز عبور وارد شده باید حداقل 8کاراکتر، شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک کاراکتر ویژه باشد.");
        break;
      }

      case maxLength: {
        value.trim().length > validator.validatorValue &&
          (error = `حداکثر تعداد کاراکتر مجاز ${validator.validatorValue} می باشد`);

        break;
      }

      case minLength: {
        value.trim().length < validator.validatorValue &&
          (error = `حداقل تعداد کاراکتر مجاز ${validator.validatorValue} می باشد`);
        break;
      }

      case pastDate: {
        const today = new DateObject(new Date())
          .convert(persian, persian_en)
          .format();
        value < today && (error = "تنها می توانید روزهای آینده را انتخاب کنید");

        break;
      }

      default: {
        break;
      }
    }
    return error !== "";
  });
  return error;
}
