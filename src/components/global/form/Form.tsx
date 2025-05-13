import { useFormik } from "formik";
import { ButtonType } from "../../../dataTypes/Button.type";
import { FormErrorsType, FormValuesType } from "../../../dataTypes/Form.type";
import { InputType } from "../../../dataTypes/Input.type";
import validatorMethod from "../../../validator/validatorMethod";
import Button from "../button/Button";
import Input from "../input/Input";
import "./form.scss";
import { DateObject } from "react-multi-date-picker";
type FormPropsType = {
  inputs: InputType[];
  buttons: ButtonType[];
  submitHandler: (values: FormValuesType) => void;
  className?: string;
};

export default function Form({
  inputs,
  buttons,
  submitHandler,
  className,
}: FormPropsType) {
  // ---- initial values of inputs
  const formInitialValues: FormValuesType = {};

  inputs.forEach((input) => {
    const { name, initialvalue } = input;

    formInitialValues[name] = initialvalue;
  });

  // ---- create form by formik library
  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values, { resetForm }) => {
      submitHandler(values);
      resetForm();
    },

    validate: (values) => {
      let errors: FormErrorsType = {};
      inputs.forEach((input) => {
        const { name, validators } = input;
        errors[name] = validatorMethod(values[name], validators);
        errors[name] === "" && delete errors[name];
      });
      // ---- extra valodators:
      if (
        values?.exitDate &&
        values?.enterDate &&
        values?.exitDate <= values?.enterDate
      ) {
        errors.exitDate = "تاریخ خروج باید یک روز پس از تاریخ ورود باشد";
      }






			

      return errors;
    },
  });
  const changeHandler = (
    value: string | DateObject,
    name: string,
    tag: "recaptcha" | "date"
  ) => {
    if (tag === "date" && typeof value !== "string") {
      formik.values[name] = value.format();
    }
    if (tag === "recaptcha" && typeof value === "string") {
      formik.values.recaptcha = value;
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`form-wrapper ${className || ""}`}
    >
      {inputs.map((input) => {
        const { name } = input;
        return (
          <div key={name} className={`inputs-wrapper ${name}`}>
            <Input
              {...input}
              changeHandler={changeHandler}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors[name] && formik.touched[name] && (
              <p className="inputError">{formik.errors[name]}</p>
            )}
          </div>
        );
      })}

      <div className="buttons-wrapper">
        {buttons.map((button, index) => (
          <Button {...button} key={index}>
            {button.title}
          </Button>
        ))}
      </div>
    </form>
  );
}
